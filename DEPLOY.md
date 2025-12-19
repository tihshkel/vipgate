# Инструкция по развертыванию VIPGate на сервере

## Требования

- Docker и Docker Compose установлены на сервере
- IP адрес сервера: 109.73.198.109
- Порты 80, 443, 8000 должны быть открыты

## Шаг 1: Подготовка сервера

```bash
# Обновление системы
sudo apt update && sudo apt upgrade -y

# Установка Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Установка Docker Compose
sudo apt install docker-compose -y

# Добавление пользователя в группу docker
sudo usermod -aG docker $USER
```

## Шаг 2: Клонирование проекта на сервер

```bash
# Переход в домашнюю директорию
cd ~

# Клонирование репозитория (замените на ваш репозиторий)
git clone <your-repo-url> vipgate
cd vipgate
```

## Шаг 3: Создание файла .env

Создайте файл `.env` в корне проекта:

```bash
nano .env
```

Содержимое `.env`:

```env
# Секретный ключ Django (сгенерируйте новый!)
SECRET_KEY=your-very-secure-secret-key-here-change-this

# Пароль для PostgreSQL
POSTGRES_PASSWORD=your-secure-postgres-password

# SendGrid API Key (для отправки email)
SENDGRID_API_KEY=your-sendgrid-api-key
SENDGRID_FROM_EMAIL=noreply@vipgate.com

# Разрешенные хосты
ALLOWED_HOSTS=109.73.198.109,localhost,127.0.0.1
```

## Шаг 4: Сборка и запуск контейнеров

```bash
# Сборка образов
docker-compose -f docker-compose.prod.yml build

# Запуск контейнеров
docker-compose -f docker-compose.prod.yml up -d

# Проверка статуса
docker-compose -f docker-compose.prod.yml ps

# Просмотр логов
docker-compose -f docker-compose.prod.yml logs -f
```

## Шаг 5: Применение миграций

```bash
# Применение миграций для глобальной БД
docker-compose -f docker-compose.prod.yml exec backend python manage.py migrate global_db --database=global

# Применение миграций для региональных БД
docker-compose -f docker-compose.prod.yml exec backend python manage.py migrate regional_db --database=us_canada
docker-compose -f docker-compose.prod.yml exec backend python manage.py migrate regional_db --database=europe
docker-compose -f docker-compose.prod.yml exec backend python manage.py migrate regional_db --database=asia
docker-compose -f docker-compose.prod.yml exec backend python manage.py migrate regional_db --database=south_america
docker-compose -f docker-compose.prod.yml exec backend python manage.py migrate regional_db --database=middle_east
```

## Шаг 6: Создание суперпользователя

```bash
docker-compose -f docker-compose.prod.yml exec backend python manage.py shell
```

В Python shell:

```python
from vipgate.regional_db.models import User
from vipgate.global_db.models import Region, UserRegistry

# Убедитесь, что регионы созданы
from vipgate.vipgate.utils import ensure_regions_exist
ensure_regions_exist()

# Создание суперпользователя
region = Region.objects.using('global').get(code='europe')
user = User.objects.using('europe').create_user(
    email='admin@vipgate.com',
    password='your-secure-password',
    is_staff=True,
    is_superuser=True,
    is_verified=True
)

# Создание записи в глобальном реестре
UserRegistry.objects.using('global').create(
    email='admin@vipgate.com',
    region=region,
    is_active=True
)
```

## Шаг 7: Проверка работы

Откройте в браузере:
- Frontend: http://109.73.198.109
- Backend API: http://109.73.198.109:8000/api/
- Admin панель: http://109.73.198.109:8000/admin/

## Полезные команды

```bash
# Остановка контейнеров
docker-compose -f docker-compose.prod.yml down

# Перезапуск контейнеров
docker-compose -f docker-compose.prod.yml restart

# Просмотр логов конкретного сервиса
docker-compose -f docker-compose.prod.yml logs -f backend
docker-compose -f docker-compose.prod.yml logs -f frontend

# Вход в контейнер
docker-compose -f docker-compose.prod.yml exec backend bash

# Очистка и пересборка
docker-compose -f docker-compose.prod.yml down -v
docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d
```

## Настройка SSL (опционально)

Если у вас есть SSL сертификаты:

1. Создайте директорию `nginx/ssl/`
2. Поместите сертификаты:
   - `cert.pem` - сертификат
   - `key.pem` - приватный ключ
3. Раскомментируйте HTTPS секцию в `nginx/nginx.conf`
4. Перезапустите nginx:

```bash
docker-compose -f docker-compose.prod.yml restart nginx
```

## Резервное копирование БД

```bash
# Бэкап глобальной БД
docker-compose -f docker-compose.prod.yml exec postgres-global pg_dump -U vipgate_user vipgate_global > backup_global.sql

# Бэкап региональных БД
docker-compose -f docker-compose.prod.yml exec postgres-regional pg_dump -U vipgate_user vipgate_europe > backup_europe.sql
```

## Мониторинг

```bash
# Использование ресурсов
docker stats

# Проверка здоровья контейнеров
docker-compose -f docker-compose.prod.yml ps
```

## Обновление приложения

```bash
# Получение последних изменений
git pull

# Пересборка и перезапуск
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up -d

# Применение новых миграций
docker-compose -f docker-compose.prod.yml exec backend python manage.py migrate
```

