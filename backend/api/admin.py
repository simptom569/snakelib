from django.contrib import admin

from api.models import User, Tag, SnakeCategory, DifficultyLevel, Snake, SnakeCharacteristic, Morph, SnakeImage, UserAdress, UserCart, CartItem 

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