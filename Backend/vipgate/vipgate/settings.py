"""
Django settings for vipgate project.
Профессиональная конфигурация с поддержкой async, Celery, Redis и оптимизацией производительности.
"""

from pathlib import Path
import os
from django.core.exceptions import ImproperlyConfigured
import environ

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent.parent.parent

# Инициализация environ
env = environ.Env(
    DEBUG=(bool, False),
    SECRET_KEY=(str, ''),
)

# Чтение .env файла
environ.Env.read_env(BASE_DIR / '.env')

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env('SECRET_KEY', default='django-insecure-!6a9h6b(!yk3kza$vubwgm^-cr_u5!uxno^zwbi@#v!hh07@1w')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env('DEBUG', default=True)

ALLOWED_HOSTS = env.list('ALLOWED_HOSTS', default=['localhost', '127.0.0.1'])

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Third party apps
    'rest_framework',
    'corsheaders',
    # 'storages',  # Для Google Cloud Storage (установите django-storages если нужно)
    
    # Local apps
    'vipgate.global_db',
    'vipgate.regional_db',
    'authentication',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # CORS должен быть ПЕРВЫМ
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',  # Для админ-панели
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'vipgate.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'vipgate.wsgi.application'
ASGI_APPLICATION = 'vipgate.asgi.application'

# Database
# Множественные базы данных: центральная (global) и региональные
# Для разработки: SQLite3 (по умолчанию)
# Для продакшена: PostgreSQL (настраивается через .env)

# Определяем, используем ли PostgreSQL или SQLite
USE_POSTGRESQL = env.bool('USE_POSTGRESQL', default=False)

if USE_POSTGRESQL:
    # Конфигурация для PostgreSQL (продакшен)
    DATABASES = {
        'default': {
            'ENGINE': env('DB_ENGINE', default='django.db.backends.postgresql'),
            'NAME': env('DB_NAME', default='vipgate_default'),
            'USER': env('DB_USER', default='vipgate_user'),
            'PASSWORD': env('DB_PASSWORD', default=''),
            'HOST': env('DB_HOST', default='localhost'),
            'PORT': env('DB_PORT', default='5432'),
            'OPTIONS': {
                'connect_timeout': 10,
            },
            'CONN_MAX_AGE': 600,
        },
        # Центральная база данных (Global Database)
        'global': {
            'ENGINE': env('GLOBAL_DB_ENGINE', default='django.db.backends.postgresql'),
            'NAME': env('GLOBAL_DB_NAME', default='vipgate_global'),
            'USER': env('GLOBAL_DB_USER', default='vipgate_user'),
            'PASSWORD': env('GLOBAL_DB_PASSWORD', default=''),
            'HOST': env('GLOBAL_DB_HOST', default='localhost'),
            'PORT': env('GLOBAL_DB_PORT', default='5432'),
            'OPTIONS': {
                'connect_timeout': 10,
            },
            'CONN_MAX_AGE': 600,
        },
        # Региональные базы данных
        'us_canada': {
            'ENGINE': env('REGIONAL_DB_ENGINE', default='django.db.backends.postgresql'),
            'NAME': env('US_CANADA_DB_NAME', default='vipgate_us_canada'),
            'USER': env('REGIONAL_DB_USER', default='vipgate_user'),
            'PASSWORD': env('REGIONAL_DB_PASSWORD', default=''),
            'HOST': env('US_CANADA_DB_HOST', default='localhost'),
            'PORT': env('REGIONAL_DB_PORT', default='5432'),
            'OPTIONS': {
                'connect_timeout': 10,
            },
            'CONN_MAX_AGE': 600,
        },
        'europe': {
            'ENGINE': env('REGIONAL_DB_ENGINE', default='django.db.backends.postgresql'),
            'NAME': env('EUROPE_DB_NAME', default='vipgate_europe'),
            'USER': env('REGIONAL_DB_USER', default='vipgate_user'),
            'PASSWORD': env('REGIONAL_DB_PASSWORD', default=''),
            'HOST': env('EUROPE_DB_HOST', default='localhost'),
            'PORT': env('REGIONAL_DB_PORT', default='5432'),
            'OPTIONS': {
                'connect_timeout': 10,
            },
            'CONN_MAX_AGE': 600,
        },
        'asia': {
            'ENGINE': env('REGIONAL_DB_ENGINE', default='django.db.backends.postgresql'),
            'NAME': env('ASIA_DB_NAME', default='vipgate_asia'),
            'USER': env('REGIONAL_DB_USER', default='vipgate_user'),
            'PASSWORD': env('REGIONAL_DB_PASSWORD', default=''),
            'HOST': env('ASIA_DB_HOST', default='localhost'),
            'PORT': env('REGIONAL_DB_PORT', default='5432'),
            'OPTIONS': {
                'connect_timeout': 10,
            },
            'CONN_MAX_AGE': 600,
        },
        'south_america': {
            'ENGINE': env('REGIONAL_DB_ENGINE', default='django.db.backends.postgresql'),
            'NAME': env('SOUTH_AMERICA_DB_NAME', default='vipgate_south_america'),
            'USER': env('REGIONAL_DB_USER', default='vipgate_user'),
            'PASSWORD': env('REGIONAL_DB_PASSWORD', default=''),
            'HOST': env('SOUTH_AMERICA_DB_HOST', default='localhost'),
            'PORT': env('REGIONAL_DB_PORT', default='5432'),
            'OPTIONS': {
                'connect_timeout': 10,
            },
            'CONN_MAX_AGE': 600,
        },
        'middle_east': {
            'ENGINE': env('REGIONAL_DB_ENGINE', default='django.db.backends.postgresql'),
            'NAME': env('MIDDLE_EAST_DB_NAME', default='vipgate_middle_east'),
            'USER': env('REGIONAL_DB_USER', default='vipgate_user'),
            'PASSWORD': env('REGIONAL_DB_PASSWORD', default=''),
            'HOST': env('MIDDLE_EAST_DB_HOST', default='localhost'),
            'PORT': env('REGIONAL_DB_PORT', default='5432'),
            'OPTIONS': {
                'connect_timeout': 10,
            },
            'CONN_MAX_AGE': 600,
        },
    }
else:
    # Конфигурация для SQLite3 (разработка)
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db_default.sqlite3',
        },
        # Центральная база данных (Global Database)
        'global': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db_global.sqlite3',
        },
        # Региональные базы данных
        'us_canada': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db_us_canada.sqlite3',
        },
        'europe': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db_europe.sqlite3',
        },
        'asia': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db_asia.sqlite3',
        },
        'south_america': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db_south_america.sqlite3',
        },
        'middle_east': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db_middle_east.sqlite3',
        },
    }

# Database Router
DATABASE_ROUTERS = ['vipgate.vipgate.db_router.GlobalRegionalRouter']

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
LANGUAGE_CODE = 'ru-ru'
TIME_ZONE = 'Europe/Moscow'
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

MEDIA_URL = 'media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Custom User Model
AUTH_USER_MODEL = 'regional_db.User'

# REST Framework settings
REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework.parsers.JSONParser',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/hour',
    },
    # Отключаем CSRF для API
    'DEFAULT_AUTHENTICATION_CLASSES': [],
}

# Frontend and Backend URLs
FRONTEND_URL = env('FRONTEND_URL', default='http://localhost:5173')
BACKEND_URL = env('BACKEND_URL', default='http://localhost:8000')

# CORS settings
# Для разработки разрешаем все origins (без credentials)
if DEBUG:
    CORS_ALLOW_ALL_ORIGINS = True
    CORS_ALLOW_CREDENTIALS = False
else:
    CORS_ALLOW_ALL_ORIGINS = False
    CORS_ALLOWED_ORIGINS = env.list('CORS_ALLOWED_ORIGINS', default=[])
    CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD']
CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]

# Email settings
EMAIL_BACKEND = env('EMAIL_BACKEND', default='django.core.mail.backends.console.EmailBackend')
EMAIL_HOST = env('EMAIL_HOST', default='smtp.gmail.com')
EMAIL_PORT = env.int('EMAIL_PORT', default=587)
EMAIL_USE_TLS = env.bool('EMAIL_USE_TLS', default=True)
EMAIL_USE_SSL = env.bool('EMAIL_USE_SSL', default=False)
EMAIL_HOST_USER = env('EMAIL_HOST_USER', default='')
EMAIL_HOST_PASSWORD = env('EMAIL_HOST_PASSWORD', default='')
DEFAULT_FROM_EMAIL = env('DEFAULT_FROM_EMAIL', default='noreply@vipgate.com')

# Celery Configuration
CELERY_BROKER_URL = env('CELERY_BROKER_URL', default='redis://localhost:6379/0')
CELERY_RESULT_BACKEND = env('CELERY_RESULT_BACKEND', default='redis://localhost:6379/0')
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TIMEZONE = TIME_ZONE
CELERY_TASK_TRACK_STARTED = True
CELERY_TASK_TIME_LIMIT = 30 * 60  # 30 минут
CELERY_TASK_SOFT_TIME_LIMIT = 25 * 60  # 25 минут
CELERY_WORKER_PREFETCH_MULTIPLIER = 4  # Оптимизация для async
CELERY_TASK_ACKS_LATE = True
CELERY_TASK_REJECT_ON_WORKER_LOST = True

# Исправление для Windows: используем solo pool вместо процессов
# Это устраняет PermissionError при работе с multiprocessing на Windows
import sys
if sys.platform.startswith('win'):
    CELERY_WORKER_POOL = 'solo'
    # Отключаем prefetch для solo pool
    CELERY_WORKER_PREFETCH_MULTIPLIER = 1

# Redis Cache Configuration
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': env('REDIS_URL', default='redis://127.0.0.1:6379/1'),
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
            'SOCKET_CONNECT_TIMEOUT': 5,
            'SOCKET_TIMEOUT': 5,
            'COMPRESSOR': 'django_redis.compressors.zlib.ZlibCompressor',
            'IGNORE_EXCEPTIONS': True,
        },
        'KEY_PREFIX': 'vipgate',
        'TIMEOUT': 300,
    }
}

# Session configuration (используем Redis)
SESSION_ENGINE = 'django.contrib.sessions.backends.cache'
SESSION_CACHE_ALIAS = 'default'

# Logging
import os
logs_dir = BASE_DIR / 'logs'
os.makedirs(logs_dir, exist_ok=True)  # Создаем папку logs если её нет

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
        'file': {
            'class': 'logging.FileHandler',
            'filename': logs_dir / 'django.log',
            'formatter': 'verbose',
        },
    },
    'root': {
        'handlers': ['console', 'file'],
        'level': 'INFO',
    },
    'loggers': {
        'django': {
            'handlers': ['console', 'file'],
            'level': 'INFO',
            'propagate': False,
        },
        'authentication': {
            'handlers': ['console', 'file'],
            'level': 'DEBUG',
            'propagate': False,
        },
    },
}

# Google Cloud Storage settings
USE_GCS = env.bool('USE_GCS', default=False)
if USE_GCS:
    DEFAULT_FILE_STORAGE = 'storages.backends.gcloud.GoogleCloudStorage'
    GS_BUCKET_NAME = env('GS_BUCKET_NAME', default='vipgate-media')
    GS_PROJECT_ID = env('GS_PROJECT_ID', default='')
    GS_CREDENTIALS = env('GS_CREDENTIALS', default=None)  # Path to JSON credentials
    GS_DEFAULT_ACL = 'publicRead'
    GS_FILE_OVERWRITE = False
    # CDN URL для быстрой доставки контента
    MEDIA_URL = env('CDN_MEDIA_URL', default=f'https://storage.googleapis.com/{GS_BUCKET_NAME}/')
else:
    # Локальное хранилище для разработки
    MEDIA_URL = '/media/'
    MEDIA_ROOT = BASE_DIR / 'media'

# Frontend and Backend URLs (для использования в коде)
# Доступны через settings.FRONTEND_URL и settings.BACKEND_URL

# Security settings (для продакшена)
if not DEBUG:
    SECURE_SSL_REDIRECT = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_BROWSER_XSS_FILTER = True
    SECURE_CONTENT_TYPE_NOSNIFF = True
    X_FRAME_OPTIONS = 'DENY'
