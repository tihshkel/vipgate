from celery import shared_task
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
from datetime import timedelta
import logging

logger = logging.getLogger(__name__)


@shared_task(bind=True, max_retries=3, default_retry_delay=60)
def send_verification_code_email(self, email: str, code: str):
    """
    Асинхронная задача Celery для отправки кода верификации на email.
    Использует retry механизм для надежности.
    """
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

        logger.info(f"Verification code sent successfully to {email}")
        return {"status": "success", "email": email}

    except Exception as exc:
        logger.error(f"Failed to send verification code to {email}: {str(exc)}")
        # Retry с экспоненциальной задержкой
        raise self.retry(exc=exc)


# Задача cleanup_expired_codes больше не нужна
# Redis автоматически удаляет записи с истекшим TTL

