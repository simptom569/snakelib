from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


# ==========================================================
#                       SNAKE DATABASES
# ==========================================================

class Tag(models.Model):
    """
    **Модель тегов для категории и змей.**
    
    Используется для отображения дополнительных меток:
        - Хит продаж
        - Новинка
        - Редкий вид
        - Осталось мало
    
    **Параметры:**
        - `id`: Автоматическое поле, первичный ключ.
        - `name`: Название тега (макс. 20 символов).
        - `color`: Цвет тега (макс. 10 символов).
        - `created_at`: Дата и время создания записи.
        - `updated_at`: Дата и время последнего обновления записи.
    """
    
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20)
    color = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class SnakeCategory(models.Model):
    """
    **Модель для категорий змей.**
    
    Например:
        - Ужовые
        - Гадюковые
        - Питоны
        - и т.д.
    
    **Параметры:**
        - `id`: Автоматическое поле, первичный ключ.
        - `name`: Название категории (макс. 250 символов).
        - `slug`: Уникальный идентификатор для URL (макс. 50 символов).
        - `description`: Описание категории.
        - `tag_id`: Внешний ключ на модель Tag (может быть null).
        - `created_at`: Дата и время создания записи.
        - `updated_at`: Дата и время последнего обновления записи.
    """
    
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=250)
    slug = models.CharField(max_length=50)
    description = models.TextField()
    tag = models.ForeignKey(
        Tag, on_delete=models.SET_NULL, null=True, blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class DifficultyLevel(models.Model):
    """
    **Модель для уровней сложности содержания змей.**
    
    Например:
        - Для новичков: 1 звезда
        - Для опытных: 2 звезды
        - Для профессионалов: 3 звезды
    
    **Параметры:**
        - `id`: Автоматическое поле, первичный ключ.
        - `name`: Название уровня сложности (макс. 250 символов).
        - `stars`: Количество звезд (уникальное значение).
    """
    
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=250)
    stars = models.IntegerField(unique=True)


class Snake(models.Model):
    """
    Модель для змей.
    
    **Параметры:**
        - `id`: Автоматическое поле, первичный ключ.
        - `name`: Название змеи (макс. 250 символов).
        - `slug`: Уникальный идентификатор для URL (макс. 50 символов).
        - `category_id`: Внешний ключ на модель Snake_Category (может быть null).
        - `description`: Описание змеи.
        - `price`: Цена змеи (целое число).
        - `quantity`: Количество змей в наличии.
        - `size_min_cm`: Минимальный размер змеи в сантиметрах.
        - `size_max_cm`: Максимальный размер змеи в сантиметрах.
        - `temp_min_c`: Минимальная температура содержания змеи в градусах Цельсия.
        - `temp_max_c`: Максимальная температура содержания змеи в градусах Цельсия.
        - `difficulty_level_id`: Внешний ключ на модель Difficulty_Level (может быть null).
        - `tag_id`: Внешний ключ на модель Tag (может быть null).
        - `is_active`: Флаг отображения змеи (по умолчанию True).
        - `views_count`: Количество просмотров страницы змеи (по умолчанию 0).
        - `sku`: Уникальный артикул змеи (макс. 50 символов).
        - `created_at`: Дата и время создания записи.
        - `updated_at`: Дата и время последнего обновления записи.
    """
    
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=250)
    slug = models.CharField(max_length=50)
    category = models.ForeignKey(
        SnakeCategory, on_delete=models.SET_NULL, null=True, blank=True
    )
    description = models.TextField()
    price = models.IntegerField()
    quantity = models.IntegerField()
    size_min_cm = models.SmallIntegerField()
    size_max_cm = models.SmallIntegerField()
    temp_min_c = models.SmallIntegerField()
    temp_max_c = models.SmallIntegerField()
    difficulty_level = models.ForeignKey(
        DifficultyLevel, on_delete=models.SET_NULL, null=True, blank=True
    )
    tag = models.ForeignKey(
        Tag, on_delete=models.SET_NULL, null=True, blank=True
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    views_count = models.IntegerField(default=0)
    sku = models.CharField(max_length=50, unique=True)


class SnakeCharacteristic(models.Model):
    """
    **Модель для дополнительных характеристик змей.**
    
    **Параметры:**
        - `id`: Автоматическое поле, первичный ключ.
        - `snake_id`: Внешний ключ на модель Snake (обязательное поле).
        - `lifespan_years`: Средняя продолжительность жизни змеи в годах.
        - `humidity_min`: Минимальная влажность для содержания змеи (в процентах).
        - `humidity_max`: Максимальная влажность для содержания змеи (в процентах).
        - `feeding_type`: Тип питания змеи (например, "грызуны", "птицы", "рыба" и т.д.).
        - `origin_country`: Страна происхождения змеи.
    """
    
    id = models.AutoField(primary_key=True)
    snake = models.OneToOneField(
        Snake, on_delete=models.CASCADE
    )
    lifespan_years = models.IntegerField()
    humidity_min = models.SmallIntegerField()
    humidity_max = models.SmallIntegerField()
    feeding_type = models.CharField(max_length=50)
    origin_country = models.CharField(max_length=50)


class Morph(models.Model):
    """
    **Модель для морфов змей.**
    
    Например:
        - Пастель: Светло-коричневый с желтыми пятнами
        - Альбинос: Белый с красными глазами
        - Мотли: Разноцветные пятна по всему телу
    
    **Параметры:**
        - `id`: Автоматическое поле, первичный ключ.
        - `snake_id`: Внешний ключ на модель Snake (обязательное поле).
        - `name`: Название морфа (макс. 50 символов).
        - `description`: Описание морфа.
        - `price_modifier`: Модификатор цены для данного морфа (целое число, может быть положительным или отрицательным).
        - `quantity`: Количество змей данного морфа в наличии.
        - `color`: Основной цвет морфа (макс. 10 символов).
    """
    
    id = models.AutoField(primary_key=True)
    snake = models.ForeignKey(
        Snake, on_delete=models.CASCADE
    )
    name = models.CharField(max_length=50)
    description = models.TextField()
    price_modifier = models.IntegerField()
    quantity = models.IntegerField()
    color = models.CharField(max_length=7)


class SnakeImage(models.Model):
    """
    **Модель для изображений змей.**
    
    **Параметры:**
        - `id`: Автоматическое поле, первичный ключ.
        - `snake_id`: Внешний ключ на модель Snake (обязательное поле).
        - `morph_id`: Внешний ключ на модель Morph (может быть null, если изображение относится ко всем морфам).
        - `image_url`: URL изображения змеи.
    """
    
    id = models.AutoField(primary_key=True)
    snake = models.ForeignKey(
        Snake, on_delete=models.CASCADE
    )
    morph = models.ForeignKey(
        Morph, on_delete=models.SET_NULL, null=True, blank=True
    )
    image_url = models.URLField()



# ==========================================================
#                       USER DATABASES
# ==========================================================

class UserManager(BaseUserManager):
    """
    **Менеджер для создания пользователей и администраторов.**
    """
    
    def create_user(self, email, password=None, **extra_fields):
        """
        **Создает и сохраняет обычного пользователя с указанным email и паролем.**
        
        **Параметры:**
            - `email`: Адрес электронной почты пользователя (обязательное поле).
            - `password`: Пароль пользователя (необязательное поле, может быть None).
            - `extra_fields`: Дополнительные поля для модели пользователя (например, first_name, last_name и т.д.).
        """
        if not email:
            raise ValueError("Пользователь должен иметь email")
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """
        **Создает и сохраняет суперпользователя с указанным email и паролем.**
        
        **Параметры:**
            - `email`: Адрес электронной почты суперпользователя (обязательное поле).
            - `password`: Пароль суперпользователя (необязательное поле, может быть None).
            - `extra_fields`: Дополнительные поля для модели суперпользователя (например, first_name, last_name и т.д.).
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError("Суперпользователь должен иметь is_staff=True")
        if extra_fields.get('is_superuser') is not True:
            raise ValueError("Суперпользователь должен иметь is_superuser=True")

        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    """
    **Кастомная модель пользователя.**
    
    Авторизация по email.
    
    **Параметры:**
        - `id`: Автоматическое поле, первичный ключ.
        - `email`: Адрес электронной почты пользователя (уникальное значение).
        - `first_name`: Имя пользователя (макс. 30 символов).
        - `last_name`: Фамилия пользователя (макс. 50 символов).
        - `phone`: Номер телефона пользователя (макс. 20 символов).
        - `role`: Роль пользователя (по умолчанию "user").
        - `is_active`: Флаг активности пользователя (по умолчанию True).
        - `is_staff`: Флаг доступа к административной панели (по умолчанию False).
        - `is_verified`: Флаг подтверждения email (по умолчанию False).
        - `created_at`: Дата и время создания записи.
        - `updated_at`: Дата и время последнего обновления записи.
    """
    
    class Role(models.TextChoices):
        USER = 'user', 'User'
        ADMIN = 'admin', 'Admin'
    
    
    # ------------------------------------------------------
    # Основная информация
    # ------------------------------------------------------
    
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=50)
    phone = models.CharField(max_length=20)
    
    
    # ------------------------------------------------------
    # Роль
    # ------------------------------------------------------
    
    role = models.CharField(
        max_length=10,
        choices=Role.choices,
        default=Role.USER
    )
    
    
    # ------------------------------------------------------
    # Системные поля
    # ------------------------------------------------------
    
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    
    # ------------------------------------------------------
    # Настройки авторизации
    # ------------------------------------------------------
    
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    
    objects = UserManager()
    
    def __str__(self):
        return self.email


class UserAdress(models.Model):
    """
    **Модель для адресов пользователей.**
    
    **Параметры:**
        - `id`: Автоматическое поле, первичный ключ.
        - `user_id`: Внешний ключ на модель User (обязательное поле).
        - `country`: Страна (макс. 50 символов).
        - `city`: Город (макс. 50 символов).
        - `street`: Улица (макс. 100 символов).
        - `house`: Номер дома (макс. 10 символов).
        - `apartment`: Номер квартиры (макс. 10 символов, может быть null).
        - `postal_code`: Почтовый индекс (макс. 20 символов).
        - `is_default`: Флаг основного адреса (по умолчанию False).
        - `created_at`: Дата и время создания записи.
        - `updated_at`: Дата и время последнего обновления записи.
    """
    
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE
    )
    country = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    street = models.CharField(max_length=100)
    house = models.CharField(max_length=10)
    apartment = models.CharField(max_length=10, null=True, blank=True)
    postal_code = models.CharField(max_length=20)
    is_default = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class UserCart(models.Model):
    """
    **Модель для корзины пользователя.**
    
    **Параметры:**
        - `user_id`: Внешний ключ на модель User (обязательное поле).
        - `created_at`: Дата и время создания записи.
        - `updated_at`: Дата и время последнего обновления записи.
    """
    
    user = models.OneToOneField(
        User, on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class CartItem(models.Model):
    """
    **Модель для элементов корзины.**
    
    **Параметры:**
        - `cart_id`: Внешний ключ на модель UserCart (обязательное поле).
        - `snake_id`: Внешний ключ на модель Snake (обязательное поле).
        - `morph_id`: Внешний ключ на модель Morph (может быть null, если пользователь не выбрал конкретный морф).
        - `quantity`: Количество змей данного вида в корзине.
        - `added_at`: Дата и время добавления записи.
        - `updated_at`: Дата и время последнего обновления записи.
    """
    
    cart = models.ForeignKey(
        UserCart, on_delete=models.CASCADE
    )
    snake = models.ForeignKey(
        Snake, on_delete=models.CASCADE
    )
    morph = models.ForeignKey(
        Morph, on_delete=models.SET_NULL, null=True, blank=True
    )
    quantity = models.IntegerField()
    added_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)