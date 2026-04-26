from rest_framework import generics, viewsets, mixins, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import (
    Tag, SnakeCategory, DifficultyLevel, Snake,
    UserCart, CartItem, UserAdress
)
from .serializers import (
    TokenSerializer,
    RegisterSerializer,
    UserSerializer,
    TagSerializer,
    DifficultyLevelSerializer,
    SnakeCategorySerializer,
    SnakeListSerializer,
    SnakeDetailSerializer,
    UserAddressSerializer,
    CartSerializer,
    CartItemSerializer,
)
from .permissions import IsOwner


# ------------------------------------------------------------------
# Auth
# ------------------------------------------------------------------

class TokenView(TokenObtainPairView):
    serializer_class = TokenSerializer


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


# ------------------------------------------------------------------
# Profile (private)
# ------------------------------------------------------------------

class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


# ------------------------------------------------------------------
# Snake (public)
# ------------------------------------------------------------------

class TagViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [AllowAny]


class DifficultyLevelViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = DifficultyLevel.objects.all()
    serializer_class = DifficultyLevelSerializer
    permission_classes = [AllowAny]


class SnakeCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SnakeCategory.objects.select_related('tag_id').all()
    serializer_class = SnakeCategorySerializer
    permission_classes = [AllowAny]
    filter_backends = [SearchFilter]
    search_fields = ['name', 'slug']


class SnakeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = (
        Snake.objects
        .select_related('category_id', 'difficulty_level_id')
        .prefetch_related('snakeimage_set', 'morph_set', 'snakecharacteristic')
        .filter(is_active=True)
    )
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['category_id', 'difficulty_level_id']
    search_fields = ['name', 'slug', 'sku']
    ordering_fields = ['price', 'created_at', 'views_count']
    ordering = ['-created_at']

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return SnakeDetailSerializer
        return SnakeListSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        Snake.objects.filter(pk=instance.pk).update(views_count=instance.views_count + 1)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


# ------------------------------------------------------------------
# Addresses (private)
# ------------------------------------------------------------------

class UserAddressViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    serializer_class = UserAddressSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        return UserAdress.objects.filter(user_id=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user_id=self.request.user)


# ------------------------------------------------------------------
# Cart (private)
# ------------------------------------------------------------------

class CartView(generics.RetrieveAPIView):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        cart, _ = UserCart.objects.get_or_create(user_id=self.request.user)
        return cart


class CartItemViewSet(
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        cart, _ = UserCart.objects.get_or_create(user_id=self.request.user)
        return CartItem.objects.filter(cart_id=cart)

    def perform_create(self, serializer):
        cart, _ = UserCart.objects.get_or_create(user_id=self.request.user)
        serializer.save(cart_id=cart)
