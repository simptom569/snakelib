from django.urls import path
from .views import MyTokenView
from rest_framework_simplejwt.views import TokenRefreshView
from .views import ProfileView

urlpatterns = [
    path('token/', MyTokenView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', ProfileView.as_view()),
]