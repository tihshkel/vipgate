from rest_framework import serializers
from django.core.validators import EmailValidator


class EmailVerificationRequestSerializer(serializers.Serializer):
    """Сериализатор для запроса отправки кода верификации."""
    email = serializers.EmailField(
        required=True,
        validators=[EmailValidator()],
        help_text="Email адрес для верификации"
    )

    def validate_email(self, value):
        """Дополнительная валидация email."""
        value = value.lower().strip()
        return value


class CodeVerificationSerializer(serializers.Serializer):
    """Сериализатор для проверки кода верификации."""
    email = serializers.EmailField(
        required=True,
        validators=[EmailValidator()],
        help_text="Email адрес"
    )
    code = serializers.CharField(
        required=True,
        min_length=6,
        max_length=6,
        help_text="6-значный код верификации"
    )

    def validate_code(self, value):
        """Валидация кода - только цифры."""
        if not value.isdigit():
            raise serializers.ValidationError("Код должен содержать только цифры.")
        return value

    def validate_email(self, value):
        """Нормализация email."""
        return value.lower().strip()

