"""
Database Router для разделения центральной и региональных баз данных.

Центральная БД (global_db): общие каталоги, конфигурация, метаданные
Региональные БД (regional_db): персональные данные пользователей
"""


class GlobalRegionalRouter:
    """
    Роутер для маршрутизации запросов к соответствующим базам данных.
    """
    GLOBAL_APPS = {
        'global_db',
        'admin',
        'auth',
        'contenttypes',
        'sessions',
    }
    REGIONAL_APPS = {
        'regional_db',
    }
    def db_for_read(self, model, **hints):
        """Определяет БД для чтения."""
        if model._meta.app_label in self.GLOBAL_APPS:
            return 'global'
        elif model._meta.app_label in self.REGIONAL_APPS:
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
        db_set = {'global', 'us_canada', 'europe', 'asia', 'south_america', 'middle_east'}
        if obj1._state.db in db_set and obj2._state.db in db_set:
            return True
        return None
    def allow_migrate(self, db, app_label, model_name=None, **hints):
        """Определяет, где выполнять миграции."""
        if app_label in self.GLOBAL_APPS:
            # Глобальные приложения только в глобальной БД
            if app_label == 'global_db':
                return db == 'global'
            # auth и contenttypes нужны и в региональных БД для PermissionsMixin
            elif app_label in ['auth', 'contenttypes']:
                return db in ['global', 'us_canada', 'europe', 'asia', 'south_america', 'middle_east']
            # admin, sessions только в глобальной БД
            else:
                return db == 'global'
        elif app_label in self.REGIONAL_APPS:
            return db in ['us_canada', 'europe', 'asia', 'south_america', 'middle_east']
        return None
    def _get_regional_db(self, hints):
        """
        Определяет региональную БД на основе hints (например, из request).
        По умолчанию возвращает 'us_canada' для разработки.
        """
        if 'instance' in hints:
            instance = hints['instance']
            if hasattr(instance, 'region'):
                return self._region_to_db(instance.region)
        return 'us_canada'
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

