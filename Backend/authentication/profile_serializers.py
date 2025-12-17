"""
Сериализаторы для работы с профилем пользователя.
"""
from rest_framework import serializers
from datetime import datetime
from vipgate.regional_db.models import User


class UserProfileSerializer(serializers.ModelSerializer):
    """Сериализатор для профиля пользователя."""
    birth_day = serializers.IntegerField(write_only=True, required=False, allow_null=True)
    birth_month = serializers.IntegerField(write_only=True, required=False, allow_null=True)
    birth_year = serializers.IntegerField(write_only=True, required=False, allow_null=True)
    date_of_birth = serializers.DateField(required=False, allow_null=True)
    class Meta:
        model = User
        fields = [
            'email',
            'first_name',
            'last_name',
            'phone',
            'phone_country_code',
            'date_of_birth',
            'birth_day',
            'birth_month',
            'birth_year',
            'nationality',
            'profile_photo_url',
            'language',
            'currency',
            'is_verified',
        ]
        read_only_fields = ['email', 'is_verified']
    def validate_first_name(self, value):
        """Валидация имени."""
        if value:
            value = value.strip()
            if not all(c.isalpha() or c.isspace() or c == '-' for c in value):
                raise serializers.ValidationError("Имя должно содержать только буквы, пробелы и дефисы.")
        return value
    def validate_last_name(self, value):
        """Валидация фамилии."""
        if value:
            value = value.strip()
            if not all(c.isalpha() or c.isspace() or c == '-' for c in value):
                raise serializers.ValidationError("Фамилия должна содержать только буквы, пробелы и дефисы.")
        return value
    def validate_phone_country_code(self, value):
        """Валидация кода страны телефона."""
        if value:
            if value.startswith('+'):
                return value
            return f"+{value}"
        return value
    def validate(self, data):
        """Проверка и формирование даты рождения."""
        birth_day = data.pop('birth_day', None)
        birth_month = data.pop('birth_month', None)
        birth_year = data.pop('birth_year', None)
        if birth_day and birth_month and birth_year:
            try:
                date_of_birth = datetime(
                    year=birth_year,
                    month=birth_month,
                    day=birth_day
                ).date()
                from django.utils import timezone
                if date_of_birth > timezone.now().date():
                    raise serializers.ValidationError({
                        'date_of_birth': 'Дата рождения не может быть в будущем.'
                    })
                if birth_year < 1900:
                    raise serializers.ValidationError({
                        'date_of_birth': 'Год рождения не может быть раньше 1900.'
                    })
                data['date_of_birth'] = date_of_birth
            except ValueError:
                raise serializers.ValidationError({
                    'date_of_birth': 'Некорректная дата рождения. Проверьте день, месяц и год.'
                })
        if 'date_of_birth' not in data and (birth_day or birth_month or birth_year):
            if not (birth_day and birth_month and birth_year):
                raise serializers.ValidationError({
                    'date_of_birth': 'Необходимо указать день, месяц и год рождения.'
                })
        return data

