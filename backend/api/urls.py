from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    TokenView,
    RegisterView,
    ProfileView,
    TagViewSet,
    DifficultyLevelViewSet,
    SnakeCategoryViewSet,
    SnakeViewSet,
    UserAddressViewSet,
    CartView,
    CartItemViewSet,
)

router = DefaultRouter()
router.register('tags', TagViewSet, basename='tag')
router.register('difficulty-levels', DifficultyLevelViewSet, basename='difficulty-level')
router.register('categories', SnakeCategoryViewSet, basename='category')
router.register('snakes', SnakeViewSet, basename='snake')
router.register('addresses', UserAddressViewSet, basename='address')
router.register('cart/items', CartItemViewSet, basename='cart-item')

urlpatterns = [
    # Auth
    path('auth/token/', TokenView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/register/', RegisterView.as_view(), name='register'),

    # Profile
    path('profile/', ProfileView.as_view(), name='profile'),

    # Cart
    path('cart/', CartView.as_view(), name='cart'),

    # Router
    path('', include(router.urls)),
]
