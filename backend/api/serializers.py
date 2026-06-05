from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import (
    Tag, SnakeCategory, DifficultyLevel, Snake, SnakeCharacteristic,
    Morph, SnakeImage, User, UserAdress, UserCart, CartItem, PromoCode,
    TerrariumCategory, Terrarium, TerrariumImage,
    FoodCategory, Food, FoodImage,
    Order, OrderItem,
)


# ------------------------------------------------------------------
# Auth
# ------------------------------------------------------------------

class TokenSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['role'] = user.role
        return token


# ------------------------------------------------------------------
# Snake (public)
# ------------------------------------------------------------------

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name', 'color']


class DifficultyLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = DifficultyLevel
        fields = ['id', 'name', 'stars']


class SnakeCategorySerializer(serializers.ModelSerializer):
    tag = TagSerializer(read_only=True)

    class Meta:
        model = SnakeCategory
        fields = ['id', 'name', 'slug', 'description', 'tag']


class MorphSerializer(serializers.ModelSerializer):
    class Meta:
        model = Morph
        fields = ['id', 'name', 'description', 'price_modifier', 'quantity', 'color']


class SnakeImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = SnakeImage
        fields = ['id', 'morph', 'image_url']


class SnakeCharacteristicSerializer(serializers.ModelSerializer):
    class Meta:
        model = SnakeCharacteristic
        fields = ['lifespan_years', 'humidity_min', 'humidity_max', 'feeding_type', 'origin_country']


class SnakeListSerializer(serializers.ModelSerializer):
    category = SnakeCategorySerializer(read_only=True)
    difficulty = DifficultyLevelSerializer(source='difficulty_level', read_only=True)
    tag = TagSerializer(read_only=True)
    images = SnakeImageSerializer(many=True, source='snakeimage_set', read_only=True)
    morphs_count = serializers.IntegerField(source='morph_set.count', read_only=True)

    class Meta:
        model = Snake
        fields = [
            'id', 'name', 'slug', 'description', 'category', 'difficulty', 'tag',
            'price', 'quantity', 'size_min_cm', 'size_max_cm',
            'temp_min_c', 'temp_max_c', 'is_active', 'views_count', 'sku',
            'images', 'morphs_count',
        ]


class SnakeDetailSerializer(SnakeListSerializer):
    morphs = MorphSerializer(many=True, source='morph_set', read_only=True)
    characteristic = SnakeCharacteristicSerializer(source='snakecharacteristic', read_only=True)

    class Meta(SnakeListSerializer.Meta):
        fields = SnakeListSerializer.Meta.fields + ['description', 'morphs', 'characteristic']


# ------------------------------------------------------------------
# Terrarium (public)
# ------------------------------------------------------------------

class TerrariumCategorySerializer(serializers.ModelSerializer):
    tag = TagSerializer(read_only=True)

    class Meta:
        model = TerrariumCategory
        fields = ['id', 'name', 'slug', 'description', 'tag']


class TerrariumImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = TerrariumImage
        fields = ['id', 'image_url']


class TerrariumListSerializer(serializers.ModelSerializer):
    category = TerrariumCategorySerializer(read_only=True)
    tag = TagSerializer(read_only=True)
    images = TerrariumImageSerializer(many=True, source='terrariumimage_set', read_only=True)

    class Meta:
        model = Terrarium
        fields = [
            'id', 'name', 'slug', 'description', 'category', 'tag',
            'price', 'quantity', 'length_cm', 'width_cm', 'height_cm',
            'material', 'is_active', 'views_count', 'sku', 'images',
        ]


class TerrariumDetailSerializer(TerrariumListSerializer):
    class Meta(TerrariumListSerializer.Meta):
        pass


# ------------------------------------------------------------------
# Food (public)
# ------------------------------------------------------------------

class FoodCategorySerializer(serializers.ModelSerializer):
    tag = TagSerializer(read_only=True)

    class Meta:
        model = FoodCategory
        fields = ['id', 'name', 'slug', 'description', 'tag']


class FoodImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodImage
        fields = ['id', 'image_url']


class FoodListSerializer(serializers.ModelSerializer):
    category = FoodCategorySerializer(read_only=True)
    tag = TagSerializer(read_only=True)
    images = FoodImageSerializer(many=True, source='foodimage_set', read_only=True)

    class Meta:
        model = Food
        fields = [
            'id', 'name', 'slug', 'description', 'category', 'tag',
            'price', 'quantity', 'weight_g', 'animal_type', 'size',
            'is_frozen', 'is_active', 'views_count', 'sku', 'images',
        ]


class FoodDetailSerializer(FoodListSerializer):
    class Meta(FoodListSerializer.Meta):
        pass


# ------------------------------------------------------------------
# User (private)
# ------------------------------------------------------------------

class UserAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAdress
        fields = [
            'id', 'country', 'city', 'street',
            'house', 'apartment', 'postal_code', 'is_default',
        ]


class UserSerializer(serializers.ModelSerializer):
    addresses = UserAddressSerializer(many=True, source='useradress_set', read_only=True)

    class Meta:
        model = User
        fields = [
            'id', 'email', 'first_name', 'last_name',
            'phone', 'role', 'is_verified', 'created_at', 'addresses',
        ]
        read_only_fields = ['id', 'email', 'role', 'is_verified', 'created_at']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ['email', 'password', 'first_name', 'last_name', 'phone']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


# ------------------------------------------------------------------
# Cart (private)
# ------------------------------------------------------------------

class CartItemSerializer(serializers.ModelSerializer):
    snake = SnakeListSerializer(read_only=True)
    snake_id = serializers.PrimaryKeyRelatedField(
        queryset=Snake.objects.all(), source='snake', write_only=True, required=False, allow_null=True
    )
    morph = MorphSerializer(read_only=True)
    morph_id = serializers.PrimaryKeyRelatedField(
        queryset=Morph.objects.all(), source='morph', write_only=True, required=False, allow_null=True
    )
    terrarium = TerrariumListSerializer(read_only=True)
    terrarium_id = serializers.PrimaryKeyRelatedField(
        queryset=Terrarium.objects.all(), source='terrarium', write_only=True, required=False, allow_null=True
    )
    food = FoodListSerializer(read_only=True)
    food_id = serializers.PrimaryKeyRelatedField(
        queryset=Food.objects.all(), source='food', write_only=True, required=False, allow_null=True
    )
    item_type = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = [
            'id', 'item_type',
            'snake', 'snake_id', 'morph', 'morph_id',
            'terrarium', 'terrarium_id',
            'food', 'food_id',
            'quantity', 'added_at',
        ]

    def get_item_type(self, obj):
        if obj.snake_id:
            return 'snake'
        if obj.terrarium_id:
            return 'terrarium'
        if obj.food_id:
            return 'food'
        return None

    def validate(self, attrs):
        snake = attrs.get('snake')
        terrarium = attrs.get('terrarium')
        food = attrs.get('food')
        filled = [x for x in [snake, terrarium, food] if x is not None]
        if not self.partial:
            if not filled:
                raise serializers.ValidationError('Необходимо указать товар.')
            if len(filled) > 1:
                raise serializers.ValidationError('В одной позиции может быть только один тип товара.')
        morph = attrs.get('morph')
        if morph and not snake:
            raise serializers.ValidationError('Морф можно указать только для змеи.')
        if morph and snake and morph.snake_id != snake.id:
            raise serializers.ValidationError('Указанный морф не принадлежит этой змее.')
        return attrs


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, source='cartitem_set', read_only=True)
    total = serializers.SerializerMethodField()

    class Meta:
        model = UserCart
        fields = ['id', 'items', 'total', 'created_at', 'updated_at']

    def get_total(self, obj):
        total = 0
        for item in obj.cartitem_set.all():
            if item.snake:
                price = item.snake.price + (item.morph.price_modifier if item.morph else 0)
                total += price * item.quantity
            elif item.terrarium:
                total += item.terrarium.price * item.quantity
            elif item.food:
                total += item.food.price * item.quantity
        return total


# ------------------------------------------------------------------
# Promo codes
# ------------------------------------------------------------------

class PromoCodeAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = PromoCode
        fields = [
            'id', 'code', 'discount_type', 'discount_value',
            'min_order_amount', 'max_uses', 'used_count',
            'is_active', 'valid_from', 'valid_until', 'created_at',
        ]
        read_only_fields = ['id', 'used_count', 'created_at']


class PromoCodeApplySerializer(serializers.Serializer):
    code = serializers.CharField(max_length=50)
    order_amount = serializers.IntegerField(min_value=0)


# ------------------------------------------------------------------
# Orders (private)
# ------------------------------------------------------------------

class OrderItemSerializer(serializers.ModelSerializer):
    snake = SnakeListSerializer(read_only=True)
    morph = MorphSerializer(read_only=True)
    terrarium = TerrariumListSerializer(read_only=True)
    food = FoodListSerializer(read_only=True)
    item_type = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = [
            'id', 'item_type',
            'snake', 'morph',
            'terrarium',
            'food',
            'quantity', 'unit_price',
        ]

    def get_item_type(self, obj):
        if obj.snake_id:
            return 'snake'
        if obj.terrarium_id:
            return 'terrarium'
        if obj.food_id:
            return 'food'
        return None


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, source='orderitem_set', read_only=True)
    promo_code = PromoCodeAdminSerializer(read_only=True)
    address = UserAddressSerializer(read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    payment_method_display = serializers.CharField(source='get_payment_method_display', read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'status', 'status_display',
            'payment_method', 'payment_method_display',
            'promo_code', 'total_price',
            'address', 'delivery_address_snapshot',
            'comment', 'items',
            'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'total_price', 'delivery_address_snapshot', 'created_at', 'updated_at']


class OrderCreateSerializer(serializers.ModelSerializer):
    address_id = serializers.PrimaryKeyRelatedField(
        queryset=UserAdress.objects.all(), source='address', required=True
    )
    promo_code = serializers.CharField(required=False, allow_null=True, allow_blank=True)

    class Meta:
        model = Order
        fields = ['address_id', 'promo_code', 'payment_method', 'comment']


# ------------------------------------------------------------------
# Admin
# ------------------------------------------------------------------

class AdminSnakeCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SnakeCategory
        fields = ['id', 'name', 'slug', 'description', 'tag', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class AdminTerrariumCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = TerrariumCategory
        fields = ['id', 'name', 'slug', 'description', 'tag', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class AdminFoodCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodCategory
        fields = ['id', 'name', 'slug', 'description', 'tag', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class AdminUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'email', 'first_name', 'last_name', 'phone',
            'role', 'is_active', 'is_verified', 'created_at',
        ]
        read_only_fields = ['id', 'email', 'created_at']


class AdminOrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, source='orderitem_set', read_only=True)
    promo_code = PromoCodeAdminSerializer(read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    payment_method_display = serializers.CharField(source='get_payment_method_display', read_only=True)
    user_email = serializers.EmailField(source='user.email', read_only=True)
    class Meta:
        model = Order
        fields = [
            'id', 'user_email', 'status', 'status_display',
            'payment_method', 'payment_method_display',
            'promo_code', 'total_price',
            'delivery_address_snapshot', 'comment', 'items',
            'created_at', 'updated_at',
        ]
        read_only_fields = [
            'id', 'user_email', 'total_price',
            'payment_method', 'payment_method_display',
            'promo_code', 'items', 'created_at',
        ]


class AdminSnakeSerializer(serializers.ModelSerializer):
    images = SnakeImageSerializer(many=True, source='snakeimage_set', read_only=True)
    morphs = MorphSerializer(many=True, source='morph_set', read_only=True)

    class Meta:
        model = Snake
        fields = [
            'id', 'name', 'slug', 'category', 'description', 'price', 'quantity',
            'size_min_cm', 'size_max_cm', 'temp_min_c', 'temp_max_c',
            'difficulty_level', 'tag', 'is_active', 'views_count', 'sku',
            'images', 'morphs', 'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'views_count', 'created_at', 'updated_at', 'images', 'morphs']


class AdminTerrariumSerializer(serializers.ModelSerializer):
    images = TerrariumImageSerializer(many=True, source='terrariumimage_set', read_only=True)

    class Meta:
        model = Terrarium
        fields = [
            'id', 'name', 'slug', 'category', 'description', 'price', 'quantity',
            'length_cm', 'width_cm', 'height_cm', 'material',
            'tag', 'is_active', 'views_count', 'sku',
            'images', 'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'views_count', 'created_at', 'updated_at', 'images']


class AdminFoodSerializer(serializers.ModelSerializer):
    images = FoodImageSerializer(many=True, source='foodimage_set', read_only=True)

    class Meta:
        model = Food
        fields = [
            'id', 'name', 'slug', 'category', 'description', 'price', 'quantity',
            'weight_g', 'animal_type', 'size', 'is_frozen',
            'tag', 'is_active', 'views_count', 'sku',
            'images', 'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'views_count', 'created_at', 'updated_at', 'images']
