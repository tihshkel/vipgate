from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.utils import timezone
from django.core.cache import cache
from django.views.decorators.csrf import csrf_exempt
from datetime import timedelta
import logging

from .serializers import EmailVerificationRequestSerializer, CodeVerificationSerializer
from .tasks import send_verification_code_email
from django.core.mail import send_mail
from django.conf import settings
import secrets
import string

logger = logging.getLogger(__name__)


def get_client_ip(request):
    """Получает IP адрес клиента."""
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


@csrf_exempt
@api_view(['POST', 'OPTIONS'])
@permission_classes([AllowAny])
def send_verification_code(request):
    """
    Асинхронный endpoint для отправки кода верификации на email.
    Использует кеширование для rate limiting.
    """
    serializer = EmailVerificationRequestSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(
            {"error": "Неверный формат email"},
            status=status.HTTP_400_BAD_REQUEST
        )

    email = serializer.validated_data['email']
    client_ip = get_client_ip(request)
    cache_key_ip = f"verification_rate_limit_ip:{client_ip}"
    cache_key_email = f"verification_rate_limit_email:{email}"
    ip_requests = cache.get(cache_key_ip, 0)
    email_requests = cache.get(cache_key_email, 0)
    if ip_requests >= 3:
        return Response(
            {"error": "Слишком много запросов. Попробуйте позже."},
            status=status.HTTP_429_TOO_MANY_REQUESTS
        )
    if email_requests >= 3:
        return Response(
            {"error": "Слишком много запросов для этого email. Попробуйте позже."},
            status=status.HTTP_429_TOO_MANY_REQUESTS
        )

    active_code_key = f"verification_code:{email}"
    active_code_data = cache.get(active_code_key)
    if active_code_data:
        code_created_at = active_code_data.get('created_at')
        if code_created_at:
            time_since_creation = (timezone.now() - code_created_at).total_seconds()
            if time_since_creation < 48:
                remaining_seconds = int(48 - time_since_creation)
                return Response(
                    {
                        "error": f"Код уже отправлен. Запросите новый код через {remaining_seconds} секунд.",
                        "retry_after": remaining_seconds
                    },
                    status=status.HTTP_429_TOO_MANY_REQUESTS
                )

    code = ''.join(secrets.choice(string.digits) for _ in range(6))
    code_data = {
        'code': code,
        'email': email,
        'created_at': timezone.now(),
        'ip_address': client_ip,
        'attempts': 0,
    }
    cache.set(active_code_key, code_data, 600)

    try:
        task_result = send_verification_code_email.delay(email, code)
        logger.info(f"✅ Celery задача отправлена для {email}. Task ID: {task_result.id}")
        print("\n" + "="*50)
        print(f"✅ CELERY: Код верификации отправлен асинхронно для {email}: {code}")
        print(f"Task ID: {task_result.id}")
        print("="*50 + "\n")
    except Exception as e:
        logger.warning(f"⚠️ Celery недоступен, отправляем email синхронно: {str(e)}")
        print(f"\n⚠️ ВНИМАНИЕ: Celery не используется, отправка синхронная: {str(e)}\n")
        try:
            subject = "Код подтверждения VIPGate"
            message = f"""
Здравствуйте!

Ваш код подтверждения для входа в VIPGate: {code}

Код действителен в течение 10 минут.

Если вы не запрашивали этот код, проигнорируйте это письмо.

С уважением,
Команда VIPGate
            """.strip()
            send_mail(
                subject=subject,
                message=message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[email],
                fail_silently=False,
            )
            print("\n" + "="*50)
            print(f"КОД ВЕРИФИКАЦИИ для {email}: {code}")
            print("="*50 + "\n")
            logger.info(f"Verification code sent synchronously to {email}: {code}")
        except Exception as email_error:
            logger.error(f"Failed to send email synchronously to {email}: {str(email_error)}")

    cache.set(cache_key_ip, ip_requests + 1, 60)
    cache.set(cache_key_email, email_requests + 1, 60)

    logger.info(f"Verification code requested for {email} from IP {client_ip}")

    return Response(
        {
            "message": "Код верификации отправлен на ваш email",
            "email": email
        },
        status=status.HTTP_200_OK
    )


@csrf_exempt
@api_view(['POST', 'OPTIONS'])
@permission_classes([AllowAny])
def verify_code(request):
    """
    Endpoint для проверки кода верификации.
    """
    serializer = CodeVerificationSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(
            {"error": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )

    email = serializer.validated_data['email']
    code = serializer.validated_data['code']

    code_key = f"verification_code:{email}"
    code_data = cache.get(code_key)

    if not code_data:
        return Response(
            {
                "error": "Код верификации не найден или истек. Запросите новый код.",
                "error_type": "expired"
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    code_created_at = code_data.get('created_at')
    if code_created_at:
        time_since_creation = (timezone.now() - code_created_at).total_seconds()
        if time_since_creation > 600:
            cache.delete(code_key)
            return Response(
                {
                    "error": "Срок действия кода истёк. Запросите новый и попробуйте ещё раз",
                    "error_type": "expired"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

    attempts = code_data.get('attempts', 0)
    if attempts >= 5:
        cache.delete(code_key)
        return Response(
            {
                "error": "Превышено количество попыток. Запросите новый код.",
                "error_type": "expired"
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    stored_code = code_data.get('code')
    if stored_code == code:
        cache.delete(code_key)
        logger.info(f"Email {email} verified successfully")

        return Response(
            {
                "message": "Email адрес подтвержден",
                "verified": True
            },
            status=status.HTTP_200_OK
        )
    else:
        code_data['attempts'] = attempts + 1
        remaining_ttl = None
        if code_created_at:
            elapsed_time = (timezone.now() - code_created_at).total_seconds()
            remaining_ttl = max(0, int(600 - elapsed_time))
        else:
            try:
                remaining_ttl = cache.ttl(code_key)
            except AttributeError:
                remaining_ttl = 600
        if remaining_ttl and remaining_ttl > 0:
            cache.set(code_key, code_data, remaining_ttl)
        remaining_attempts = 5 - code_data['attempts']
        return Response(
            {
                "error": "Пароли не совпадают",
                "error_type": "invalid_code",
                "remaining_attempts": remaining_attempts
            },
            status=status.HTTP_400_BAD_REQUEST
        )
