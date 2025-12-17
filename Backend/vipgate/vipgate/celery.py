"""
Celery configuration для асинхронных задач.
"""
import os
import sys
from celery import Celery
from django.conf import settings

# Устанавливаем дефолтный модуль настроек Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'vipgate.settings')

app = Celery('vipgate')

# Загружаем настройки из Django settings
app.config_from_object('django.conf:settings', namespace='CELERY')

# Исправление для Windows: устанавливаем solo pool для избежания проблем с multiprocessing
# Это устраняет PermissionError при работе с процессами на Windows
if sys.platform.startswith('win'):
    # Устанавливаем worker pool через переменную окружения (это работает)
    os.environ.setdefault('CELERY_WORKER_POOL', 'solo')
    # Также пытаемся установить через конфигурацию (может не работать для worker_pool)
    app.conf.worker_pool = 'solo'
    app.conf.worker_prefetch_multiplier = 1

# Автоматически находим задачи во всех установленных приложениях
app.autodiscover_tasks()


@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')

