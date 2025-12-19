"""
API views для работы с профилем пользователя.
"""
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
from vipgate.regional_db.models import User
from vipgate.global_db.models import UserRegistry, Region
from .profile_serializers import UserProfileSerializer
from vipgate.vipgate.utils import get_region_from_ip, get_user_region_from_email, ensure_regions_exist
from django.conf import settings
import os
import uuid
from datetime import datetime
import logging

logger = logging.getLogger(__name__)


def get_client_ip(request):
    """Получает IP адрес клиента."""
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR', '127.0.0.1')
    return ip


def get_regional_db_for_user(email, request=None):
    """
    Определяет региональную БД для пользователя.
    ВАЖНО: Сначала пытается найти регион пользователя в глобальном реестре,
    если не найден - определяет по IP адресу.
    Пользователь должен быть создан ТОЛЬКО в одной региональной БД!
    """
    # Пытаемся получить регион из глобального реестра (это приоритет!)
    region = get_user_region_from_email(email)
    if region:
        return region
    
    # Если регион не найден в реестре, определяем по IP
    if request:
        client_ip = get_client_ip(request)
        region = get_region_from_ip(client_ip)
        return region
    
    # По умолчанию используем us_canada
    return 'us_canada'


def get_user_from_request(request):
    """
    Получает email пользователя из запроса.
    Для разработки используем параметр email, в продакшене - из сессии/токена.
    """
    email = request.data.get('email') or request.query_params.get('email')
    if not email:
        email = request.session.get('user_email')
    return email


@csrf_exempt
@api_view(['GET'])
@permission_classes([AllowAny])
def get_profile(request):
    """
    Получение профиля пользователя.
    """
    try:
        email = get_user_from_request(request)
        if not email:
            return Response(
                {"error": "Email не указан"},
                status=status.HTTP_400_BAD_REQUEST
            )
        # ВАЖНО: Убеждаемся, что регионы существуют в глобальной БД
        try:
            ensure_regions_exist()
        except Exception as e:
            logger.warning(f"[WARNING] Не удалось проверить/создать регионы: {str(e)}")
        
        # ВАЖНО: Сначала проверяем/создаем запись в глобальном реестре, чтобы определить правильную региональную БД
        try:
            user_registry = UserRegistry.objects.using('global').get(email=email)
            db = user_registry.region.code
        except UserRegistry.DoesNotExist:
            # Если пользователя нет в реестре, определяем БД по IP
            db = get_regional_db_for_user(email, request)
            
            # Создаем запись в глобальном реестре ДО создания пользователя в региональной БД
            try:
                ensure_regions_exist()  # Убеждаемся, что регионы созданы
                region = Region.objects.using('global').get(code=db)
                user_registry = UserRegistry.objects.using('global').create(
                    email=email,
                    region=region,
                    is_active=True
                )
                logger.info(f"[OK] Создана запись в глобальном реестре для {email}, регион: {db}")
            except Region.DoesNotExist:
                logger.error(f"[ERROR] Регион {db} не найден в глобальной БД для {email}")
                raise
            except Exception as e:
                # Если таблицы не существуют или регион не найден, логируем критическую ошибку
                logger.error(f"[ERROR] КРИТИЧЕСКАЯ ОШИБКА: Не удалось создать запись в глобальном реестре для {email}: {str(e)}")
                logger.error(f"Тип ошибки: {type(e).__name__}")
                logger.error("Убедитесь, что миграции применены: python manage.py migrate global_db --database=global")
                raise  # Пробрасываем исключение, чтобы не продолжать без записи в глобальной БД
        
        # Создаем пользователя ТОЛЬКО в нужной региональной БД
        try:
            user = User.objects.using(db).get(email=email)
        except User.DoesNotExist:
            # Создаем пользователя ТОЛЬКО в одной региональной БД
            user = User.objects.using(db).create(
                email=email,
                is_verified=True
            )
            logger.info(f"[OK] Создан пользователь в региональной БД {db} для {email}")
        serializer = UserProfileSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        logger.error(f"Error getting profile: {str(e)}")
        return Response(
            {"error": "Ошибка при получении профиля"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@csrf_exempt
@api_view(['POST', 'PUT', 'PATCH'])
@permission_classes([AllowAny])
def update_profile(request):
    """
    Обновление профиля пользователя.
    """
    try:
        email = get_user_from_request(request)
        if not email:
            return Response(
                {"error": "Email не указан"},
                status=status.HTTP_400_BAD_REQUEST
            )
        # ВАЖНО: Убеждаемся, что регионы существуют в глобальной БД
        try:
            ensure_regions_exist()
        except Exception as e:
            logger.warning(f"[WARNING] Не удалось проверить/создать регионы: {str(e)}")
        
        # ВАЖНО: Сначала проверяем/создаем запись в глобальном реестре, чтобы определить правильную региональную БД
        try:
            user_registry = UserRegistry.objects.using('global').get(email=email)
            db = user_registry.region.code
        except UserRegistry.DoesNotExist:
            # Если пользователя нет в реестре, определяем БД по IP
            db = get_regional_db_for_user(email, request)
            
            # Создаем запись в глобальном реестре ДО создания пользователя в региональной БД
            try:
                ensure_regions_exist()  # Убеждаемся, что регионы созданы
                region = Region.objects.using('global').get(code=db)
                user_registry = UserRegistry.objects.using('global').create(
                    email=email,
                    region=region,
                    is_active=True
                )
                logger.info(f"[OK] Создана запись в глобальном реестре для {email}, регион: {db}")
            except Region.DoesNotExist:
                logger.error(f"[ERROR] Регион {db} не найден в глобальной БД для {email}")
                raise
            except Exception as e:
                # Если таблицы не существуют или регион не найден, логируем критическую ошибку
                logger.error(f"[ERROR] КРИТИЧЕСКАЯ ОШИБКА: Не удалось создать запись в глобальном реестре для {email}: {str(e)}")
                logger.error(f"Тип ошибки: {type(e).__name__}")
                logger.error("Убедитесь, что миграции применены: python manage.py migrate global_db --database=global")
                raise  # Пробрасываем исключение, чтобы не продолжать без записи в глобальной БД
        
        # Создаем пользователя ТОЛЬКО в нужной региональной БД
        try:
            user = User.objects.using(db).get(email=email)
        except User.DoesNotExist:
            # Создаем пользователя ТОЛЬКО в одной региональной БД
            user = User.objects.using(db).create(
                email=email,
                is_verified=True
            )
            logger.info(f"[OK] Создан пользователь в региональной БД {db} для {email}")
        partial = request.method == 'PATCH'
        serializer = UserProfileSerializer(user, data=request.data, partial=partial)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "message": "Профиль успешно обновлен",
                    "data": serializer.data
                },
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
    except Exception as e:
        logger.error(f"Error updating profile: {str(e)}")
        return Response(
            {"error": "Ошибка при обновлении профиля"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def upload_profile_photo(request):
    """
    Загрузка фото профиля.
    Пока сохраняем локально, потом можно переделать на Google Cloud Storage.
    """
    try:
        email = get_user_from_request(request)
        if not email:
            return Response(
                {"error": "Email не указан"},
                status=status.HTTP_400_BAD_REQUEST
            )
        if 'photo' not in request.FILES:
            return Response(
                {"error": "Фото не предоставлено"},
                status=status.HTTP_400_BAD_REQUEST
            )
        photo_file = request.FILES['photo']
        if not photo_file.content_type.startswith('image/'):
            return Response(
                {"error": "Файл должен быть изображением"},
                status=status.HTTP_400_BAD_REQUEST
            )
        if photo_file.size > 5 * 1024 * 1024:
            return Response(
                {"error": "Размер файла не должен превышать 5MB"},
                status=status.HTTP_400_BAD_REQUEST
            )
        file_ext = photo_file.name.split('.')[-1]
        filename = f"profile_{uuid.uuid4().hex[:12]}.{file_ext}"
        media_root = getattr(settings, 'MEDIA_ROOT', 'media')
        profile_dir = os.path.join(media_root, 'profile_photos')
        os.makedirs(profile_dir, exist_ok=True)
        file_path = os.path.join(profile_dir, filename)
        with open(file_path, 'wb+') as destination:
            for chunk in photo_file.chunks():
                destination.write(chunk)
        media_url = getattr(settings, 'MEDIA_URL', '/media/')
        photo_url = f"{media_url}profile_photos/{filename}"
        # ВАЖНО: Убеждаемся, что регионы существуют в глобальной БД
        try:
            ensure_regions_exist()
        except Exception as e:
            logger.warning(f"[WARNING] Не удалось проверить/создать регионы: {str(e)}")
        
        # ВАЖНО: Сначала проверяем/создаем запись в глобальном реестре, чтобы определить правильную региональную БД
        try:
            user_registry = UserRegistry.objects.using('global').get(email=email)
            db = user_registry.region.code
        except UserRegistry.DoesNotExist:
            # Если пользователя нет в реестре, определяем БД по IP
            db = get_regional_db_for_user(email, request)
            
            # Создаем запись в глобальном реестре ДО создания пользователя в региональной БД
            try:
                ensure_regions_exist()  # Убеждаемся, что регионы созданы
                region = Region.objects.using('global').get(code=db)
                user_registry = UserRegistry.objects.using('global').create(
                    email=email,
                    region=region,
                    is_active=True
                )
                logger.info(f"[OK] Создана запись в глобальном реестре для {email}, регион: {db}")
            except Region.DoesNotExist:
                logger.error(f"[ERROR] Регион {db} не найден в глобальной БД для {email}")
                raise
            except Exception as e:
                # Если таблицы не существуют или регион не найден, логируем критическую ошибку
                logger.error(f"[ERROR] КРИТИЧЕСКАЯ ОШИБКА: Не удалось создать запись в глобальном реестре для {email}: {str(e)}")
                logger.error(f"Тип ошибки: {type(e).__name__}")
                logger.error("Убедитесь, что миграции применены: python manage.py migrate global_db --database=global")
                raise  # Пробрасываем исключение, чтобы не продолжать без записи в глобальной БД
        
        # Создаем пользователя ТОЛЬКО в нужной региональной БД
        try:
            user = User.objects.using(db).get(email=email)
        except User.DoesNotExist:
            # Создаем пользователя ТОЛЬКО в одной региональной БД
            user = User.objects.using(db).create(email=email, is_verified=True)
            logger.info(f"[OK] Создан пользователь в региональной БД {db} для {email}")
        user.profile_photo_url = photo_url
        user.save(using=db)
        return Response(
            {
                "message": "Фото профиля успешно загружено",
                "photo_url": photo_url
            },
            status=status.HTTP_200_OK
        )
    except Exception as e:
        logger.error(f"Error uploading photo: {str(e)}")
        return Response(
            {"error": "Ошибка при загрузке фото"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

