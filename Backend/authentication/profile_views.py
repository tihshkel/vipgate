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
from .profile_serializers import UserProfileSerializer
from django.conf import settings
import os
import uuid
from datetime import datetime
import logging

logger = logging.getLogger(__name__)


def get_regional_db_for_user(email):
    """
    Определяет региональную БД для пользователя.
    Пока используем дефолтную БД, в будущем можно определить по IP или другим параметрам.
    """
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
        db = get_regional_db_for_user(email)
        try:
            user = User.objects.using(db).get(email=email)
        except User.DoesNotExist:
            user = User.objects.using(db).create(
                email=email,
                is_verified=True
            )
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
        db = get_regional_db_for_user(email)
        try:
            user = User.objects.using(db).get(email=email)
        except User.DoesNotExist:
            user = User.objects.using(db).create(
                email=email,
                is_verified=True
            )
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
        db = get_regional_db_for_user(email)
        try:
            user = User.objects.using(db).get(email=email)
        except User.DoesNotExist:
            user = User.objects.using(db).create(email=email, is_verified=True)
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

