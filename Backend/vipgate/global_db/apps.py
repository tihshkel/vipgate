from django.apps import AppConfig


class GlobalDbConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'vipgate.global_db'
    verbose_name = 'Центральная база данных'

