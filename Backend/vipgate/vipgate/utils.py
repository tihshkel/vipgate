"""
Утилиты для работы с региональной архитектурой.
"""
from django.conf import settings
from django.core.cache import cache
import ipaddress


try:
    import geoip2.database
    import geoip2.errors
    GEOIP2_AVAILABLE = True
except ImportError:
    GEOIP2_AVAILABLE = False


def get_region_from_ip(ip_address: str) -> str:
    """
    Определяет регион пользователя на основе IP адреса.
    Использует GeoIP2 базу данных.
    Returns:
        str: Код региона ('us_canada', 'europe', 'asia', 'south_america', 'middle_east')
    """
    cache_key = f'region_ip:{ip_address}'
    cached_region = cache.get(cache_key)
    if cached_region:
        return cached_region
    try:
        ip = ipaddress.ip_address(ip_address)
        if ip.is_private or ip.is_loopback:
            default_region = 'us_canada'
            cache.set(cache_key, default_region, 3600)
            return default_region
    except ValueError:
        pass
    region = 'us_canada'
    if GEOIP2_AVAILABLE:
        try:
            geoip_db_path = getattr(settings, 'GEOIP2_DB_PATH', None)
            if geoip_db_path:
                with geoip2.database.Reader(geoip_db_path) as reader:
                    try:
                        response = reader.country(ip_address)
                        country_code = response.country.iso_code
                        region = _country_to_region(country_code)
                    except geoip2.errors.AddressNotFoundError:
                        pass
        except Exception:
            pass
    cache.set(cache_key, region, 3600)
    return region


def _country_to_region(country_code: str) -> str:
    """
    Преобразует код страны в регион.
    """
    us_canada = {'US', 'CA'}
    europe = {
        'GB', 'FR', 'DE', 'IT', 'ES', 'NL', 'BE', 'AT', 'CH', 'SE', 'NO', 'DK',
        'FI', 'PL', 'CZ', 'IE', 'PT', 'GR', 'HU', 'RO', 'BG', 'HR', 'SK', 'SI',
        'EE', 'LV', 'LT', 'LU', 'MT', 'CY', 'IS', 'LI', 'MC', 'AD', 'SM', 'VA'
    }
    asia = {
        'CN', 'JP', 'KR', 'IN', 'SG', 'MY', 'TH', 'VN', 'ID', 'PH', 'TW', 'HK',
        'AU', 'NZ', 'BD', 'PK', 'LK', 'MM', 'KH', 'LA', 'BN', 'MN', 'NP', 'BT'
    }
    middle_east = {
        'AE', 'SA', 'QA', 'KW', 'OM', 'BH', 'JO', 'LB', 'IL', 'TR', 'IR', 'IQ',
        'YE', 'SY', 'PS', 'EG', 'LY', 'TN', 'DZ', 'MA', 'SD', 'SO', 'DJ', 'ER'
    }
    south_america = {
        'BR', 'AR', 'CL', 'CO', 'PE', 'VE', 'EC', 'BO', 'PY', 'UY', 'GY', 'SR',
        'GF', 'FK'
    }
    if country_code in us_canada:
        return 'us_canada'
    elif country_code in europe:
        return 'europe'
    elif country_code in asia:
        return 'asia'
    elif country_code in middle_east:
        return 'middle_east'
    elif country_code in south_america:
        return 'south_america'
    else:
        return 'us_canada'


def get_regional_db(region: str) -> str:
    """
    Возвращает имя базы данных для указанного региона.
    """
    region_db_mapping = {
        'us_canada': 'us_canada',
        'europe': 'europe',
        'asia': 'asia',
        'south_america': 'south_america',
        'middle_east': 'middle_east',
    }
    return region_db_mapping.get(region, 'us_canada')


def get_user_region_from_email(email: str) -> str:
    """
    Определяет регион пользователя на основе email из реестра.
    Если пользователь не найден, возвращает None.
    """
    from vipgate.global_db.models import UserRegistry
    try:
        user_registry = UserRegistry.objects.using('global').get(email=email)
        return user_registry.region.code
    except UserRegistry.DoesNotExist:
        return None

