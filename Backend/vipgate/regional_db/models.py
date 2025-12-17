"""
Модели для региональных баз данных.

Хранят персональные данные пользователей:
- Данные пользователей
- Пассажиры
- Заказы и бронирования
- Платежи
- Бонусные транзакции
- Тикеты поддержки
- Уведомления
- Реферальные связи
"""
from django.db import models
from django.core.validators import EmailValidator
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
import secrets
import string


class UserManager(BaseUserManager):
    """Менеджер для модели пользователя."""
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email обязателен')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        if password:
            user.set_password(password)
        user.save(using=self._db)
        return user
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    """
    Модель пользователя для региональной БД.
    Хранит персональные данные пользователя.
    """
    email = models.EmailField(
        max_length=255,
        unique=True,
        db_index=True,
        validators=[EmailValidator()],
        verbose_name="Email"
    )
    first_name = models.CharField(max_length=100, blank=True, verbose_name="Имя")
    last_name = models.CharField(max_length=100, blank=True, verbose_name="Фамилия")
    phone = models.CharField(max_length=20, blank=True, verbose_name="Телефон")
    phone_country_code = models.CharField(max_length=5, blank=True, default='+7', verbose_name="Код страны телефона")
    date_of_birth = models.DateField(null=True, blank=True, verbose_name="Дата рождения")
    nationality = models.CharField(max_length=100, blank=True, verbose_name="Гражданство")
    profile_photo_url = models.URLField(max_length=500, blank=True, verbose_name="URL фото профиля")
    language = models.CharField(max_length=10, default='ru', verbose_name="Язык")
    currency = models.CharField(max_length=3, default='USD', verbose_name="Валюта")
    notification_enabled = models.BooleanField(default=True, verbose_name="Уведомления включены")
    is_active = models.BooleanField(default=True, db_index=True, verbose_name="Активен")
    is_staff = models.BooleanField(default=False, verbose_name="Персонал")
    is_verified = models.BooleanField(default=False, db_index=True, verbose_name="Email подтвержден")
    google_id = models.CharField(max_length=255, blank=True, null=True, unique=True, verbose_name="Google ID")
    apple_id = models.CharField(max_length=255, blank=True, null=True, unique=True, verbose_name="Apple ID")
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_login = models.DateTimeField(null=True, blank=True)
    objects = UserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    class Meta:
        app_label = 'regional_db'
        db_table = 'users'
        indexes = [
            models.Index(fields=['email', 'is_active']),
            models.Index(fields=['is_verified', 'is_active']),
        ]
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"
    def __str__(self):
        return self.email
    def get_full_name(self):
        return f"{self.first_name} {self.last_name}".strip()


class Passenger(models.Model):
    """Данные пассажиров."""
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='passengers',
        db_index=True,
        verbose_name="Пользователь"
    )
    first_name = models.CharField(max_length=100, verbose_name="Имя")
    last_name = models.CharField(max_length=100, verbose_name="Фамилия")
    middle_name = models.CharField(max_length=100, blank=True, verbose_name="Отчество")
    date_of_birth = models.DateField(verbose_name="Дата рождения")
    passport_number = models.CharField(max_length=50, verbose_name="Номер паспорта")
    nationality = models.CharField(max_length=100, verbose_name="Гражданство")
    phone = models.CharField(max_length=20, blank=True, verbose_name="Телефон")
    email = models.EmailField(max_length=255, blank=True, verbose_name="Email")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        app_label = 'regional_db'
        db_table = 'passengers'
        indexes = [
            models.Index(fields=['user', 'created_at']),
        ]
        verbose_name = "Пассажир"
        verbose_name_plural = "Пассажиры"
    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Order(models.Model):
    """Заказы и бронирования."""
    STATUS_CHOICES = [
        ('pending', 'Ожидает оплаты'),
        ('confirmed', 'Подтвержден'),
        ('completed', 'Завершен'),
        ('cancelled', 'Отменен'),
        ('refunded', 'Возвращен'),
    ]
    order_number = models.CharField(
        max_length=50,
        unique=True,
        db_index=True,
        verbose_name="Номер заказа"
    )
    user = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name='orders',
        db_index=True,
        verbose_name="Пользователь"
    )
    passenger = models.ForeignKey(
        Passenger,
        on_delete=models.PROTECT,
        related_name='orders',
        verbose_name="Пассажир"
    )
    flight_date = models.DateField(db_index=True, verbose_name="Дата полета")
    flight_number = models.CharField(max_length=20, verbose_name="Номер рейса")
    arrival_time = models.DateTimeField(null=True, blank=True, verbose_name="Время прибытия")
    departure_time = models.DateTimeField(null=True, blank=True, verbose_name="Время отправления")
    service_id = models.IntegerField(db_index=True, verbose_name="ID услуги (из глобальной БД)")
    service_name = models.CharField(max_length=255, verbose_name="Название услуги")
    total_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name="Общая стоимость"
    )
    currency = models.CharField(max_length=3, default='USD', verbose_name="Валюта")
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending',
        db_index=True,
        verbose_name="Статус"
    )
    special_requests = models.TextField(blank=True, verbose_name="Особые пожелания")
    cancellation_reason = models.TextField(blank=True, verbose_name="Причина отмены")
    cancelled_at = models.DateTimeField(null=True, blank=True, verbose_name="Дата отмены")
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        app_label = 'regional_db'
        db_table = 'orders'
        indexes = [
            models.Index(fields=['user', 'status', 'created_at']),
            models.Index(fields=['flight_date', 'status']),
            models.Index(fields=['order_number']),
        ]
        ordering = ['-created_at']
        verbose_name = "Заказ"
        verbose_name_plural = "Заказы"
    def __str__(self):
        return f"{self.order_number} - {self.user.email}"


class Payment(models.Model):
    """Платежи."""
    PAYMENT_METHOD_CHOICES = [
        ('card', 'Банковская карта'),
        ('paypal', 'PayPal'),
        ('apple_pay', 'Apple Pay'),
        ('google_pay', 'Google Pay'),
        ('bonus', 'Бонусы'),
    ]
    STATUS_CHOICES = [
        ('pending', 'Ожидает оплаты'),
        ('processing', 'Обрабатывается'),
        ('completed', 'Завершен'),
        ('failed', 'Ошибка'),
        ('refunded', 'Возвращен'),
    ]
    order = models.ForeignKey(
        Order,
        on_delete=models.PROTECT,
        related_name='payments',
        db_index=True,
        verbose_name="Заказ"
    )
    payment_method = models.CharField(
        max_length=20,
        choices=PAYMENT_METHOD_CHOICES,
        verbose_name="Способ оплаты"
    )
    card_type = models.CharField(max_length=20, blank=True, verbose_name="Тип карты")
    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name="Сумма"
    )
    currency = models.CharField(max_length=3, default='USD', verbose_name="Валюта")
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending',
        db_index=True,
        verbose_name="Статус"
    )
    transaction_id = models.CharField(
        max_length=255,
        blank=True,
        db_index=True,
        verbose_name="ID транзакции"
    )
    paid_at = models.DateTimeField(null=True, blank=True, verbose_name="Дата оплаты")
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        app_label = 'regional_db'
        db_table = 'payments'
        indexes = [
            models.Index(fields=['order', 'status']),
            models.Index(fields=['transaction_id']),
            models.Index(fields=['status', 'created_at']),
        ]
        ordering = ['-created_at']
        verbose_name = "Платеж"
        verbose_name_plural = "Платежи"
    def __str__(self):
        return f"{self.order.order_number} - {self.amount} {self.currency}"


class BonusTransaction(models.Model):
    """Бонусные транзакции."""
    TRANSACTION_TYPE_CHOICES = [
        ('registration', 'За регистрацию'),
        ('order', 'За заказ'),
        ('referral', 'За реферала'),
        ('spent', 'Потрачено'),
    ]
    user = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name='bonus_transactions',
        db_index=True,
        verbose_name="Пользователь"
    )
    transaction_type = models.CharField(
        max_length=20,
        choices=TRANSACTION_TYPE_CHOICES,
        db_index=True,
        verbose_name="Тип транзакции"
    )
    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name="Сумма"
    )
    description = models.TextField(blank=True, verbose_name="Описание")
    order = models.ForeignKey(
        Order,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="Заказ"
    )
    referral = models.ForeignKey(
        'Referral',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="Реферал"
    )
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    class Meta:
        app_label = 'regional_db'
        db_table = 'bonus_transactions'
        indexes = [
            models.Index(fields=['user', 'created_at']),
            models.Index(fields=['transaction_type', 'created_at']),
        ]
        ordering = ['-created_at']
        verbose_name = "Бонусная транзакция"
        verbose_name_plural = "Бонусные транзакции"
    def __str__(self):
        return f"{self.user.email} - {self.transaction_type} - {self.amount}"


class BonusBalance(models.Model):
    """Баланс бонусов пользователя."""
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='bonus_balance',
        db_index=True,
        verbose_name="Пользователь"
    )
    current_balance = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
        verbose_name="Текущий баланс"
    )
    total_earned = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
        verbose_name="Всего заработано"
    )
    total_spent = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
        verbose_name="Всего потрачено"
    )
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        app_label = 'regional_db'
        db_table = 'bonus_balances'
        verbose_name = "Баланс бонусов"
        verbose_name_plural = "Балансы бонусов"
    def __str__(self):
        return f"{self.user.email} - {self.current_balance}"


class SupportTicket(models.Model):
    """Тикеты технической поддержки."""
    STATUS_CHOICES = [
        ('open', 'Открыт'),
        ('in_progress', 'В работе'),
        ('resolved', 'Решен'),
        ('closed', 'Закрыт'),
    ]
    PRIORITY_CHOICES = [
        ('low', 'Низкий'),
        ('medium', 'Средний'),
        ('high', 'Высокий'),
        ('urgent', 'Срочный'),
    ]
    ticket_number = models.CharField(
        max_length=50,
        unique=True,
        db_index=True,
        verbose_name="Номер тикета"
    )
    user = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name='support_tickets',
        db_index=True,
        verbose_name="Пользователь"
    )
    subject = models.CharField(max_length=255, verbose_name="Тема")
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='open',
        db_index=True,
        verbose_name="Статус"
    )
    priority = models.CharField(
        max_length=20,
        choices=PRIORITY_CHOICES,
        default='medium',
        db_index=True,
        verbose_name="Приоритет"
    )
    assigned_admin = models.CharField(max_length=255, blank=True, verbose_name="Назначенный администратор")
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)
    closed_at = models.DateTimeField(null=True, blank=True, verbose_name="Дата закрытия")
    class Meta:
        app_label = 'regional_db'
        db_table = 'support_tickets'
        indexes = [
            models.Index(fields=['user', 'status', 'created_at']),
            models.Index(fields=['status', 'priority']),
        ]
        ordering = ['-created_at']
        verbose_name = "Тикет поддержки"
        verbose_name_plural = "Тикеты поддержки"
    def __str__(self):
        return f"{self.ticket_number} - {self.subject}"


class TicketMessage(models.Model):
    """Сообщения в тикетах поддержки."""
    ticket = models.ForeignKey(
        SupportTicket,
        on_delete=models.CASCADE,
        related_name='messages',
        db_index=True,
        verbose_name="Тикет"
    )
    message = models.TextField(verbose_name="Сообщение")
    is_from_admin = models.BooleanField(default=False, verbose_name="От администратора")
    sender_name = models.CharField(max_length=255, verbose_name="Имя отправителя")
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    class Meta:
        app_label = 'regional_db'
        db_table = 'ticket_messages'
        indexes = [
            models.Index(fields=['ticket', 'created_at']),
        ]
        ordering = ['created_at']
        verbose_name = "Сообщение в тикете"
        verbose_name_plural = "Сообщения в тикетах"
    def __str__(self):
        return f"{self.ticket.ticket_number} - {self.sender_name}"


class Notification(models.Model):
    """Уведомления для пользователей."""
    NOTIFICATION_TYPE_CHOICES = [
        ('order_confirmed', 'Заказ подтвержден'),
        ('order_cancelled', 'Заказ отменен'),
        ('payment_received', 'Платеж получен'),
        ('bonus_earned', 'Бонусы начислены'),
        ('support_reply', 'Ответ в поддержке'),
        ('system', 'Системное'),
    ]
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='notifications',
        db_index=True,
        verbose_name="Пользователь"
    )
    title = models.CharField(max_length=255, verbose_name="Заголовок")
    message = models.TextField(verbose_name="Сообщение")
    notification_type = models.CharField(
        max_length=50,
        choices=NOTIFICATION_TYPE_CHOICES,
        default='system',
        db_index=True,
        verbose_name="Тип уведомления"
    )
    is_read = models.BooleanField(default=False, db_index=True, verbose_name="Прочитано")
    read_at = models.DateTimeField(null=True, blank=True, verbose_name="Дата прочтения")
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    class Meta:
        app_label = 'regional_db'
        db_table = 'notifications'
        indexes = [
            models.Index(fields=['user', 'is_read', 'created_at']),
            models.Index(fields=['notification_type', 'created_at']),
        ]
        ordering = ['-created_at']
        verbose_name = "Уведомление"
        verbose_name_plural = "Уведомления"
    def __str__(self):
        return f"{self.user.email} - {self.title}"


class ReferralCode(models.Model):
    """Реферальные коды пользователей."""
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='referral_code',
        db_index=True,
        verbose_name="Пользователь"
    )
    code = models.CharField(
        max_length=20,
        unique=True,
        db_index=True,
        verbose_name="Реферальный код"
    )
    is_active = models.BooleanField(default=True, db_index=True, verbose_name="Активен")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        app_label = 'regional_db'
        db_table = 'referral_codes'
        verbose_name = "Реферальный код"
        verbose_name_plural = "Реферальные коды"
    def __str__(self):
        return f"{self.user.email} - {self.code}"
    @staticmethod
    def generate_code():
        """Генерирует уникальный реферальный код."""
        return ''.join(secrets.choice(string.ascii_uppercase + string.digits) for _ in range(10))


class Referral(models.Model):
    """Реферальные связи между пользователями."""
    referrer = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name='referrals_made',
        db_index=True,
        verbose_name="Пригласивший"
    )
    referred_user = models.OneToOneField(
        User,
        on_delete=models.PROTECT,
        related_name='referral_received',
        db_index=True,
        verbose_name="Приглашенный"
    )
    referral_code = models.ForeignKey(
        ReferralCode,
        on_delete=models.PROTECT,
        related_name='referrals',
        db_index=True,
        verbose_name="Реферальный код"
    )
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    class Meta:
        app_label = 'regional_db'
        db_table = 'referrals'
        indexes = [
            models.Index(fields=['referrer', 'created_at']),
        ]
        verbose_name = "Реферальная связь"
        verbose_name_plural = "Реферальные связи"
    def __str__(self):
        return f"{self.referrer.email} -> {self.referred_user.email}"

