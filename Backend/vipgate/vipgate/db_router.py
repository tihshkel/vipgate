"""
Database Router для разделения центральной и региональных баз данных.

Центральная БД (global_db): общие каталоги, конфигурация, метаданные
Региональные БД (regional_db): персональные данные пользователей
"""


class GlobalRegionalRouter:
    """
    Роутер для маршрутизации запросов к соответствующим базам данных.
    """
    
    # Приложения, которые используют центральную БД
    GLOBAL_APPS = {
        'global_db',
        'admin',
        'auth',
        'contenttypes',
        'sessions',
    }
    
    # Приложения, которые используют региональные БД
    REGIONAL_APPS = {
        'regional_db',
        # authentication больше не использует БД - коды в Redis
    }
    
    def db_for_read(self, model, **hints):
        """Определяет БД для чтения."""
        if model._meta.app_label in self.GLOBAL_APPS:
            return 'global'
        elif model._meta.app_label in self.REGIONAL_APPS:
            # В реальности здесь будет логика определения региона пользователя
            # Пока используем дефолтную региональную БД
            return self._get_regional_db(hints)
        return None
    
    def db_for_write(self, model, **hints):
        """Определяет БД для записи."""
        if model._meta.app_label in self.GLOBAL_APPS:
            return 'global'
        elif model._meta.app_label in self.REGIONAL_APPS:
            return self._get_regional_db(hints)
        return None
    
    def allow_relation(self, obj1, obj2, **hints):
        """Разрешает связи между объектами из разных БД."""
        # Разрешаем связи внутри одной БД
        db_set = {'global', 'us_canada', 'europe', 'asia', 'south_america', 'middle_east'}
        if obj1._state.db in db_set and obj2._state.db in db_set:
            return True
        return None
    
    def allow_migrate(self, db, app_label, model_name=None, **hints):
        """Определяет, где выполнять миграции."""
        if app_label in self.GLOBAL_APPS:
            return db == 'global'
        elif app_label in self.REGIONAL_APPS:
            return db in ['us_canada', 'europe', 'asia', 'south_america', 'middle_east']
        return None
    
    def _get_regional_db(self, hints):
        """
        Определяет региональную БД на основе hints (например, из request).
        По умолчанию возвращает 'us_canada' для разработки.
        """
        # В hints может быть передан instance с информацией о пользователе
        if 'instance' in hints:
            instance = hints['instance']
            if hasattr(instance, 'region'):
                return self._region_to_db(instance.region)
        
        # Можно получить из request через thread local storage
        # Пока используем дефолтную БД
        return 'us_canada'  # Для разработки
    
    @staticmethod
    def _region_to_db(region):
        """Преобразует регион в имя БД."""
        region_mapping = {
            'us_canada': 'us_canada',
            'europe': 'europe',
            'asia': 'asia',
            'south_america': 'south_america',
            'middle_east': 'middle_east',
        }
        return region_mapping.get(region, 'us_canada')

