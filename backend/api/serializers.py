from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import (
    Tag, SnakeCategory, DifficultyLevel, Snake, SnakeCharacteristic,
    Morph, SnakeImage, User, UserAdress, UserCart, CartItem
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
    tag = TagSerializer(source='tag_id', read_only=True)

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
        fields = ['id', 'morph_id', 'image_url']


class SnakeCharacteristicSerializer(serializers.ModelSerializer):
    class Meta:
        model = SnakeCharacteristic
        fields = ['lifespan_years', 'humidity_min', 'humidity_max', 'feeding_type', 'origin_country']


class SnakeListSerializer(serializers.ModelSerializer):
    category = SnakeCategorySerializer(source='category_id', read_only=True)
    difficulty = DifficultyLevelSerializer(source='difficulty_level_id', read_only=True)
    images = SnakeImageSerializer(many=True, source='snakeimage_set', read_only=True)

    class Meta:
        model = Snake
        fields = [
            'id', 'name', 'slug', 'category', 'difficulty',
            'price', 'quantity', 'size_min_cm', 'size_max_cm',
            'temp_min_c', 'temp_max_c', 'is_active', 'views_count', 'sku',
            'images',
        ]


class SnakeDetailSerializer(SnakeListSerializer):
    morphs = MorphSerializer(many=True, source='morph_set', read_only=True)
    characteristic = SnakeCharacteristicSerializer(source='snakecharacteristic', read_only=True)

    class Meta(SnakeListSerializer.Meta):
        fields = SnakeListSerializer.Meta.fields + ['description', 'morphs', 'characteristic']


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
    snake = SnakeListSerializer(source='snake_id', read_only=True)
    morph = MorphSerializer(source='morph_id', read_only=True)

    class Meta:
        model = CartItem
        fields = ['id', 'snake', 'morph', 'quantity', 'added_at']


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, source='cartitem_set', read_only=True)

    class Meta:
        model = UserCart
        fields = ['id', 'items', 'created_at', 'updated_at']
