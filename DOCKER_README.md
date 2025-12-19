# Docker развертывание VIPGate

## Быстрый старт

1. **Создайте файл `.env`** в корне проекта:
```env
SECRET_KEY=your-secret-key-here
POSTGRES_PASSWORD=your-secure-password
SENDGRID_API_KEY=your-sendgrid-key
ALLOWED_HOSTS=109.73.198.109,localhost
```

2. **Запустите проект**:
```bash
make build
make up
make migrate
```

3. **Откройте в браузере**: http://109.73.198.109

## Структура

- `Backend/Dockerfile` - образ для Django backend
- `Frontend/Dockerfile` - образ для React frontend
- `docker-compose.prod.yml` - конфигурация для продакшена
- `nginx/nginx.conf` - конфигурация nginx для проксирования
- `init-regional-dbs.sql` - скрипт создания региональных БД

## Сервисы

- **nginx** (порт 80) - проксирует запросы к frontend и backend
- **frontend** - React приложение
- **backend** (порт 8000) - Django API
- **celery** - фоновые задачи
- **postgres-global** - глобальная БД
- **postgres-regional** - региональные БД
- **redis** - кеш и брокер для Celery

## Полезные команды

См. `Makefile` для всех доступных команд:
- `make build` - сборка образов
- `make up` - запуск контейнеров
- `make down` - остановка
- `make logs` - просмотр логов
- `make migrate` - применение миграций
- `make backup` - резервное копирование БД

Подробная инструкция в `DEPLOY.md`

