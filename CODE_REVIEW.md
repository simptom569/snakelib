# SnakeLab — Разбор кода

> Документ описывает каждый файл проекта: что он делает, из каких частей состоит и зачем нужна каждая часть. Стили (`.styles.js` файлы) — это просто визуальное оформление компонентов, вынесенное в отдельные переменные, их содержимое здесь не разбирается.

---

## Структура документа

1. [Бэкенд (сервер)](#бэкенд)
   - [models.py — база данных](#modelspy)
   - [authentication.py — распознавание пользователя](#authenticationpy)
   - [permissions.py — права доступа](#permissionspy)
   - [serializers.py — упаковка данных](#serializerspy)
   - [views.py — логика сервера](#viewspy)
   - [urls.py — адреса сервера](#urlspy)
   - [admin.py — встроенная панель](#adminpy)
2. [Фронтенд (сайт)](#фронтенд)
   - [App.js — главный файл](#appjs)
   - [api/client.js — общение с сервером](#apiclientjs)
   - [Компоненты главной страницы](#компоненты-главной-страницы)
   - [Страницы каталогов](#страницы-каталогов)
   - [Страницы товаров](#страницы-товаров)
   - [Корзина и заказы](#корзина-и-заказы)
   - [Авторизация и профиль](#авторизация-и-профиль)
   - [Панель администратора](#панель-администратора-фронтенд)

---

## Бэкенд

Бэкенд — это сервер, написанный на Python с использованием фреймворка Django. Он получает запросы от браузера, работает с базой данных и возвращает данные в формате JSON.

---

### `models.py`

**Файл:** `backend/api/models.py`

Это самый важный файл бэкенда. Здесь описана вся структура базы данных — что и как хранится. Каждый класс (`class`) — это отдельная таблица в базе данных.

---

#### Теги (`Tag`)

```python
class Tag(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20)
    color = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

**Что делает:** Хранит пометки для товаров — например «Хит продаж», «Новинка», «Редкость». У каждого тега есть название и цвет (например, `#FF0000`). Поля `created_at` и `updated_at` — это метки времени: когда запись создана и последний раз изменена. Они заполняются автоматически.

---

#### Категория змей (`SnakeCategory`)

```python
class SnakeCategory(models.Model):
    id = ...
    name = models.CharField(max_length=250)
    slug = models.CharField(max_length=50)
    description = models.TextField()
    tag = models.ForeignKey(Tag, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = ...
    updated_at = ...
```

**Что делает:** Хранит категории змей (питоны, ужовые, гадюковые и т.д.). `slug` — это короткое имя для адреса в браузере, например `pythons`. `ForeignKey(Tag, ...)` — связь с таблицей тегов: у категории может быть один тег (или не быть — `null=True`). `on_delete=models.SET_NULL` означает: если тег удалят, у категории он просто станет пустым, а не удалится вся категория.

---

#### Уровень сложности (`DifficultyLevel`)

```python
class DifficultyLevel(models.Model):
    id = ...
    name = models.CharField(max_length=250)
    stars = models.IntegerField(unique=True)
```

**Что делает:** Хранит уровни сложности ухода за змеёй — например «Для новичков» (1 звезда), «Для опытных» (2 звезды). `unique=True` означает, что у каждого уровня уникальное количество звёзд — нельзя создать два уровня с одинаковыми звёздами.

---

#### Змея (`Snake`)

```python
class Snake(models.Model):
    id = ...
    name = models.CharField(max_length=250)
    slug = models.CharField(max_length=50)
    category = models.ForeignKey(SnakeCategory, ...)
    description = models.TextField()
    price = models.IntegerField()
    quantity = models.IntegerField()
    size_min_cm = models.SmallIntegerField()
    size_max_cm = models.SmallIntegerField()
    temp_min_c = models.SmallIntegerField()
    temp_max_c = models.SmallIntegerField()
    difficulty_level = models.ForeignKey(DifficultyLevel, ...)
    tag = models.ForeignKey(Tag, ...)
    is_active = models.BooleanField(default=True)
    views_count = models.IntegerField(default=0)
    sku = models.CharField(max_length=50, unique=True)
    created_at = ...
    updated_at = ...
```

**Что делает:** Главная таблица для змей. Содержит все основные данные о товаре. `SmallIntegerField` — целое число в диапазоне от −32768 до 32767, используется для небольших значений вроде сантиметров и градусов. `is_active` — флаг видимости: если `False`, змея не показывается на сайте, но не удаляется из базы. `views_count` — счётчик просмотров, увеличивается каждый раз, когда открывают страницу змеи. `sku` — уникальный артикул, `unique=True` значит нельзя создать двух змей с одинаковым артикулом.

---

#### Характеристики змеи (`SnakeCharacteristic`)

```python
class SnakeCharacteristic(models.Model):
    id = ...
    snake = models.OneToOneField(Snake, on_delete=models.CASCADE)
    lifespan_years = models.IntegerField()
    humidity_min = models.SmallIntegerField()
    humidity_max = models.SmallIntegerField()
    feeding_type = models.CharField(max_length=50)
    origin_country = models.CharField(max_length=50)
```

**Что делает:** Дополнительная таблица с расширенными характеристиками — продолжительность жизни, влажность, тип питания, страна происхождения. `OneToOneField` — особый тип связи: одна змея имеет ровно одну запись с характеристиками и наоборот. `on_delete=models.CASCADE` — если змею удалят, характеристики удалятся тоже.

---

#### Морф (`Morph`)

```python
class Morph(models.Model):
    id = ...
    snake = models.ForeignKey(Snake, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    description = models.TextField()
    price_modifier = models.IntegerField()
    quantity = models.IntegerField()
    color = models.CharField(max_length=7)
```

**Что делает:** Хранит цветовые вариации змей. `ForeignKey(Snake, ...)` — у одной змеи может быть много морфов. `price_modifier` — модификатор цены: может быть положительным (морф дороже) или отрицательным (дешевле). Итоговая цена = цена змеи + price_modifier. `color` — цвет в формате HEX (`#FF5733`), максимум 7 символов.

---

#### Изображения змеи (`SnakeImage`)

```python
class SnakeImage(models.Model):
    id = ...
    snake = models.ForeignKey(Snake, on_delete=models.CASCADE)
    morph = models.ForeignKey(Morph, on_delete=models.SET_NULL, null=True, blank=True)
    image_url = models.URLField()
```

**Что делает:** Хранит ссылки на изображения змей. Картинка может быть привязана к конкретному морфу (`morph`) или к змее в целом (тогда `morph = null`). Это позволяет показывать разные фотографии при выборе разных морфов.

---

#### Террариум (`Terrarium`) и категории

Аналогичны змеям, но с другими характеристиками:
- `length_cm`, `width_cm`, `height_cm` — размеры в сантиметрах
- `material` — материал изготовления
- Нет морфов и характеристик — структура проще

---

#### Корм (`Food`)

```python
class Food(models.Model):
    class Size(models.TextChoices):
        XS = 'XS', 'XS'
        S  = 'S',  'S'
        M  = 'M',  'M'
        L  = 'L',  'L'
        XL = 'XL', 'XL'

    ...
    weight_g = models.SmallIntegerField()
    animal_type = models.CharField(max_length=100)
    size = models.CharField(max_length=2, choices=Size.choices, default=Size.M)
    is_frozen = models.BooleanField(default=True)
    ...
```

**Что делает:** Хранит данные о корме. `Size` — встроенный список допустимых значений для поля `size`: можно выбрать только XS/S/M/L/XL, другое значение Django не примет. `is_frozen` — булев флаг: `True` = заморожен, `False` = живой корм.

---

#### Менеджер пользователей (`UserManager`)

```python
class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Пользователь должен иметь email")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        ...
        return self.create_user(email, password, **extra_fields)
```

**Что делает:** Вспомогательный класс для создания пользователей. `create_user` — обычная регистрация: проверяет наличие email, нормализует его (приводит к нижнему регистру), хеширует пароль через `set_password` (сам пароль не хранится — только его зашифрованная версия). `create_superuser` — создание суперпользователя с расширенными правами. `**extra_fields` — это способ передать любые дополнительные поля (имя, фамилию и т.д.) одним пакетом.

---

#### Пользователь (`User`)

```python
class User(AbstractBaseUser, PermissionsMixin):
    class Role(models.TextChoices):
        USER = 'user', 'User'
        ADMIN = 'admin', 'Admin'

    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=50)
    phone = models.CharField(max_length=20)
    role = models.CharField(max_length=10, choices=Role.choices, default=Role.USER)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    ...
    USERNAME_FIELD = "email"
    objects = UserManager()
```

**Что делает:** Кастомная (переделанная) модель пользователя. `AbstractBaseUser` и `PermissionsMixin` — базовые классы Django, от которых наследуется модель; они дают готовую логику паролей и прав. `Role` — два допустимых варианта роли. `USERNAME_FIELD = "email"` — вход по email вместо стандартного логина. `is_staff` — доступ к стандартной Django-панели администратора (отдельно от кастомной). `is_verified` — флаг подтверждения email (пока не реализован полностью, хранится на будущее).

---

#### Адрес пользователя (`UserAdress`)

```python
class UserAdress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    country = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    street = models.CharField(max_length=100)
    house = models.CharField(max_length=10)
    apartment = models.CharField(max_length=10, null=True, blank=True)
    postal_code = models.CharField(max_length=20)
    is_default = models.BooleanField(default=False)
    ...
```

**Что делает:** Адреса доставки. Один пользователь может иметь много адресов (`ForeignKey`). `apartment` может быть пустым (`null=True, blank=True`) — на случай частного дома без квартиры. `is_default` — помечает основной адрес.

---

#### Корзина (`UserCart`) и позиция корзины (`CartItem`)

```python
class UserCart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    ...

class CartItem(models.Model):
    cart = models.ForeignKey(UserCart, on_delete=models.CASCADE)
    snake = models.ForeignKey(Snake, ..., null=True, blank=True)
    morph = models.ForeignKey(Morph, ..., null=True, blank=True)
    terrarium = models.ForeignKey(Terrarium, ..., null=True, blank=True)
    food = models.ForeignKey(Food, ..., null=True, blank=True)
    quantity = models.PositiveIntegerField(default=1)
    ...

    def clean(self):
        filled = [f for f in [self.snake_id, self.terrarium_id, self.food_id] if f is not None]
        if len(filled) == 0:
            raise ValidationError('Необходимо указать товар.')
        if len(filled) > 1:
            raise ValidationError('В одной позиции может быть только один тип товара.')
```

**Что делает:** `UserCart` — корзина, у каждого пользователя ровно одна (`OneToOneField`). `CartItem` — одна строчка в корзине. Интересная архитектура: вместо отдельных таблиц для разных типов товаров — одна таблица с тремя необязательными полями (`snake`, `terrarium`, `food`). Метод `clean()` проверяет валидность: ровно одно из трёх полей должно быть заполнено. Если нет ни одного или больше одного — Django выдаст ошибку. `PositiveIntegerField` — только положительные числа, нельзя поставить количество -1.

---

#### Промокод (`PromoCode`)

```python
class PromoCode(models.Model):
    class DiscountType(models.TextChoices):
        PERCENT = 'percent', 'Процент'
        FIXED = 'fixed', 'Фиксированная сумма'

    code = models.CharField(max_length=50, unique=True)
    discount_type = models.CharField(max_length=10, choices=DiscountType.choices, ...)
    discount_value = models.PositiveIntegerField()
    min_order_amount = models.PositiveIntegerField(default=0)
    max_uses = models.PositiveIntegerField(null=True, blank=True)
    used_count = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    valid_from = models.DateTimeField()
    valid_until = models.DateTimeField(null=True, blank=True)
    created_at = ...
```

**Что делает:** Хранит промокоды. `DiscountType` — два типа скидки. `min_order_amount` — минимальная сумма заказа (0 = без ограничений). `max_uses` с `null=True` — если пусто, лимит не ограничен. `used_count` — сколько раз уже использовали. `valid_until` с `null=True` — если пусто, промокод бессрочный.

---

#### Заказ (`Order`) и позиция заказа (`OrderItem`)

```python
class Order(models.Model):
    class Status(models.TextChoices):
        PENDING    = 'pending',    'Ожидает подтверждения'
        CONFIRMED  = 'confirmed',  'Подтверждён'
        PAID       = 'paid',       'Оплачен'
        SHIPPED    = 'shipped',    'Отправлен'
        DELIVERED  = 'delivered',  'Доставлен'
        CANCELLED  = 'cancelled',  'Отменён'

    class PaymentMethod(models.TextChoices):
        CARD = 'card', 'Банковская карта'
        CASH = 'cash', 'Наличные'

    user = models.ForeignKey(User, ...)
    status = models.CharField(..., default=Status.PENDING)
    payment_method = models.CharField(...)
    promo_code = models.ForeignKey(PromoCode, ..., null=True)
    total_price = models.PositiveIntegerField()
    address = models.ForeignKey(UserAdress, ..., null=True)
    delivery_address_snapshot = models.JSONField(default=dict)
    comment = models.TextField(blank=True, default='')
    ...
```

**Что делает:** Хранит заказы. `Status` — 6 статусов жизненного цикла заказа. Каждый новый заказ создаётся со статусом `pending`. `delivery_address_snapshot` — `JSONField` хранит произвольный JSON-объект; сюда сохраняется копия адреса на момент оформления. Это нужно, чтобы история заказов не изменялась, даже если пользователь потом изменит или удалит адрес. `address` через `ForeignKey` может стать `null` (если адрес удалён), но снимок адреса (`snapshot`) останется.

`OrderItem` устроен аналогично `CartItem`, но добавляется поле `unit_price` — цена на момент покупки. Цены на товары могут меняться, но история заказов должна показывать цену, которую заплатил пользователь.

---

### `authentication.py`

**Файл:** `backend/api/authentication.py`

```python
class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        header = self.get_header(request)
        if header:
            raw_token = self.get_raw_token(header)
        else:
            raw_token = request.COOKIES.get('access')

        if raw_token is None:
            return None

        try:
            validated_token = self.get_validated_token(raw_token)
        except TokenError:
            raise InvalidToken({'detail': 'Access token invalid or expired'})

        return self.get_user(validated_token), validated_token
```

**Что делает:** Кастомный класс распознавания пользователя. Стандартный JWT читает токен только из заголовка запроса (`Authorization: Bearer ...`). Этот класс расширяет стандартный: сначала проверяет заголовок (удобно при тестировании через Postman), если заголовка нет — ищет токен в cookie с именем `access`. Это важно для безопасности: cookie с флагом `httpOnly` недоступна JavaScript-коду на странице, что защищает от кражи токена через XSS-атаки.

---

### `permissions.py`

**Файл:** `backend/api/permissions.py`

```python
class IsOwnerOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        owner = getattr(obj, 'user_id', None) or getattr(obj, 'id', None)
        return owner == request.user

class IsOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return getattr(obj, 'user_id', None) == request.user.id

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.role == 'admin'
        )
```

**Что делает:** Три правила доступа.

- `IsOwnerOrReadOnly` — чтение разрешено всем, изменение только владельцу. `SAFE_METHODS` — это методы GET, HEAD, OPTIONS (только чтение). `getattr(obj, 'user_id', None)` — берёт поле `user_id` у объекта, если оно есть.
- `IsOwner` — только владелец объекта может что-либо делать. Сравниваются числовые ID.
- `IsAdmin` — доступ только пользователям с `role == 'admin'`. Проверяется три условия через `and`: пользователь существует, авторизован и является администратором.

---

### `serializers.py`

**Файл:** `backend/api/serializers.py`

Сериализаторы — это "переводчики" между объектами базы данных и форматом JSON, который понимает браузер.

---

#### Токен (`TokenSerializer`)

```python
class TokenSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['role'] = user.role
        return token
```

**Что делает:** Расширяет стандартный JWT-токен: добавляет в него `email` и `role` пользователя. Это позволяет фронтенду сразу знать, кто вошёл и какова его роль, не делая дополнительный запрос к серверу.

---

#### Список и детальный сериализаторы змей

```python
class SnakeListSerializer(serializers.ModelSerializer):
    category = SnakeCategorySerializer(read_only=True)
    difficulty = DifficultyLevelSerializer(source='difficulty_level', read_only=True)
    tag = TagSerializer(read_only=True)
    images = SnakeImageSerializer(many=True, source='snakeimage_set', read_only=True)
    morphs_count = serializers.IntegerField(source='morph_set.count', read_only=True)
    ...

class SnakeDetailSerializer(SnakeListSerializer):
    morphs = MorphSerializer(many=True, source='morph_set', read_only=True)
    characteristic = SnakeCharacteristicSerializer(source='snakecharacteristic', read_only=True)
    ...
```

**Что делает:** `SnakeListSerializer` — для каталога (список): включает только нужное для карточки. `morphs_count` — количество морфов, не сами морфы; это дешевле (один запрос `COUNT`). `SnakeDetailSerializer` — для страницы товара: расширяет список, добавляет полные данные о морфах и характеристиках. `source='morph_set'` — Django автоматически создаёт `morph_set` как «обратную связь» от `Morph` к `Snake`.

---

#### Корзина (`CartSerializer`, `CartItemSerializer`)

```python
class CartItemSerializer(serializers.ModelSerializer):
    snake = SnakeListSerializer(read_only=True)
    snake_id = serializers.PrimaryKeyRelatedField(..., write_only=True, ...)
    ...
    item_type = serializers.SerializerMethodField()

    def get_item_type(self, obj):
        if obj.snake_id: return 'snake'
        if obj.terrarium_id: return 'terrarium'
        if obj.food_id: return 'food'
        return None

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, ...)
    total = serializers.SerializerMethodField()

    def get_total(self, obj):
        total = 0
        for item in obj.cartitem_set.all():
            if item.snake:
                price = item.snake.price + (item.morph.price_modifier if item.morph else 0)
                total += price * item.quantity
            ...
        return total
```

**Что делает:** Двойные поля (`snake` + `snake_id`) — распространённый паттерн в DRF: `snake` (`read_only`) возвращает полный объект при чтении; `snake_id` (`write_only`) принимает только ID при записи. `SerializerMethodField` — вычисляемое поле, значение берётся из метода `get_total`. Метод считает итог корзины на лету: цена каждого товара × количество, с учётом модификатора морфа.

---

#### Создание заказа (`OrderCreateSerializer`)

```python
class OrderCreateSerializer(serializers.ModelSerializer):
    address_id = serializers.PrimaryKeyRelatedField(
        queryset=UserAdress.objects.all(), source='address', required=True
    )
    promo_code = serializers.CharField(required=False, allow_null=True, allow_blank=True)

    class Meta:
        model = Order
        fields = ['address_id', 'promo_code', 'payment_method', 'comment']
```

**Что делает:** Принимает данные при оформлении заказа. Пользователь передаёт только 4 поля; всё остальное (итоговая сумма, список товаров, снимок адреса) высчитывается в `views.py`. `required=True` у `address_id` — без адреса нельзя оформить заказ.

---

### `views.py`

**Файл:** `backend/api/views.py`

Это "мозг" сервера. Здесь описана вся бизнес-логика: что происходит при каждом запросе.

---

#### Вспомогательная функция установки куки

```python
def _set_auth_cookies(response, access_token, refresh_token):
    response.set_cookie('access', str(access_token), max_age=60 * 60, httponly=True, ...)
    response.set_cookie('refresh', str(refresh_token), max_age=60 * 60 * 24 * 90, httponly=True, ...)
```

**Что делает:** Устанавливает два cookie в браузер после входа. `max_age=60 * 60` — access-токен живёт 60 минут (60 сек × 60). `max_age=60 * 60 * 24 * 90` — refresh-токен живёт 90 дней. `httponly=True` — JavaScript на странице не может прочитать эту cookie, только браузер отправляет её с запросами.

---

#### Вход (`TokenView`)

```python
class TokenView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        tokens = serializer.validated_data
        response = Response({'detail': 'ok'}, status=status.HTTP_200_OK)
        _set_auth_cookies(response, tokens['access'], tokens['refresh'])
        return response
```

**Что делает:** Обрабатывает POST-запрос на `/api/v1/auth/token/`. Валидирует email/пароль, при успехе устанавливает cookie с токенами и возвращает `{'detail': 'ok'}`. Токены не передаются в теле ответа — только в cookie. Это безопаснее, чем возвращать токен в JSON, потому что JavaScript не может читать `httpOnly` cookie.

---

#### Обновление токена (`TokenRefreshCookieView`)

```python
class TokenRefreshCookieView(APIView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh')
        if not refresh_token:
            return Response({'detail': 'No refresh token'}, status=401)
        try:
            refresh = RefreshToken(refresh_token)
            response = Response({'detail': 'ok'})
            _set_auth_cookies(response, refresh.access_token, refresh)
            return response
        except TokenError:
            return Response({'detail': 'Invalid or expired refresh token'}, status=401)
```

**Что делает:** Обновляет истёкший access-токен без повторного входа. Читает refresh-токен из cookie, создаёт новый access-токен и устанавливает оба в cookie. Если refresh тоже истёк — возвращает 401 (пользователь должен войти заново).

---

#### Регистрация (`RegisterView`)

```python
class RegisterView(generics.CreateAPIView):
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        response = Response({'detail': 'ok'}, status=201)
        _set_auth_cookies(response, refresh.access_token, refresh)
        return response
```

**Что делает:** Создаёт нового пользователя и сразу же авторизует его — устанавливает cookie. Пользователь регистрируется и автоматически попадает в систему без повторного входа.

---

#### Выход (`LogoutView`)

```python
class LogoutView(APIView):
    def post(self, request, *args, **kwargs):
        response = Response({'detail': 'ok'})
        response.delete_cookie('access', path='/')
        response.delete_cookie('refresh', path='/api/v1/auth/token/refresh/')
        return response
```

**Что делает:** Удаляет оба cookie. После этого браузер не будет отправлять токены с запросами — пользователь считается вышедшим.

---

#### Вход через Google (`GoogleAuthView`)

```python
class GoogleAuthView(APIView):
    def post(self, request, *args, **kwargs):
        access_token = request.data.get('access_token')
        # Запрашиваем данные пользователя у Google
        req = urllib.request.Request(
            'https://www.googleapis.com/oauth2/v3/userinfo',
            headers={'Authorization': f'Bearer {access_token}'},
        )
        with urllib.request.urlopen(req) as resp:
            userinfo = json.loads(resp.read().decode())

        email = userinfo.get('email')
        user, created = User.objects.get_or_create(email=email, defaults={...})

        if created:
            user.set_unusable_password()  # У Google-пользователей нет пароля
            user.save()

        refresh = RefreshToken.for_user(user)
        _set_auth_cookies(response, refresh.access_token, refresh)
```

**Что делает:** Принимает access-токен от Google, делает запрос к Google API для получения данных пользователя (email, имя). `get_or_create` — если пользователь с таким email уже есть, возвращает его; если нет — создаёт нового. `set_unusable_password()` — у пользователей через Google нет пароля, этот метод явно помечает это.

---

#### Профиль (`ProfileView`, `ChangePasswordView`)

```python
class ProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    def get_object(self):
        return self.request.user

class ChangePasswordView(APIView):
    def post(self, request, ...):
        if not request.user.check_password(old_password):
            return Response({'old_password': 'Неверный текущий пароль'}, status=400)
        if len(new_password) < 8:
            return Response({'new_password': 'Минимум 8 символов'}, status=400)
        request.user.set_password(new_password)
        request.user.save()
```

**Что делает:** `ProfileView` — `RetrieveUpdateAPIView` автоматически поддерживает GET (получить) и PATCH (обновить). `get_object` возвращает самого пользователя — таким образом пользователь может менять только свои данные. `ChangePasswordView` — проверяет старый пароль, валидирует длину нового, устанавливает новый через `set_password` (который сам хеширует).

---

#### Публичные ViewSet для товаров

```python
class SnakeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Snake.objects.select_related('category', 'difficulty_level', 'tag')
                            .prefetch_related('snakeimage_set', 'morph_set', ...)
                            .filter(is_active=True)
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['category', 'difficulty_level']
    search_fields = ['name', 'slug', 'sku']
    ordering_fields = ['price', 'created_at', 'views_count']
    lookup_field = 'slug'

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return SnakeDetailSerializer
        return SnakeListSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        Snake.objects.filter(pk=instance.pk).update(views_count=instance.views_count + 1)
        ...
```

**Что делает:** `ReadOnlyModelViewSet` — только чтение, изменений нет. `select_related` и `prefetch_related` — оптимизация запросов к базе: грузит связанные данные заранее, одним запросом, а не по одному на каждый объект. `.filter(is_active=True)` — показывает только активные товары. `get_serializer_class` — использует разные сериализаторы в зависимости от действия: для списка (`list`) — краткий, для детальной страницы (`retrieve`) — полный. `retrieve` переопределён: при каждом просмотре увеличивает счётчик просмотров.

---

#### Адреса (`UserAddressViewSet`)

```python
class UserAddressViewSet(...):
    def get_queryset(self):
        return UserAdress.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        if serializer.validated_data.get('is_default'):
            UserAdress.objects.filter(user=self.request.user, is_default=True).update(is_default=False)
        serializer.save(user=self.request.user)
```

**Что делает:** Пользователь видит только свои адреса (`filter(user=self.request.user)`). При создании нового адреса с `is_default=True` — все остальные адреса пользователя автоматически снимают флаг `is_default`. Это гарантирует, что только один адрес может быть основным.

---

#### Корзина (`CartView`, `CartItemViewSet`)

```python
class CartView(generics.RetrieveAPIView):
    def get_object(self):
        cart, _ = UserCart.objects.get_or_create(user=self.request.user)
        return cart

class CartItemViewSet(...):
    def perform_create(self, serializer):
        cart, _ = UserCart.objects.get_or_create(user=self.request.user)
        ...
        if snake:
            existing = CartItem.objects.filter(cart=cart, snake=snake, morph=morph).first()
        ...
        if existing:
            existing.quantity += serializer.validated_data.get('quantity', 1)
            existing.save()
            return
        serializer.save(cart=cart)
```

**Что делает:** `get_or_create` — получает корзину или создаёт новую, если её нет. Значение `_` (подчёркивание) означает «нас не интересует второй возвращаемый параметр». При добавлении товара сначала проверяется, есть ли уже такой товар в корзине. Если есть — увеличивается количество; если нет — создаётся новая позиция. Это предотвращает дубли в корзине.

---

#### Промокод (`PromoCodeApplyView`)

```python
class PromoCodeApplyView(APIView):
    def post(self, request, ...):
        ...
        if not promo.is_active:
            return Response({'detail': 'Промокод неактивен.'}, status=400)
        if promo.valid_from > now:
            return Response({'detail': 'Промокод ещё не действует.'}, status=400)
        if promo.valid_until and promo.valid_until < now:
            return Response({'detail': 'Срок действия истёк.'}, status=400)
        if promo.max_uses is not None and promo.used_count >= promo.max_uses:
            return Response({'detail': 'Лимит использований исчерпан.'}, status=400)
        if order_amount < promo.min_order_amount:
            return Response({'detail': f'Минимальная сумма — {promo.min_order_amount} ₸.'}, status=400)

        if promo.discount_type == PromoCode.DiscountType.PERCENT:
            discount = int(order_amount * promo.discount_value / 100)
        else:
            discount = min(promo.discount_value, order_amount)
```

**Что делает:** Последовательно проверяет все условия промокода. Каждая проверка — отдельный `if` с возвратом ошибки, что делает код понятным. `min(promo.discount_value, order_amount)` — при фиксированной скидке нельзя получить скидку больше суммы заказа (итог не уйдёт в минус).

---

#### Создание заказа (внутри `OrderListCreateView.create`)

```python
def create(self, request, ...):
    ...
    # Считаем сумму корзины
    subtotal = 0
    for item in cart_items:
        if item.snake:
            subtotal += (item.snake.price + (item.morph.price_modifier if item.morph else 0)) * item.quantity
        elif item.terrarium:
            subtotal += item.terrarium.price * item.quantity
        ...

    # Применяем промокод
    if promo:
        valid = promo.is_active and promo.valid_from <= now and ...
        if valid:
            discount = int(subtotal * promo.discount_value / 100)
            promo.used_count += 1
            promo.save(update_fields=['used_count'])

    # Снимок адреса
    address_snapshot = {'country': address.country, 'city': address.city, ...}

    order = Order.objects.create(user=request.user, ..., total_price=total_price, ...)

    # Переносим товары из корзины в заказ
    for item in cart_items:
        OrderItem.objects.create(order=order, ..., unit_price=unit_price)

    cart_items.delete()  # Очищаем корзину
```

**Что делает:** Полный цикл оформления заказа. Проверяет адрес, считает сумму, применяет промокод (и увеличивает счётчик использований через `save(update_fields=['used_count'])` — обновляет только одно поле, не всю запись). Создаёт снимок адреса. Создаёт заказ и позиции заказа. В конце очищает корзину через `cart_items.delete()`.

---

#### Статистика администратора (`AdminStatsView`)

```python
class AdminStatsView(APIView):
    def get(self, request):
        total_orders = Order.objects.count()
        orders_today = Order.objects.filter(created_at__gte=today_start).count()
        revenue_total = Order.objects.exclude(status='cancelled')
                                     .aggregate(s=Sum('total_price'))['s'] or 0
        pending_orders = Order.objects.filter(status='pending').count()
        total_users = User.objects.count()
        active_promos = PromoCode.objects.filter(is_active=True).count()
```

**Что делает:** Считает 6 метрик для дашборда администратора. `aggregate(s=Sum('total_price'))` — суммирует все значения поля `total_price` одним SQL-запросом. `exclude(status='cancelled')` — исключает отменённые заказы из выручки. `or 0` — если заказов нет, `aggregate` вернёт `None`; `or 0` заменяет `None` нулём.

---

### `urls.py`

**Файл:** `backend/api/urls.py`

```python
router = DefaultRouter()
router.register('admin/orders', AdminOrderViewSet, basename='admin-order')
router.register('snakes', SnakeViewSet, basename='snake')
...

urlpatterns = [
    path('auth/token/', TokenView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshCookieView.as_view(), ...),
    path('auth/register/', RegisterView.as_view(), ...),
    ...
    path('', include(router.urls)),
]
```

**Что делает:** Определяет все адреса (URL) сервера. `DefaultRouter` — автоматически создаёт стандартные адреса для ViewSet: список (`/snakes/`), детальная страница (`/snakes/{slug}/`). `path()` — ручная регистрация адресов для нестандартных Views. В итоге все адреса имеют префикс `/api/v1/` (добавляется в `snakelab/urls.py`).

---

### `admin.py`

**Файл:** `backend/api/admin.py`

Регистрирует модели в стандартной Django-панели администратора (`/admin`). Это встроенный инструмент Django для управления данными — отдельный от кастомной панели администратора на фронтенде. Используется разработчиком для отладки и прямого доступа к базе.

---

## Фронтенд

Фронтенд — это React-приложение. React — это JavaScript-библиотека для создания интерактивных страниц. Каждый файл `.jsx` — это компонент (кусок страницы).

---

### `App.js`

**Файл:** `frontend/src/App.js`

```javascript
const path = window.location.pathname;
const AUTH_ROUTES = ['/profile', '/orders', '/cart', '/admin-panel'];

function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    api.getProfile()
      .then(res => res.ok ? api.parse(res) : null)
      .then(data => {
        if (data) {
          setUser(data);
          return api.getCart()...
        }
      })
      ...
      .finally(() => setAuthLoading(false));
  }, []);
```

**Что делает:** Корневой файл приложения — "диспетчер" страниц. `useState` — хранит переменные состояния: текущий пользователь, флаг загрузки, количество товаров в корзине. `useEffect` с пустым массивом `[]` — выполняется один раз при первом открытии сайта. Проверяет, авторизован ли пользователь (запросом к `/profile/`), и если да — загружает корзину для отображения счётчика. Маршрутизация (какую страницу показать) реализована через `if/else` по значению `window.location.pathname`. Защищённые роуты (`AUTH_ROUTES`) показывают пустую страницу пока идёт проверка авторизации.

---

### `api/client.js`

**Файл:** `frontend/src/api/client.js`

```javascript
let isRefreshing = false;
let refreshQueue = [];

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    credentials: 'include',  // Отправляет cookie с каждым запросом
    headers: { 'Content-Type': 'application/json', ... },
  });

  if (res.status !== 401) return res;

  // Если токен истёк (401) — обновляем
  if (isRefreshing) {
    await new Promise((resolve, reject) => {
      refreshQueue.push({ resolve, reject });  // Ставим в очередь
    });
    return request(path, options);  // Повторяем запрос
  }

  isRefreshing = true;
  try {
    await refreshTokens();
    flushQueue(null);     // Выполняем все запросы из очереди
    return request(path, options);
  } catch (err) {
    flushQueue(err);      // Отклоняем все запросы из очереди
    throw err;
  } finally {
    isRefreshing = false;
  }
}
```

**Что делает:** Центральный модуль для всех HTTP-запросов. `credentials: 'include'` — обязательно отправляет cookie (без этого браузер не отправит токены). Умная логика обновления токена: если несколько запросов одновременно получили 401 (токен истёк), только первый запрашивает новый токен; остальные ждут в `refreshQueue`. После успешного обновления все ожидавшие запросы выполняются. Без этого механизма несколько параллельных запросов создали бы несколько запросов на обновление токена.

Ниже в файле — набор удобных функций (`api.login`, `api.getCart`, `api.adminGetOrders` и т.д.) — всего около 50 методов. Это просто короткие обёртки над базовой функцией `request`, чтобы в компонентах писать `api.login(email, pass)` вместо длинного `request('/auth/token/', { method: 'POST', ... })`.

---

## Компоненты главной страницы

### `Header.jsx`

**Файл:** `frontend/src/components/Header/Header.jsx`

**Что делает:** Шапка сайта. Загружает категории змей, террариумов и корма с сервера при открытии страницы — для выпадающих меню. Показывает: логотип, основные ссылки с выпадающими категориями, иконку корзины со счётчиком товаров, меню пользователя (если вошёл — имя и ссылки на профиль/заказы/выход, если нет — кнопка входа). На мобильных — бургер-меню. Выход из аккаунта вызывает `api.logout()` и перезагружает страницу.

### `Hero.jsx`

**Что делает:** Главный баннер на главной странице. Статический компонент: заголовок, подзаголовок и кнопка «Перейти в каталог».

### `Catalog.jsx`

**Что делает:** Блок избранных товаров на главной странице. Загружает несколько змей с сервера и показывает их карточками в сетке.

### `Features.jsx`

**Что делает:** Блок с преимуществами магазина — 6 карточек с иконками и описаниями. Статический контент.

### `Reviews.jsx`

**Что делает:** Карусель отзывов покупателей. Использует библиотеку Embla Carousel для слайдера. 8 отзывов, статические данные.

### `Consultation.jsx`

**Что делает:** Форма заявки на консультацию. Поля: имя, телефон, вопрос. Статическая форма (отправка не реализована).

### `Footer.jsx`

**Что делает:** Подвал сайта. Логотип, ссылки на разделы, контакты, соцсети. Статический компонент.

---

## Страницы каталогов

### `CatalogPage.jsx`

**Файл:** `frontend/src/pages/CatalogPage/CatalogPage.jsx`

**Что делает:** Каталог змей с фильтрацией. При загрузке запрашивает с сервера: список категорий, уровни сложности, список змей. Фильтры: наличие, категория, уровень сложности, диапазон цены, диапазон размера, диапазон температуры. Сортировка: по умолчанию/цене/названию. На мобильных фильтры скрыты и открываются кнопкой. Каждое изменение фильтра вызывает новый запрос к API с параметрами — сервер фильтрует и возвращает результат. Карточки змей показывают: фото, название, размер, температуру, звёзды сложности, количество морфов, цену, бейдж наличия.

### `TerrariumCatalogPage.jsx`, `FoodCatalogPage.jsx`

**Что делают:** Аналогичны `CatalogPage`, но для своих типов товаров. У террариумов фильтры по категории и цене. У корма — дополнительный фильтр «заморожен/живой».

### `CategoryPage.jsx`, `TerrariumCategoryPage.jsx`, `FoodCategoryPage.jsx`

**Что делают:** Показывают товары конкретной категории. Берут slug категории из URL (`window.location.pathname`), запрашивают товары с фильтром по этой категории.

---

## Страницы товаров

### `SnakePage.jsx`

**Файл:** `frontend/src/pages/SnakePage/SnakePage.jsx`

**Что делает:** Детальная страница змеи. Берёт slug из URL, загружает полные данные змеи. Галерея изображений: основное фото большое, миниатюры снизу; при выборе морфа фотографии меняются на изображения этого морфа. Селектор морфов — цветные кружки; при выборе морфа меняется цена. Характеристики: размер, температура, уровень сложности, артикул. Описание и расширенные характеристики (продолжительность жизни и т.д.). Кнопка «Добавить в корзину» — вызывает `api.addCartItem(snakeId, morphId)`.

### `TerrariumPage.jsx`, `FoodPage.jsx`

**Что делают:** Аналогично `SnakePage`, но для своих типов. Без морфов и характеристик.

---

## Корзина и заказы

### `CartPage.jsx`

**Файл:** `frontend/src/pages/CartPage/CartPage.jsx`

**Что делает:** Страница корзины. Загружает корзину с сервера. Показывает список товаров: фото, название, морф (если есть), цену, кнопки +/− для изменения количества, кнопку удаления. Поле для ввода промокода: при нажатии «Применить» — запрос `api.applyPromo(code, total)`, результат показывает скидку. Итоговый блок: сумма, скидка, итого. Кнопка «Оформить заказ» открывает модальное окно. При пустой корзине — заглушка со ссылкой на каталог.

#### Модальное окно оформления заказа (внутри `CartPage`)

**Что делает:** Показывает форму оформления при клике «Оформить заказ». Загружает адреса пользователя. Можно выбрать существующий адрес или создать новый прямо в этом окне. Выбор способа оплаты (карта/наличные). Поле для комментария. Итог заказа со скидкой. Кнопка «Подтвердить» — вызывает `api.createOrder(...)`, при успехе перенаправляет на страницу заказов.

### `OrdersPage.jsx`

**Файл:** `frontend/src/pages/OrdersPage/OrdersPage.jsx`

**Что делает:** История заказов. Загружает все заказы пользователя с сервера. Каждый заказ — карточка с: номером, датой, статусом (с цветовой индикацией), итоговой суммой. По клику разворачивается детальная информация: список товаров с фото и ценами, адрес доставки из снимка, способ оплаты, промокод (если был).

---

## Авторизация и профиль

### `LoginPage.jsx`

**Файл:** `frontend/src/pages/LoginPage/LoginPage.jsx`

**Что делает:** Страница входа и регистрации. Две вкладки: «Войти» и «Зарегистрироваться». Вкладка входа: email, пароль (с кнопкой показать/скрыть), кнопка «Войти», кнопка «Войти с Google». Вкладка регистрации: имя, фамилия, email, телефон, пароль. При успешном входе — перенаправление на главную (`window.location.href = '/'`). Кнопка Google использует `@react-oauth/google` — стандартная библиотека для Google OAuth; после подтверждения возвращает access token, который отправляется на `api.googleAuth(token)`.

### `ProfilePage.jsx`

**Файл:** `frontend/src/pages/ProfilePage/ProfilePage.jsx`

**Что делает:** Личный кабинет. Три секции:

1. **Личные данные** — форма редактирования имени, фамилии, телефона. Email не редактируется (заблокировано на сервере).
2. **Смена пароля** — три поля: старый пароль, новый пароль, подтверждение нового.
3. **Адреса** — список всех адресов с кнопками редактирования и удаления. Кнопка добавления нового адреса открывает форму. Можно отметить адрес основным — остальные автоматически снимают флаг.

---

## Панель администратора (Фронтенд)

### `AdminPage.jsx`

**Файл:** `frontend/src/pages/AdminPage/AdminPage.jsx`

**Что делает:** Обёртка всей панели. Проверяет роль пользователя — если не администратор, перенаправляет на главную. Навигация: на десктопе — боковая панель, на мобильных — нижняя панель с иконками. 10 разделов.

---

### Разделы панели администратора

#### `AdminDashboard.jsx`

**Что делает:** Загружает статистику (`api.adminStats()`), показывает 6 карточек с цифрами: заказы всего, заказы сегодня, выручка, ожидают подтверждения, пользователи, активные промокоды.

#### `AdminOrders.jsx`

**Что делает:** Таблица всех заказов. Поиск по email, фильтр по статусу и способу оплаты. По клику на строку — модальное окно с полной информацией о заказе: товары, адрес, промокод. Администратор может изменить статус заказа и сохранить.

#### `AdminUsers.jsx`

**Что делает:** Таблица пользователей. Поиск по имени/email. Можно изменить роль (user/admin) и заблокировать/разблокировать аккаунт.

#### `AdminSnakes.jsx`, `AdminTerrariums.jsx`, `AdminFoods.jsx`

**Что делают:** Управление товарами. Таблица с поиском и фильтрами. Кнопки создания, редактирования, удаления. Форма редактирования: все поля товара. Для змей — дополнительные секции управления морфами и изображениями прямо в форме.

#### `AdminPromos.jsx`

**Что делает:** Управление промокодами. Таблица с кодом, типом скидки, датами, лимитом, счётчиком использований. Форма создания нового промокода.

#### `AdminCategories.jsx`

**Что делает:** Один компонент для управления тремя видами категорий (змеи, террариумы, корм). Переключение типа через пропсы. CRUD-операции: список, создание, редактирование, удаление.

---

## Стили

Все файлы `*.styles.js` (например `CatalogPage.styles.js`, `Admin.styles.js`) — это визуальное оформление, написанное с помощью библиотеки `styled-components`. Вместо обычных CSS-файлов стили пишутся прямо в JavaScript как переменные:

```javascript
// Пример (не реальный код)
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;
```

Затем в JSX компоненте используется как обычный HTML-тег:
```jsx
<Container>
  Содержимое
</Container>
```

Это позволяет стилям быть рядом с кодом компонента, а не в отдельных CSS-файлах. Функционал кода от этого не меняется — только внешний вид.

---

## Итоговая схема взаимодействия файлов

```
Браузер открывает сайт
        ↓
    App.js
    - Проверяет авторизацию (api.getProfile)
    - Определяет, какую страницу показать
        ↓
    Нужная Page (CatalogPage / SnakePage / CartPage / ...)
    - Вызывает нужный метод из api/client.js
        ↓
    api/client.js
    - Формирует HTTP-запрос с cookie
    - Обрабатывает 401 → обновляет токен
        ↓
    Django Backend (views.py)
    - Проверяет токен (authentication.py)
    - Проверяет права (permissions.py)
    - Выполняет логику
    - Читает/пишет в БД через models.py
    - Форматирует ответ через serializers.py
        ↓
    Данные (JSON) возвращаются в Page
        ↓
    Page обновляет отображение (React state)
```
