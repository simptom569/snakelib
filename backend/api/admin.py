from django.contrib import admin

from api.models import User, Tag, SnakeCategory, DifficultyLevel, Snake, SnakeCharacteristic, Morph, SnakeImage, UserAdress, UserCart, CartItem, PromoCode, TerrariumCategory, Terrarium, TerrariumImage, FoodCategory, FoodImage, Food, Order, OrderItem

# Register your models here.
admin.site.register(User)
admin.site.register(Tag)
admin.site.register(SnakeCategory)
admin.site.register(DifficultyLevel)
admin.site.register(Snake)
admin.site.register(SnakeCharacteristic)
admin.site.register(Morph)
admin.site.register(SnakeImage)
admin.site.register(UserAdress)
admin.site.register(UserCart)
admin.site.register(CartItem)
admin.site.register(PromoCode)
admin.site.register(TerrariumCategory)
admin.site.register(Terrarium)
admin.site.register(TerrariumImage)
admin.site.register(FoodCategory)
admin.site.register(Food)
admin.site.register(FoodImage)
admin.site.register(Order)
admin.site.register(OrderItem)