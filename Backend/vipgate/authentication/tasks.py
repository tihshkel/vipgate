from celery import shared_task
from django.conf import settings
from django.utils import timezone
from datetime import timedelta
import logging
from .email_utils import send_email_via_sendgrid

logger = logging.getLogger(__name__)


@shared_task(bind=True, max_retries=3, default_retry_delay=60)
def send_verification_code_email(self, email: str, code: str):
    """
    Асинхронная задача Celery для отправки кода верификации на email через SendGrid.
    Использует retry механизм для надежности.
    """
    try:
        subject = "Код подтверждения VIPGate"
        message = f"""Здравствуйте!

Ваш код подтверждения для входа в VIPGate: {code}

Код действителен в течение 10 минут.

Если вы не запрашивали этот код, проигнорируйте это письмо.

С уважением,
Команда VIPGate""".strip()

        success = send_email_via_sendgrid(
            to_email=email,
            subject=subject,
            message=message
        )

        if success:
            logger.info(f"Verification code sent successfully to {email} via SendGrid")
            return {"status": "success", "email": email}
        else:
            raise Exception("SendGrid вернул ошибку при отправке email")

    except Exception as exc:
        logger.error(f"Failed to send verification code to {email}: {str(exc)}")
        raise self.retry(exc=exc)





