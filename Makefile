.PHONY: build up down restart logs shell migrate createsuperuser backup

# Сборка образов
build:
	docker-compose -f docker-compose.prod.yml build

# Запуск контейнеров
up:
	docker-compose -f docker-compose.prod.yml up -d

# Остановка контейнеров
down:
	docker-compose -f docker-compose.prod.yml down

# Перезапуск
restart:
	docker-compose -f docker-compose.prod.yml restart

# Просмотр логов
logs:
	docker-compose -f docker-compose.prod.yml logs -f

# Логи backend
logs-backend:
	docker-compose -f docker-compose.prod.yml logs -f backend

# Логи frontend
logs-frontend:
	docker-compose -f docker-compose.prod.yml logs -f frontend

# Вход в контейнер backend
shell:
	docker-compose -f docker-compose.prod.yml exec backend bash

# Применение миграций
migrate:
	docker-compose -f docker-compose.prod.yml exec backend python manage.py migrate global_db --database=global
	docker-compose -f docker-compose.prod.yml exec backend python manage.py migrate regional_db --database=us_canada
	docker-compose -f docker-compose.prod.yml exec backend python manage.py migrate regional_db --database=europe
	docker-compose -f docker-compose.prod.yml exec backend python manage.py migrate regional_db --database=asia
	docker-compose -f docker-compose.prod.yml exec backend python manage.py migrate regional_db --database=south_america
	docker-compose -f docker-compose.prod.yml exec backend python manage.py migrate regional_db --database=middle_east

# Создание суперпользователя
createsuperuser:
	docker-compose -f docker-compose.prod.yml exec backend python manage.py shell

# Резервное копирование БД
backup:
	mkdir -p backups
	docker-compose -f docker-compose.prod.yml exec -T postgres-global pg_dump -U vipgate_user vipgate_global > backups/backup_global_$(shell date +%Y%m%d_%H%M%S).sql
	docker-compose -f docker-compose.prod.yml exec -T postgres-regional pg_dump -U vipgate_user vipgate_europe > backups/backup_europe_$(shell date +%Y%m%d_%H%M%S).sql
	docker-compose -f docker-compose.prod.yml exec -T postgres-regional pg_dump -U vipgate_user vipgate_us_canada > backups/backup_us_canada_$(shell date +%Y%m%d_%H%M%S).sql

# Очистка и пересборка
rebuild:
	docker-compose -f docker-compose.prod.yml down -v
	docker-compose -f docker-compose.prod.yml build --no-cache
	docker-compose -f docker-compose.prod.yml up -d

# Статус контейнеров
status:
	docker-compose -f docker-compose.prod.yml ps

