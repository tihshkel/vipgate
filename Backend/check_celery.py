"""
Скрипт для проверки работы Celery
"""
import os
import sys
import django

# Настройка Django
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'vipgate.settings')
django.setup()

from celery import current_app

def check_celery():
    """Проверяет статус Celery"""
    print("=" * 60)
    print("Проверка Celery")
    print("=" * 60)
    
    # Проверка активных воркеров
    inspect = current_app.control.inspect()
    
    # Статистика
    stats = inspect.stats()
    if stats:
        print("\n✅ Celery Worker найден:")
        for worker_name, worker_stats in stats.items():
            print(f"   - {worker_name}")
            print(f"     Pool: {worker_stats.get('pool', {}).get('implementation', 'unknown')}")
            print(f"     Processes: {worker_stats.get('pool', {}).get('max-concurrency', 'unknown')}")
    else:
        print("\n❌ Celery Worker не найден!")
        print("   Запустите: celery -A vipgate.celery worker --loglevel=info --pool=solo")
        return False
    
    # Активные задачи
    active = inspect.active()
    if active:
        print("\n📋 Активные задачи:")
        for worker_name, tasks in active.items():
            for task in tasks:
                print(f"   - {task['name']} (ID: {task['id']})")
    else:
        print("\n📋 Активных задач нет")
    
    # Зарегистрированные задачи
    registered = inspect.registered()
    if registered:
        print("\n📝 Зарегистрированные задачи:")
        for worker_name, tasks in registered.items():
            for task_name in tasks:
                print(f"   - {task_name}")
    
    # Проверка подключения к брокеру
    try:
        info = current_app.control.inspect().stats()
        if info:
            print("\n✅ Подключение к брокеру (Redis) работает")
        else:
            print("\n⚠️ Не удалось получить информацию от брокера")
    except Exception as e:
        print(f"\n❌ Ошибка подключения к брокеру: {e}")
        return False
    
    print("\n" + "=" * 60)
    print("✅ Проверка завершена")
    print("=" * 60)
    return True

if __name__ == '__main__':
    check_celery()

