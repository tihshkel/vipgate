from django.contrib import admin
from .models import (
    Region, UserRegistry, Airport, Terminal,
    ServiceType, Service, FAQ, InformationPage,
    Article, AdminActionLog, GlobalReferral
)


@admin.register(Region)
class RegionAdmin(admin.ModelAdmin):
    list_display = ('code', 'name', 'database_name', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('name', 'code')


@admin.register(UserRegistry)
class UserRegistryAdmin(admin.ModelAdmin):
    list_display = ('email', 'region', 'is_active', 'created_at', 'last_login')
    list_filter = ('region', 'is_active', 'created_at')
    search_fields = ('email',)
    readonly_fields = ('created_at', 'updated_at', 'last_login')


@admin.register(Airport)
class AirportAdmin(admin.ModelAdmin):
    list_display = ('iata_code', 'name', 'city', 'country', 'region', 'is_active')
    list_filter = ('region', 'country', 'is_active')
    search_fields = ('name', 'iata_code', 'icao_code', 'city', 'country')
    readonly_fields = ('created_at', 'updated_at')


@admin.register(Terminal)
class TerminalAdmin(admin.ModelAdmin):
    list_display = ('airport', 'name', 'code', 'is_active')
    list_filter = ('airport', 'is_active')
    search_fields = ('name', 'code', 'airport__name')


@admin.register(ServiceType)
class ServiceTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'service_type', 'airport', 'price', 'currency', 'is_active')
    list_filter = ('service_type', 'airport', 'is_active', 'currency')
    search_fields = ('name', 'description', 'airport__name')
    readonly_fields = ('created_at', 'updated_at')
    raw_id_fields = ('airport', 'terminal', 'service_type')


@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ('question', 'order', 'is_active', 'created_at')
    list_filter = ('is_active',)
    search_fields = ('question', 'answer')
    ordering = ('order', 'id')


@admin.register(InformationPage)
class InformationPageAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'is_active', 'created_at')
    list_filter = ('is_active',)
    search_fields = ('title', 'slug')
    prepopulated_fields = {'slug': ('title',)}


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'is_published', 'published_at', 'created_at')
    list_filter = ('is_published', 'published_at')
    search_fields = ('title', 'content', 'excerpt')
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ('created_at', 'updated_at')


@admin.register(AdminActionLog)
class AdminActionLogAdmin(admin.ModelAdmin):
    list_display = ('admin_user', 'action', 'model_name', 'object_id', 'created_at')
    list_filter = ('action', 'model_name', 'created_at')
    search_fields = ('admin_user', 'model_name', 'object_id')
    readonly_fields = ('admin_user', 'action', 'model_name', 'object_id', 'details', 'ip_address', 'created_at')
    ordering = ('-created_at',)


@admin.register(GlobalReferral)
class GlobalReferralAdmin(admin.ModelAdmin):
    list_display = ('referrer_email', 'referrer_region', 'referred_email', 'referred_region', 'referral_code', 'is_active', 'created_at')
    list_filter = ('referrer_region', 'referred_region', 'is_active', 'created_at')
    search_fields = ('referrer_email', 'referred_email', 'referral_code')
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at',)

