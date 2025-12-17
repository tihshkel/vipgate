from django.urls import path
from . import views
from . import profile_views

app_name = 'authentication'

urlpatterns = [
    path('send-code/', views.send_verification_code, name='send_verification_code'),
    path('verify-code/', views.verify_code, name='verify_code'),
    path('profile/', profile_views.get_profile, name='get_profile'),
    path('profile/update/', profile_views.update_profile, name='update_profile'),
    path('profile/upload-photo/', profile_views.upload_profile_photo, name='upload_profile_photo'),
]

