"""
Celery configuration для асинхронных задач.
"""
import os
import sys
from celery import Celery
from django.conf import settings


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'vipgate.vipgate.settings')

app = Celery('vipgate')

app.config_from_object('django.conf:settings', namespace='CELERY')

app.conf.broker_url = 'redis://127.0.0.1:6379/0'
app.conf.result_backend = 'redis://127.0.0.1:6379/0'



if sys.platform.startswith('win'):
    os.environ.setdefault('CELERY_WORKER_POOL', 'solo')
    app.conf.worker_pool = 'solo'
    app.conf.worker_prefetch_multiplier = 1


app.autodiscover_tasks()


@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')

