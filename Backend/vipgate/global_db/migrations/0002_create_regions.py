# Generated manually for initializing regions

from django.db import migrations


def create_regions(apps, schema_editor):
    """Создает регионы в глобальной БД."""
    Region = apps.get_model('global_db', 'Region')
    
    regions = [
        {
            'code': 'us_canada',
            'name': 'США и Канада',
            'database_name': 'vipgate_us_canada',
            'is_active': True
        },
        {
            'code': 'europe',
            'name': 'Европа',
            'database_name': 'vipgate_europe',
            'is_active': True
        },
        {
            'code': 'asia',
            'name': 'Азия и Австралия',
            'database_name': 'vipgate_asia',
            'is_active': True
        },
        {
            'code': 'south_america',
            'name': 'Южная Америка',
            'database_name': 'vipgate_south_america',
            'is_active': True
        },
        {
            'code': 'middle_east',
            'name': 'Ближний Восток',
            'database_name': 'vipgate_middle_east',
            'is_active': True
        },
    ]
    
    for region_data in regions:
        Region.objects.using('global').get_or_create(
            code=region_data['code'],
            defaults=region_data
        )


def reverse_regions(apps, schema_editor):
    """Удаляет регионы (для отката миграции)."""
    Region = apps.get_model('global_db', 'Region')
    Region.objects.using('global').all().delete()


class Migration(migrations.Migration):

    dependencies = [
        ('global_db', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_regions, reverse_regions),
    ]

