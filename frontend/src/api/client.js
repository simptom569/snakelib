const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost/api/v1';

let isRefreshing = false;
let refreshQueue = [];

function flushQueue(error) {
  refreshQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve();
  });
  refreshQueue = [];
}

async function refreshTokens() {
  const res = await fetch(`${BASE_URL}/auth/token/refresh/`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('refresh_failed');
}

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (res.status !== 401) return res;

  // Если уже рефрешим — ставим запрос в очередь
  if (isRefreshing) {
    await new Promise((resolve, reject) => {
      refreshQueue.push({ resolve, reject });
    });
    return request(path, options);
  }

  isRefreshing = true;
  try {
    await refreshTokens();
    flushQueue(null);
    return request(path, options);
  } catch (err) {
    flushQueue(err);
    throw err;
  } finally {
    isRefreshing = false;
  }
}

async function parseResponse(res) {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

const api = {
  get: (path, options) => request(path, { ...options, method: 'GET' }),

  post: (path, body, options) =>
    request(path, { ...options, method: 'POST', body: JSON.stringify(body) }),

  patch: (path, body, options) =>
    request(path, { ...options, method: 'PATCH', body: JSON.stringify(body) }),

  put: (path, body, options) =>
    request(path, { ...options, method: 'PUT', body: JSON.stringify(body) }),

  delete: (path, options) => request(path, { ...options, method: 'DELETE' }),

  // Хелперы для auth
  login: (email, password) =>
    api.post('/auth/token/', { email, password }),

  googleAuth: (accessToken) =>
    api.post('/auth/google/', { access_token: accessToken }),

  register: (data) =>
    api.post('/auth/register/', data),

  logout: () =>
    api.post('/auth/logout/', {}),

  getProfile: () =>
    api.get('/profile/'),

  // Cart
  getCart: () =>
    api.get('/cart/'),

  addCartItem: (snakeId, morphId = null, quantity = 1) =>
    api.post('/cart/items/', { snake_id: snakeId, morph_id: morphId, quantity }),

  addTerrariumCartItem: (terrariumId, quantity = 1) =>
    api.post('/cart/items/', { terrarium_id: terrariumId, quantity }),

  addFoodCartItem: (foodId, quantity = 1) =>
    api.post('/cart/items/', { food_id: foodId, quantity }),

  updateCartItem: (itemId, quantity) =>
    api.patch(`/cart/items/${itemId}/`, { quantity }),

  removeCartItem: (itemId) =>
    api.delete(`/cart/items/${itemId}/`),

  // Addresses
  getAddresses: () =>
    api.get('/addresses/'),

  createAddress: (data) =>
    api.post('/addresses/', data),

  updateAddress: (id, data) =>
    api.patch(`/addresses/${id}/`, data),

  deleteAddress: (id) =>
    api.delete(`/addresses/${id}/`),

  // Promo
  applyPromo: (code, orderAmount) =>
    api.post('/promo/apply/', { code, order_amount: orderAmount }),

  // Orders
  createOrder: (data) =>
    api.post('/orders/', data),

  getOrders: () =>
    api.get('/orders/'),

  // Admin
  adminStats: () =>
    api.get('/admin/stats/'),

  adminGetOrders: (params = '') =>
    api.get(`/admin/orders/${params}`),

  adminUpdateOrder: (id, data) =>
    api.patch(`/admin/orders/${id}/`, data),

  adminGetUsers: (params = '') =>
    api.get(`/admin/users/${params}`),

  adminUpdateUser: (id, data) =>
    api.patch(`/admin/users/${id}/`, data),

  adminGetSnakes: (params = '') =>
    api.get(`/admin/snakes/${params}`),

  adminCreateSnake: (data) =>
    api.post('/admin/snakes/', data),

  adminUpdateSnake: (id, data) =>
    api.patch(`/admin/snakes/${id}/`, data),

  adminDeleteSnake: (id) =>
    api.delete(`/admin/snakes/${id}/`),

  adminGetTerrariums: (params = '') =>
    api.get(`/admin/terrariums/${params}`),

  adminCreateTerrarium: (data) =>
    api.post('/admin/terrariums/', data),

  adminUpdateTerrarium: (id, data) =>
    api.patch(`/admin/terrariums/${id}/`, data),

  adminDeleteTerrarium: (id) =>
    api.delete(`/admin/terrariums/${id}/`),

  adminGetFoods: (params = '') =>
    api.get(`/admin/foods/${params}`),

  adminCreateFood: (data) =>
    api.post('/admin/foods/', data),

  adminUpdateFood: (id, data) =>
    api.patch(`/admin/foods/${id}/`, data),

  adminDeleteFood: (id) =>
    api.delete(`/admin/foods/${id}/`),

  adminGetPromos: (params = '') =>
    api.get(`/admin/promos/${params}`),

  adminCreatePromo: (data) =>
    api.post('/admin/promos/', data),

  adminUpdatePromo: (id, data) =>
    api.patch(`/admin/promos/${id}/`, data),

  adminDeletePromo: (id) =>
    api.delete(`/admin/promos/${id}/`),

  adminGetSnakeCategories: (params = '') =>
    api.get(`/admin/snake-categories/${params}`),
  adminCreateSnakeCategory: (data) =>
    api.post('/admin/snake-categories/', data),
  adminUpdateSnakeCategory: (id, data) =>
    api.patch(`/admin/snake-categories/${id}/`, data),
  adminDeleteSnakeCategory: (id) =>
    api.delete(`/admin/snake-categories/${id}/`),

  adminGetTerrariumCategories: (params = '') =>
    api.get(`/admin/terrarium-categories/${params}`),
  adminCreateTerrariumCategory: (data) =>
    api.post('/admin/terrarium-categories/', data),
  adminUpdateTerrariumCategory: (id, data) =>
    api.patch(`/admin/terrarium-categories/${id}/`, data),
  adminDeleteTerrariumCategory: (id) =>
    api.delete(`/admin/terrarium-categories/${id}/`),

  adminGetFoodCategories: (params = '') =>
    api.get(`/admin/food-categories/${params}`),
  adminCreateFoodCategory: (data) =>
    api.post('/admin/food-categories/', data),
  adminUpdateFoodCategory: (id, data) =>
    api.patch(`/admin/food-categories/${id}/`, data),
  adminDeleteFoodCategory: (id) =>
    api.delete(`/admin/food-categories/${id}/`),

  parse: parseResponse,
};

export default api;
