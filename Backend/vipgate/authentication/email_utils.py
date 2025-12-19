"""
Утилита для отправки email через SendGrid API.
"""
import logging
from django.conf import settings
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

logger = logging.getLogger(__name__)


def send_email_via_sendgrid(to_email: str, subject: str, message: str, from_email: str = None, from_name: str = None):
    """
    Отправляет email через SendGrid API.
    
    Args:
        to_email: Email получателя
        subject: Тема письма
        message: Текст письма
        from_email: Email отправителя (по умолчанию из настроек)
        from_name: Имя отправителя (по умолчанию из настроек)
    
    Returns:
        bool: True если отправка успешна, False в случае ошибки
    """
    try:
        sendgrid_api_key = getattr(settings, 'SENDGRID_API_KEY', None)
        if not sendgrid_api_key:
            logger.error("SENDGRID_API_KEY не настроен в settings")
            return False
        
        if not from_email:
            from_email = getattr(settings, 'SENDGRID_FROM_EMAIL', 'noreply@vipgate.com')
        
        if not from_name:
            from_name = getattr(settings, 'SENDGRID_FROM_NAME', 'VIPGate Team')
        
        # Создаем объект Mail
        mail = Mail(
            from_email=(from_email, from_name),
            to_emails=to_email,
            subject=subject,
            plain_text_content=message
        )
        
        # Отправляем через SendGrid
        sg = SendGridAPIClient(sendgrid_api_key)
        response = sg.send(mail)
        
        if response.status_code in [200, 202]:
            logger.info(f"Email успешно отправлен через SendGrid на {to_email}")
            return True
        else:
            logger.error(f"Ошибка отправки email через SendGrid: статус {response.status_code}")
            return False
            
    except Exception as e:
        logger.error(f"Исключение при отправке email через SendGrid: {str(e)}")
        return False
