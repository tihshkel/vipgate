"""
Утилиты для работы с кешем курсов валют.
Курсы валют хранятся в Redis с TTL 15-60 минут.
"""
from django.core.cache import cache
from django.utils import timezone
from datetime import timedelta
import logging

logger = logging.getLogger(__name__)


def get_currency_rate(base_currency: str, target_currency: str) -> float:
    """
    Получает курс валюты из кеша.
    
    Args:
        base_currency: Базовая валюта (например, 'USD')
        target_currency: Целевая валюта (например, 'EUR')
    
    Returns:
        float: Курс обмена или None если не найден
    """
    if base_currency == target_currency:
        return 1.0
    
    cache_key = f"currency_rate:{base_currency}:{target_currency}"
    rate = cache.get(cache_key)
    
    if rate is None:
        logger.warning(f"Currency rate not found in cache: {base_currency} -> {target_currency}")
    
    return rate


def set_currency_rate(base_currency: str, target_currency: str, rate: float, ttl_minutes: int = 30):
    """
    Сохраняет курс валюты в кеш.
    
    Args:
        base_currency: Базовая валюта
        target_currency: Целевая валюта
        rate: Курс обмена
        ttl_minutes: Время жизни в минутах (по умолчанию 30)
    """
    if base_currency == target_currency:
        return
    
    cache_key = f"currency_rate:{base_currency}:{target_currency}"
    cache.set(cache_key, rate, ttl_minutes * 60)  # Конвертируем минуты в секунды
    
    logger.info(f"Currency rate cached: {base_currency} -> {target_currency} = {rate}")


def get_all_currency_rates(base_currency: str = 'USD') -> dict:
    """
    Получает все курсы валют относительно базовой валюты.
    
    Args:
        base_currency: Базовая валюта
    
    Returns:
        dict: Словарь {валюта: курс}
    """
    # Здесь можно реализовать получение всех курсов из кеша
    # или из внешнего API если их нет в кеше
    rates = {}
    
    # Пример: получаем популярные валюты
    currencies = ['USD', 'EUR', 'GBP', 'RUB', 'JPY', 'CNY']
    
    for currency in currencies:
        if currency != base_currency:
            rate = get_currency_rate(base_currency, currency)
            if rate:
                rates[currency] = rate
    
    return rates


def convert_currency(amount: float, from_currency: str, to_currency: str) -> float:
    """
    Конвертирует сумму из одной валюты в другую.
    
    Args:
        amount: Сумма для конвертации
        from_currency: Исходная валюта
        to_currency: Целевая валюта
    
    Returns:
        float: Конвертированная сумма или None если курс не найден
    """
    if from_currency == to_currency:
        return amount
    
    rate = get_currency_rate(from_currency, to_currency)
    if rate is None:
        return None
    
    return amount * rate

