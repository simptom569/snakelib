from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    TokenView,
    TokenRefreshCookieView,
    RegisterView,
    LogoutView,
    GoogleAuthView,
    ProfileView,
    ChangePasswordView,
    TagViewSet,
    DifficultyLevelViewSet,
    SnakeCategoryViewSet,
    SnakeViewSet,
    TerrariumCategoryViewSet,
    TerrariumViewSet,
    FoodCategoryViewSet,
    FoodViewSet,
    UserAddressViewSet,
    CartView,
    CartItemViewSet,
    PromoCodeViewSet,
    PromoCodeApplyView,
    OrderListCreateView,
    OrderDetailView,
    AdminOrderViewSet,
    AdminUserViewSet,
    AdminSnakeViewSet,
    AdminTerrariumViewSet,
    AdminFoodViewSet,
    AdminPromoCodeViewSet,
    AdminStatsView,
    AdminSnakeCategoryViewSet,
    AdminTerrariumCategoryViewSet,
    AdminFoodCategoryViewSet,
)

router = DefaultRouter()

# Admin
router.register('admin/orders', AdminOrderViewSet, basename='admin-order')
router.register('admin/snake-categories', AdminSnakeCategoryViewSet, basename='admin-snake-category')
router.register('admin/terrarium-categories', AdminTerrariumCategoryViewSet, basename='admin-terrarium-category')
router.register('admin/food-categories', AdminFoodCategoryViewSet, basename='admin-food-category')
router.register('admin/users', AdminUserViewSet, basename='admin-user')
router.register('admin/snakes', AdminSnakeViewSet, basename='admin-snake')
router.register('admin/terrariums', AdminTerrariumViewSet, basename='admin-terrarium')
router.register('admin/foods', AdminFoodViewSet, basename='admin-food')
router.register('admin/promos', AdminPromoCodeViewSet, basename='admin-promo')

router.register('tags', TagViewSet, basename='tag')
router.register('difficulty-levels', DifficultyLevelViewSet, basename='difficulty-level')
router.register('categories', SnakeCategoryViewSet, basename='category')
router.register('snakes', SnakeViewSet, basename='snake')
router.register('terrarium-categories', TerrariumCategoryViewSet, basename='terrarium-category')
router.register('terrariums', TerrariumViewSet, basename='terrarium')
router.register('food-categories', FoodCategoryViewSet, basename='food-category')
router.register('foods', FoodViewSet, basename='food')
router.register('addresses', UserAddressViewSet, basename='address')
router.register('cart/items', CartItemViewSet, basename='cart-item')
router.register('promos', PromoCodeViewSet, basename='promo')

urlpatterns = [
    # Auth
    path('auth/token/', TokenView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshCookieView.as_view(), name='token_refresh'),
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/logout/', LogoutView.as_view(), name='logout'),
    path('auth/google/', GoogleAuthView.as_view(), name='google_auth'),

    # Profile
    path('profile/', ProfileView.as_view(), name='profile'),
    path('profile/change-password/', ChangePasswordView.as_view(), name='change-password'),

    # Cart
    path('cart/', CartView.as_view(), name='cart'),

    # Promo
    path('promo/apply/', PromoCodeApplyView.as_view(), name='promo-apply'),

    # Orders
    path('orders/', OrderListCreateView.as_view(), name='order-list-create'),
    path('orders/<int:pk>/', OrderDetailView.as_view(), name='order-detail'),

    # Admin stats
    path('admin/stats/', AdminStatsView.as_view(), name='admin-stats'),

    # Router
    path('', include(router.urls)),
]
