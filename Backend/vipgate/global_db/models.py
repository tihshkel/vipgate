"""
Модели для центральной базы данных (Global Database).

Хранит общие для всех регионов данные:
- Реестр пользователей (метаданные)
- Каталоги (аэропорты, терминалы, услуги)
- Конфигурация регионов
- FAQ, статьи, информационные страницы
- Глобальная реферальная система
"""
from django.db import models
from django.core.validators import EmailValidator


class Region(models.Model):
    """Конфигурация регионов."""
    REGION_CHOICES = [
        ('us_canada', 'США и Канада'),
        ('europe', 'Европа'),
        ('asia', 'Азия и Австралия'),
        ('south_america', 'Южная Америка'),
        ('middle_east', 'Ближний Восток'),
    ]
    
    code = models.CharField(
        max_length=20,
        choices=REGION_CHOICES,
        unique=True,
        db_index=True,
        verbose_name="Код региона"
    )
    name = models.CharField(max_length=100, verbose_name="Название региона")
    database_name = models.CharField(max_length=50, verbose_name="Имя БД")
    is_active = models.BooleanField(default=True, verbose_name="Активен")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        app_label = 'global_db'
        db_table = 'regions'
        verbose_name = "Регион"
        verbose_name_plural = "Регионы"
    
    def __str__(self):
        return self.name


class UserRegistry(models.Model):
    """
    Реестр пользователей в центральной БД.
    Хранит только метаданные, персональные данные в региональных БД.
    """
    email = models.EmailField(
        max_length=255,
        unique=True,
        db_index=True,
        validators=[EmailValidator()],
        verbose_name="Email"
    )
    region = models.ForeignKey(
        Region,
        on_delete=models.PROTECT,
        db_index=True,
        verbose_name="Регион"
    )
    is_active = models.BooleanField(default=True, db_index=True, verbose_name="Активен")
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_login = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        app_label = 'global_db'
        db_table = 'user_registry'
        indexes = [
            models.Index(fields=['email', 'is_active']),
            models.Index(fields=['region', 'is_active']),
        ]
        verbose_name = "Пользователь (реестр)"
        verbose_name_plural = "Реестр пользователей"
    
    def __str__(self):
        return f"{self.email} ({self.region.name})"


class Airport(models.Model):
    """Каталог аэропортов."""
    iata_code = models.CharField(
        max_length=3,
        unique=True,
        db_index=True,
        verbose_name="IATA код"
    )
    icao_code = models.CharField(
        max_length=4,
        unique=True,
        null=True,
        blank=True,
        db_index=True,
        verbose_name="ICAO код"
    )
    name = models.CharField(max_length=255, verbose_name="Название")
    city = models.CharField(max_length=100, db_index=True, verbose_name="Город")
    country = models.CharField(max_length=100, db_index=True, verbose_name="Страна")
    region = models.ForeignKey(
        Region,
        on_delete=models.PROTECT,
        db_index=True,
        verbose_name="Регион"
    )
    latitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        null=True,
        blank=True,
        verbose_name="Широта"
    )
    longitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        null=True,
        blank=True,
        verbose_name="Долгота"
    )
    is_active = models.BooleanField(default=True, db_index=True, verbose_name="Активен")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        app_label = 'global_db'
        db_table = 'airports'
        indexes = [
            models.Index(fields=['region', 'is_active']),
            models.Index(fields=['country', 'city']),
        ]
        verbose_name = "Аэропорт"
        verbose_name_plural = "Аэропорты"
        ordering = ['name']
    
    def __str__(self):
        return f"{self.name} ({self.iata_code})"


class Terminal(models.Model):
    """Каталог терминалов."""
    airport = models.ForeignKey(
        Airport,
        on_delete=models.CASCADE,
        related_name='terminals',
        db_index=True,
        verbose_name="Аэропорт"
    )
    name = models.CharField(max_length=100, verbose_name="Название терминала")
    code = models.CharField(max_length=10, verbose_name="Код терминала")
    is_active = models.BooleanField(default=True, verbose_name="Активен")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        app_label = 'global_db'
        db_table = 'terminals'
        unique_together = [['airport', 'code']]
        indexes = [
            models.Index(fields=['airport', 'is_active']),
        ]
        verbose_name = "Терминал"
        verbose_name_plural = "Терминалы"
    
    def __str__(self):
        return f"{self.airport.name} - {self.name}"


class ServiceType(models.Model):
    """Типы услуг."""
    name = models.CharField(max_length=100, unique=True, verbose_name="Название")
    slug = models.SlugField(max_length=100, unique=True, verbose_name="Slug")
    description = models.TextField(blank=True, verbose_name="Описание")
    is_active = models.BooleanField(default=True, db_index=True, verbose_name="Активен")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        app_label = 'global_db'
        db_table = 'service_types'
        verbose_name = "Тип услуги"
        verbose_name_plural = "Типы услуг"
        ordering = ['name']
    
    def __str__(self):
        return self.name


class Service(models.Model):
    """Каталог услуг."""
    service_type = models.ForeignKey(
        ServiceType,
        on_delete=models.PROTECT,
        db_index=True,
        verbose_name="Тип услуги"
    )
    airport = models.ForeignKey(
        Airport,
        on_delete=models.CASCADE,
        related_name='services',
        db_index=True,
        verbose_name="Аэропорт"
    )
    terminal = models.ForeignKey(
        Terminal,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="Терминал"
    )
    name = models.CharField(max_length=255, verbose_name="Название услуги")
    description = models.TextField(verbose_name="Описание")
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name="Цена"
    )
    currency = models.CharField(max_length=3, default='USD', verbose_name="Валюта")
    duration_minutes = models.IntegerField(null=True, blank=True, verbose_name="Длительность (мин)")
    image_url = models.URLField(max_length=500, blank=True, verbose_name="URL изображения")
    is_active = models.BooleanField(default=True, db_index=True, verbose_name="Активен")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        app_label = 'global_db'
        db_table = 'services'
        indexes = [
            models.Index(fields=['airport', 'is_active']),
            models.Index(fields=['service_type', 'is_active']),
        ]
        verbose_name = "Услуга"
        verbose_name_plural = "Услуги"
    
    def __str__(self):
        return f"{self.name} - {self.airport.name}"


class FAQ(models.Model):
    """Часто задаваемые вопросы."""
    question = models.TextField(verbose_name="Вопрос")
    answer = models.TextField(verbose_name="Ответ")
    order = models.IntegerField(default=0, db_index=True, verbose_name="Порядок")
    is_active = models.BooleanField(default=True, db_index=True, verbose_name="Активен")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        app_label = 'global_db'
        db_table = 'faqs'
        ordering = ['order', 'id']
        verbose_name = "FAQ"
        verbose_name_plural = "FAQ"
    
    def __str__(self):
        return self.question[:50]


class InformationPage(models.Model):
    """Информационные страницы."""
    slug = models.SlugField(max_length=100, unique=True, verbose_name="Slug")
    title = models.CharField(max_length=255, verbose_name="Заголовок")
    content = models.TextField(verbose_name="Содержание")
    is_active = models.BooleanField(default=True, verbose_name="Активен")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        app_label = 'global_db'
        db_table = 'information_pages'
        verbose_name = "Информационная страница"
        verbose_name_plural = "Информационные страницы"
    
    def __str__(self):
        return self.title


class Article(models.Model):
    """Статьи и публикации."""
    title = models.CharField(max_length=255, verbose_name="Заголовок")
    slug = models.SlugField(max_length=255, unique=True, verbose_name="Slug")
    content = models.TextField(verbose_name="Содержание")
    excerpt = models.TextField(blank=True, verbose_name="Краткое описание")
    image_url = models.URLField(max_length=500, blank=True, verbose_name="URL изображения")
    is_published = models.BooleanField(default=False, db_index=True, verbose_name="Опубликовано")
    published_at = models.DateTimeField(null=True, blank=True, verbose_name="Дата публикации")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        app_label = 'global_db'
        db_table = 'articles'
        indexes = [
            models.Index(fields=['is_published', 'published_at']),
        ]
        ordering = ['-published_at', '-created_at']
        verbose_name = "Статья"
        verbose_name_plural = "Статьи"
    
    def __str__(self):
        return self.title


class AdminActionLog(models.Model):
    """Журнал действий администраторов."""
    admin_user = models.CharField(max_length=255, verbose_name="Администратор")
    action = models.CharField(max_length=100, verbose_name="Действие")
    model_name = models.CharField(max_length=100, verbose_name="Модель")
    object_id = models.CharField(max_length=100, null=True, blank=True, verbose_name="ID объекта")
    details = models.JSONField(default=dict, verbose_name="Детали")
    ip_address = models.GenericIPAddressField(null=True, blank=True, verbose_name="IP адрес")
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    
    class Meta:
        app_label = 'global_db'
        db_table = 'admin_action_logs'
        indexes = [
            models.Index(fields=['admin_user', 'created_at']),
            models.Index(fields=['model_name', 'created_at']),
        ]
        ordering = ['-created_at']
        verbose_name = "Лог действий администратора"
        verbose_name_plural = "Логи действий администраторов"
    
    def __str__(self):
        return f"{self.admin_user} - {self.action} - {self.created_at}"


class GlobalReferral(models.Model):
    """
    Глобальная реферальная система в центральной БД.
    Отслеживает межрегиональные реферальные связи между пользователями из разных регионов.
    """
    referrer_email = models.EmailField(
        max_length=255,
        db_index=True,
        verbose_name="Email пригласившего"
    )
    referrer_region = models.ForeignKey(
        Region,
        on_delete=models.PROTECT,
        related_name='referrals_made',
        db_index=True,
        verbose_name="Регион пригласившего"
    )
    referred_email = models.EmailField(
        max_length=255,
        unique=True,
        db_index=True,
        verbose_name="Email приглашенного"
    )
    referred_region = models.ForeignKey(
        Region,
        on_delete=models.PROTECT,
        related_name='referrals_received',
        db_index=True,
        verbose_name="Регион приглашенного"
    )
    referral_code = models.CharField(
        max_length=20,
        db_index=True,
        verbose_name="Реферальный код"
    )
    is_active = models.BooleanField(default=True, db_index=True, verbose_name="Активен")
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        app_label = 'global_db'
        db_table = 'global_referrals'
        indexes = [
            models.Index(fields=['referrer_email', 'created_at']),
            models.Index(fields=['referred_email']),
            models.Index(fields=['referral_code']),
            models.Index(fields=['referrer_region', 'referred_region']),
        ]
        verbose_name = "Глобальная реферальная связь"
        verbose_name_plural = "Глобальная реферальная система"
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.referrer_email} ({self.referrer_region.name}) -> {self.referred_email} ({self.referred_region.name})"
