from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import (
    User, Passenger, Order, Payment, BonusTransaction,
    BonusBalance, SupportTicket, TicketMessage, Notification,
    ReferralCode, Referral
)


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ('email', 'first_name', 'last_name', 'region_display', 'is_active', 'is_verified', 'created_at')
    list_filter = ('is_active', 'is_verified', 'is_staff', 'created_at')
    search_fields = ('email', 'first_name', 'last_name', 'phone')
    ordering = ('-created_at',)
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Персональная информация', {'fields': ('first_name', 'last_name', 'phone')}),
        ('Настройки', {'fields': ('language', 'currency', 'notification_enabled')}),
        ('Статус', {'fields': ('is_active', 'is_staff', 'is_verified')}),
        ('OAuth', {'fields': ('google_id', 'apple_id')}),
        ('Даты', {'fields': ('last_login', 'created_at', 'updated_at')}),
    )
    readonly_fields = ('created_at', 'updated_at', 'last_login')
    def region_display(self, obj):
        from vipgate.global_db.models import UserRegistry
        try:
            registry = UserRegistry.objects.using('global').get(email=obj.email)
            return registry.region.name
        except:
            return 'Не определен'
    region_display.short_description = 'Регион'


@admin.register(Passenger)
class PassengerAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'user', 'nationality', 'created_at')
    list_filter = ('nationality', 'created_at')
    search_fields = ('first_name', 'last_name', 'passport_number', 'user__email')
    raw_id_fields = ('user',)


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_number', 'user', 'passenger', 'flight_date', 'status', 'total_amount', 'currency', 'created_at')
    list_filter = ('status', 'flight_date', 'currency', 'created_at')
    search_fields = ('order_number', 'user__email', 'flight_number', 'service_name')
    raw_id_fields = ('user', 'passenger')
    readonly_fields = ('order_number', 'created_at', 'updated_at', 'cancelled_at')


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('order', 'payment_method', 'amount', 'currency', 'status', 'transaction_id', 'paid_at')
    list_filter = ('payment_method', 'status', 'currency', 'created_at')
    search_fields = ('transaction_id', 'order__order_number')
    raw_id_fields = ('order',)
    readonly_fields = ('created_at', 'updated_at', 'paid_at')


@admin.register(BonusTransaction)
class BonusTransactionAdmin(admin.ModelAdmin):
    list_display = ('user', 'transaction_type', 'amount', 'created_at')
    list_filter = ('transaction_type', 'created_at')
    search_fields = ('user__email', 'description')
    raw_id_fields = ('user', 'order', 'referral')
    readonly_fields = ('created_at',)


@admin.register(BonusBalance)
class BonusBalanceAdmin(admin.ModelAdmin):
    list_display = ('user', 'current_balance', 'total_earned', 'total_spent', 'updated_at')
    search_fields = ('user__email',)
    raw_id_fields = ('user',)
    readonly_fields = ('updated_at',)


@admin.register(SupportTicket)
class SupportTicketAdmin(admin.ModelAdmin):
    list_display = ('ticket_number', 'user', 'subject', 'status', 'priority', 'assigned_admin', 'created_at')
    list_filter = ('status', 'priority', 'created_at')
    search_fields = ('ticket_number', 'user__email', 'subject')
    raw_id_fields = ('user',)
    readonly_fields = ('ticket_number', 'created_at', 'updated_at', 'closed_at')


@admin.register(TicketMessage)
class TicketMessageAdmin(admin.ModelAdmin):
    list_display = ('ticket', 'sender_name', 'is_from_admin', 'created_at')
    list_filter = ('is_from_admin', 'created_at')
    search_fields = ('ticket__ticket_number', 'sender_name', 'message')
    raw_id_fields = ('ticket',)
    readonly_fields = ('created_at',)


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('user', 'title', 'notification_type', 'is_read', 'created_at')
    list_filter = ('notification_type', 'is_read', 'created_at')
    search_fields = ('user__email', 'title', 'message')
    raw_id_fields = ('user',)
    readonly_fields = ('created_at', 'read_at')


@admin.register(ReferralCode)
class ReferralCodeAdmin(admin.ModelAdmin):
    list_display = ('user', 'code', 'is_active', 'created_at')
    list_filter = ('is_active', 'created_at')
    search_fields = ('code', 'user__email')
    raw_id_fields = ('user',)
    readonly_fields = ('created_at', 'updated_at')


@admin.register(Referral)
class ReferralAdmin(admin.ModelAdmin):
    list_display = ('referrer', 'referred_user', 'referral_code', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('referrer__email', 'referred_user__email', 'referral_code__code')
    raw_id_fields = ('referrer', 'referred_user', 'referral_code')
    readonly_fields = ('created_at',)

