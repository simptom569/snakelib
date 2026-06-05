from django.conf import settings
from django.utils import timezone
from rest_framework import generics, viewsets, mixins, status
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import (
    Tag, SnakeCategory, DifficultyLevel, Snake,
    UserCart, CartItem, UserAdress, PromoCode,
    TerrariumCategory, Terrarium,
    FoodCategory, Food,
    Order, OrderItem,
    User,
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
    TerrariumCategorySerializer,
    TerrariumListSerializer,
    TerrariumDetailSerializer,
    FoodCategorySerializer,
    FoodListSerializer,
    FoodDetailSerializer,
    UserAddressSerializer,
    CartSerializer,
    CartItemSerializer,
    PromoCodeAdminSerializer,
    PromoCodeApplySerializer,
    OrderSerializer,
    OrderCreateSerializer,
    AdminUserSerializer,
    AdminOrderSerializer,
    AdminSnakeSerializer,
    AdminTerrariumSerializer,
    AdminFoodSerializer,
    AdminSnakeCategorySerializer,
    AdminTerrariumCategorySerializer,
    AdminFoodCategorySerializer,
)
from .permissions import IsOwner, IsAdmin


def _set_auth_cookies(response, access_token, refresh_token):
    secure = getattr(settings, 'COOKIE_SECURE', False)
    samesite = getattr(settings, 'COOKIE_SAMESITE', 'Lax')
    response.set_cookie(
        'access',
        str(access_token),
        max_age=60 * 60,
        httponly=True,
        secure=secure,
        samesite=samesite,
        path='/',
    )
    response.set_cookie(
        'refresh',
        str(refresh_token),
        max_age=60 * 60 * 24 * 90,
        httponly=True,
        secure=secure,
        samesite=samesite,
        path='/api/v1/auth/token/refresh/',
    )


# ------------------------------------------------------------------
# Auth
# ------------------------------------------------------------------

class TokenView(TokenObtainPairView):
    serializer_class = TokenSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        tokens = serializer.validated_data
        response = Response({'detail': 'ok'}, status=status.HTTP_200_OK)
        _set_auth_cookies(response, tokens['access'], tokens['refresh'])
        return response


class TokenRefreshCookieView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh')
        if not refresh_token:
            return Response({'detail': 'No refresh token'}, status=status.HTTP_401_UNAUTHORIZED)
        try:
            refresh = RefreshToken(refresh_token)
            response = Response({'detail': 'ok'}, status=status.HTTP_200_OK)
            _set_auth_cookies(response, refresh.access_token, refresh)
            return response
        except TokenError:
            return Response({'detail': 'Invalid or expired refresh token'}, status=status.HTTP_401_UNAUTHORIZED)


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        response = Response({'detail': 'ok'}, status=status.HTTP_201_CREATED)
        _set_auth_cookies(response, refresh.access_token, refresh)
        return response


class LogoutView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        response = Response({'detail': 'ok'}, status=status.HTTP_200_OK)
        response.delete_cookie('access', path='/')
        response.delete_cookie('refresh', path='/api/v1/auth/token/refresh/')
        return response


class GoogleAuthView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        import urllib.request
        import json as _json

        access_token = request.data.get('access_token')
        if not access_token:
            return Response({'detail': 'Токен не передан.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            req = urllib.request.Request(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                headers={'Authorization': f'Bearer {access_token}'},
            )
            with urllib.request.urlopen(req, timeout=5) as resp:
                userinfo = _json.loads(resp.read().decode())
        except Exception:
            return Response({'detail': 'Недействительный Google-токен.'}, status=status.HTTP_400_BAD_REQUEST)

        email = userinfo.get('email')
        if not email:
            return Response({'detail': 'Email не получен от Google.'}, status=status.HTTP_400_BAD_REQUEST)

        first_name = userinfo.get('given_name', '')
        last_name = userinfo.get('family_name', '')

        user, created = User.objects.get_or_create(
            email=email,
            defaults={
                'first_name': first_name,
                'last_name': last_name,
                'phone': '',
                'is_verified': True,
            },
        )

        if created:
            user.set_unusable_password()
            user.save(update_fields=['password'])
        elif not user.first_name and first_name:
            user.first_name = first_name
            user.last_name = last_name
            user.save(update_fields=['first_name', 'last_name'])

        refresh = RefreshToken.for_user(user)
        response = Response({'detail': 'ok'}, status=status.HTTP_200_OK)
        _set_auth_cookies(response, refresh.access_token, refresh)
        return response


# ------------------------------------------------------------------
# Profile (private)
# ------------------------------------------------------------------

class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        old_password = request.data.get('old_password', '')
        new_password = request.data.get('new_password', '')

        if not old_password or not new_password:
            return Response(
                {'detail': 'old_password and new_password are required'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if not request.user.check_password(old_password):
            return Response(
                {'old_password': 'Неверный текущий пароль'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if len(new_password) < 8:
            return Response(
                {'new_password': 'Пароль должен содержать минимум 8 символов'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        request.user.set_password(new_password)
        request.user.save()
        return Response({'detail': 'ok'}, status=status.HTTP_200_OK)


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
    queryset = SnakeCategory.objects.select_related('tag').all()
    serializer_class = SnakeCategorySerializer
    permission_classes = [AllowAny]
    filter_backends = [SearchFilter]
    search_fields = ['name', 'slug']


class SnakeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = (
        Snake.objects
        .select_related('category', 'difficulty_level', 'tag')
        .prefetch_related('snakeimage_set', 'morph_set', 'snakecharacteristic')
        .filter(is_active=True)
    )
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['category', 'difficulty_level']
    search_fields = ['name', 'slug', 'sku']
    ordering_fields = ['price', 'created_at', 'views_count']
    ordering = ['-created_at']
    lookup_field = 'slug'

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
# Terrarium (public)
# ------------------------------------------------------------------

class TerrariumCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TerrariumCategory.objects.select_related('tag').all()
    serializer_class = TerrariumCategorySerializer
    permission_classes = [AllowAny]
    filter_backends = [SearchFilter]
    search_fields = ['name', 'slug']


class TerrariumViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = (
        Terrarium.objects
        .select_related('category', 'tag')
        .prefetch_related('terrariumimage_set')
        .filter(is_active=True)
    )
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['category']
    search_fields = ['name', 'slug', 'sku']
    ordering_fields = ['price', 'created_at', 'views_count']
    ordering = ['-created_at']
    lookup_field = 'slug'

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return TerrariumDetailSerializer
        return TerrariumListSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        Terrarium.objects.filter(pk=instance.pk).update(views_count=instance.views_count + 1)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


# ------------------------------------------------------------------
# Food (public)
# ------------------------------------------------------------------

class FoodCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FoodCategory.objects.select_related('tag').all()
    serializer_class = FoodCategorySerializer
    permission_classes = [AllowAny]
    filter_backends = [SearchFilter]
    search_fields = ['name', 'slug']


class FoodViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = (
        Food.objects
        .select_related('category', 'tag')
        .prefetch_related('foodimage_set')
        .filter(is_active=True)
    )
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['category', 'is_frozen']
    search_fields = ['name', 'slug', 'sku', 'animal_type']
    ordering_fields = ['price', 'created_at', 'views_count']
    ordering = ['-created_at']
    lookup_field = 'slug'

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return FoodDetailSerializer
        return FoodListSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        Food.objects.filter(pk=instance.pk).update(views_count=instance.views_count + 1)
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
        return UserAdress.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        if serializer.validated_data.get('is_default'):
            UserAdress.objects.filter(user=self.request.user, is_default=True).update(is_default=False)
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        if serializer.validated_data.get('is_default'):
            UserAdress.objects.filter(user=self.request.user, is_default=True).update(is_default=False)
        serializer.save()


# ------------------------------------------------------------------
# Cart (private)
# ------------------------------------------------------------------

class CartView(generics.RetrieveAPIView):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        cart, _ = UserCart.objects.get_or_create(user=self.request.user)
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
        cart, _ = UserCart.objects.get_or_create(user=self.request.user)
        return CartItem.objects.filter(cart=cart).select_related('snake', 'morph')

    def perform_create(self, serializer):
        cart, _ = UserCart.objects.get_or_create(user=self.request.user)
        snake = serializer.validated_data.get('snake')
        morph = serializer.validated_data.get('morph')
        terrarium = serializer.validated_data.get('terrarium')
        food = serializer.validated_data.get('food')

        # Если такой товар уже в корзине — увеличить количество
        if snake:
            existing = CartItem.objects.filter(cart=cart, snake=snake, morph=morph).first()
        elif terrarium:
            existing = CartItem.objects.filter(cart=cart, terrarium=terrarium).first()
        elif food:
            existing = CartItem.objects.filter(cart=cart, food=food).first()
        else:
            existing = None

        if existing:
            existing.quantity += serializer.validated_data.get('quantity', 1)
            existing.save()
            return

        serializer.save(cart=cart)


# ------------------------------------------------------------------
# Promo codes
# ------------------------------------------------------------------

class PromoCodeViewSet(viewsets.ModelViewSet):
    """CRUD промокодов — только для администраторов."""
    queryset = PromoCode.objects.all().order_by('-created_at')
    serializer_class = PromoCodeAdminSerializer
    permission_classes = [IsAdminUser]
    filter_backends = [SearchFilter]
    search_fields = ['code']


class PromoCodeApplyView(APIView):
    """Применить промокод к сумме заказа."""
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = PromoCodeApplySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        code_str = serializer.validated_data['code'].upper()
        order_amount = serializer.validated_data['order_amount']
        now = timezone.now()

        try:
            promo = PromoCode.objects.get(code=code_str)
        except PromoCode.DoesNotExist:
            return Response({'detail': 'Промокод не найден.'}, status=status.HTTP_404_NOT_FOUND)

        if not promo.is_active:
            return Response({'detail': 'Промокод неактивен.'}, status=status.HTTP_400_BAD_REQUEST)

        if promo.valid_from > now:
            return Response({'detail': 'Промокод ещё не действует.'}, status=status.HTTP_400_BAD_REQUEST)

        if promo.valid_until and promo.valid_until < now:
            return Response({'detail': 'Срок действия промокода истёк.'}, status=status.HTTP_400_BAD_REQUEST)

        if promo.max_uses is not None and promo.used_count >= promo.max_uses:
            return Response({'detail': 'Лимит использований промокода исчерпан.'}, status=status.HTTP_400_BAD_REQUEST)

        if order_amount < promo.min_order_amount:
            return Response(
                {'detail': f'Минимальная сумма заказа для этого промокода — {promo.min_order_amount} ₸.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if promo.discount_type == PromoCode.DiscountType.PERCENT:
            discount = int(order_amount * promo.discount_value / 100)
        else:
            discount = min(promo.discount_value, order_amount)

        final_amount = order_amount - discount

        return Response({
            'code': promo.code,
            'discount_type': promo.discount_type,
            'discount_value': promo.discount_value,
            'discount_amount': discount,
            'min_order_amount': promo.min_order_amount,
            'original_amount': order_amount,
            'final_amount': final_amount,
        })


# ------------------------------------------------------------------
# Orders (private)
# ------------------------------------------------------------------

class OrderListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return OrderCreateSerializer
        return OrderSerializer

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).prefetch_related(
            'orderitem_set__snake__snakeimage_set',
            'orderitem_set__terrarium__terrariumimage_set',
            'orderitem_set__food__foodimage_set',
            'orderitem_set__morph',
        ).select_related('promo_code', 'address').order_by('-created_at')

    def create(self, request, *args, **kwargs):
        serializer = OrderCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        address = serializer.validated_data['address']
        if address.user != request.user:
            return Response({'detail': 'Адрес не найден.'}, status=status.HTTP_400_BAD_REQUEST)

        promo_code_str = serializer.validated_data.get('promo_code')
        promo = None
        if promo_code_str:
            try:
                promo = PromoCode.objects.get(code=promo_code_str.upper())
            except PromoCode.DoesNotExist:
                pass
        payment_method = serializer.validated_data.get('payment_method', Order.PaymentMethod.CARD)
        comment = serializer.validated_data.get('comment', '')

        cart, _ = UserCart.objects.get_or_create(user=request.user)
        cart_items = CartItem.objects.filter(cart=cart).select_related(
            'snake', 'morph', 'terrarium', 'food'
        )

        if not cart_items.exists():
            return Response({'detail': 'Корзина пуста.'}, status=status.HTTP_400_BAD_REQUEST)

        # Считаем сумму
        subtotal = 0
        for item in cart_items:
            if item.snake:
                subtotal += (item.snake.price + (item.morph.price_modifier if item.morph else 0)) * item.quantity
            elif item.terrarium:
                subtotal += item.terrarium.price * item.quantity
            elif item.food:
                subtotal += item.food.price * item.quantity

        # Применяем промокод
        discount = 0
        now = timezone.now()
        if promo:
            valid = (
                promo.is_active
                and promo.valid_from <= now
                and (promo.valid_until is None or promo.valid_until >= now)
                and (promo.max_uses is None or promo.used_count < promo.max_uses)
                and subtotal >= promo.min_order_amount
            )
            if valid:
                if promo.discount_type == PromoCode.DiscountType.PERCENT:
                    discount = int(subtotal * promo.discount_value / 100)
                else:
                    discount = min(promo.discount_value, subtotal)
                promo.used_count += 1
                promo.save(update_fields=['used_count'])

        total_price = subtotal - discount

        # Снимок адреса
        address_snapshot = {
            'country': address.country,
            'city': address.city,
            'street': address.street,
            'house': address.house,
            'apartment': address.apartment,
            'postal_code': address.postal_code,
        }

        order = Order.objects.create(
            user=request.user,
            address=address,
            delivery_address_snapshot=address_snapshot,
            promo_code=promo if discount > 0 else None,
            total_price=total_price,
            payment_method=payment_method,
            comment=comment,
        )

        for item in cart_items:
            if item.snake:
                unit_price = item.snake.price + (item.morph.price_modifier if item.morph else 0)
            elif item.terrarium:
                unit_price = item.terrarium.price
            elif item.food:
                unit_price = item.food.price
            else:
                unit_price = 0

            OrderItem.objects.create(
                order=order,
                snake=item.snake,
                morph=item.morph,
                terrarium=item.terrarium,
                food=item.food,
                quantity=item.quantity,
                unit_price=unit_price,
            )

        cart_items.delete()

        out = OrderSerializer(order, context={'request': request})
        return Response(out.data, status=status.HTTP_201_CREATED)


class OrderDetailView(generics.RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)


# ------------------------------------------------------------------
# Admin panel API
# ------------------------------------------------------------------

class AdminOrderViewSet(viewsets.ModelViewSet):
    serializer_class = AdminOrderSerializer
    permission_classes = [IsAdmin]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['status', 'payment_method']
    search_fields = ['user__email']
    ordering_fields = ['created_at', 'total_price']
    ordering = ['-created_at']

    def get_queryset(self):
        return (
            Order.objects
            .select_related('user', 'promo_code', 'address')
            .prefetch_related(
                'orderitem_set__snake__snakeimage_set',
                'orderitem_set__terrarium__terrariumimage_set',
                'orderitem_set__food__foodimage_set',
                'orderitem_set__morph',
            )
            .all()
        )

    def partial_update(self, request, *args, **kwargs):
        allowed = {'status', 'comment', 'delivery_address_snapshot'}
        data = {k: v for k, v in request.data.items() if k in allowed}
        serializer = self.get_serializer(self.get_object(), data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class AdminUserViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    serializer_class = AdminUserSerializer
    permission_classes = [IsAdmin]
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['email', 'first_name', 'last_name']
    ordering_fields = ['created_at', 'email']
    ordering = ['-created_at']

    def get_queryset(self):
        return User.objects.all()

    def partial_update(self, request, *args, **kwargs):
        allowed = {'role', 'is_active'}
        data = {k: v for k, v in request.data.items() if k in allowed}
        serializer = self.get_serializer(self.get_object(), data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class AdminSnakeViewSet(viewsets.ModelViewSet):
    serializer_class = AdminSnakeSerializer
    permission_classes = [IsAdmin]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['category', 'is_active']
    search_fields = ['name', 'sku', 'slug']
    ordering_fields = ['price', 'created_at', 'quantity']
    ordering = ['-created_at']

    def get_queryset(self):
        return (
            Snake.objects
            .select_related('category', 'difficulty_level', 'tag')
            .prefetch_related('snakeimage_set', 'morph_set')
            .all()
        )


class AdminTerrariumViewSet(viewsets.ModelViewSet):
    serializer_class = AdminTerrariumSerializer
    permission_classes = [IsAdmin]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['category', 'is_active']
    search_fields = ['name', 'sku', 'slug']
    ordering_fields = ['price', 'created_at', 'quantity']
    ordering = ['-created_at']

    def get_queryset(self):
        return (
            Terrarium.objects
            .select_related('category', 'tag')
            .prefetch_related('terrariumimage_set')
            .all()
        )


class AdminFoodViewSet(viewsets.ModelViewSet):
    serializer_class = AdminFoodSerializer
    permission_classes = [IsAdmin]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['category', 'is_active', 'is_frozen']
    search_fields = ['name', 'sku', 'slug']
    ordering_fields = ['price', 'created_at', 'quantity']
    ordering = ['-created_at']

    def get_queryset(self):
        return (
            Food.objects
            .select_related('category', 'tag')
            .prefetch_related('foodimage_set')
            .all()
        )


class AdminPromoCodeViewSet(viewsets.ModelViewSet):
    serializer_class = PromoCodeAdminSerializer
    permission_classes = [IsAdmin]
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['code']
    ordering_fields = ['created_at', 'valid_until']
    ordering = ['-created_at']

    def get_queryset(self):
        return PromoCode.objects.all()


class AdminStatsView(APIView):
    permission_classes = [IsAdmin]

    def get(self, request):
        from django.db.models import Count, Sum
        now = timezone.now()
        today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)

        total_orders = Order.objects.count()
        orders_today = Order.objects.filter(created_at__gte=today_start).count()
        revenue_total = Order.objects.exclude(status='cancelled').aggregate(s=Sum('total_price'))['s'] or 0
        pending_orders = Order.objects.filter(status='pending').count()
        total_users = User.objects.count()
        active_promos = PromoCode.objects.filter(is_active=True).count()

        return Response({
            'total_orders': total_orders,
            'orders_today': orders_today,
            'revenue_total': revenue_total,
            'pending_orders': pending_orders,
            'total_users': total_users,
            'active_promos': active_promos,
        })


class AdminSnakeCategoryViewSet(viewsets.ModelViewSet):
    serializer_class = AdminSnakeCategorySerializer
    permission_classes = [IsAdmin]
    filter_backends = [SearchFilter]
    search_fields = ['name', 'slug']

    def get_queryset(self):
        return SnakeCategory.objects.select_related('tag').all()


class AdminTerrariumCategoryViewSet(viewsets.ModelViewSet):
    serializer_class = AdminTerrariumCategorySerializer
    permission_classes = [IsAdmin]
    filter_backends = [SearchFilter]
    search_fields = ['name', 'slug']

    def get_queryset(self):
        return TerrariumCategory.objects.select_related('tag').all()


class AdminFoodCategoryViewSet(viewsets.ModelViewSet):
    serializer_class = AdminFoodCategorySerializer
    permission_classes = [IsAdmin]
    filter_backends = [SearchFilter]
    search_fields = ['name', 'slug']

    def get_queryset(self):
        return FoodCategory.objects.select_related('tag').all()
