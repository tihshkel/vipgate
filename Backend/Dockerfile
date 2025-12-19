# Backend Dockerfile для Django
FROM python:3.12-slim

# Установка системных зависимостей
RUN apt-get update && apt-get install -y \
    postgresql-client \
    gcc \
    python3-dev \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Рабочая директория
WORKDIR /app

# Копирование requirements и установка зависимостей
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копирование кода приложения
COPY . .

# Создание директорий для логов и медиа
RUN mkdir -p /app/logs /app/media/profile_photos

# Переменные окружения
ENV PYTHONUNBUFFERED=1
ENV DJANGO_SETTINGS_MODULE=vipgate.vipgate.settings

# Порт для Django
EXPOSE 8000

# Команда запуска
CMD ["gunicorn", "vipgate.vipgate.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "4", "--timeout", "120"]

