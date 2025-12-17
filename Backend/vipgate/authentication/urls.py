from django.urls import path
from . import views
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt

app_name = 'authentication'

urlpatterns = [
    path('send-code/', views.send_verification_code, name='send_verification_code'),
    path('verify-code/', views.verify_code, name='verify_code'),
]


@csrf_exempt
@api_view(['GET', 'OPTIONS'])
@permission_classes([AllowAny])
def test_cors(request):
    """Тестовый endpoint для проверки CORS"""
    return Response({'message': 'CORS работает!', 'status': 'ok'})


urlpatterns.append(path('test/', test_cors, name='test_cors'))

