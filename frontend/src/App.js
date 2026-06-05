import { useState, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GlobalStyle from './styles/GlobalStyle';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Catalog from './components/Catalog/Catalog';
import Features from './components/Features/Features';
import Reviews from './components/Reviews/Reviews';
import Consultation from './components/Consultation/Consultation';
import Footer from './components/Footer/Footer';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import AboutPage from './pages/AboutPage/AboutPage';
import FaqPage from './pages/FaqPage/FaqPage';
import DeliveryPage from './pages/DeliveryPage/DeliveryPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import CartPage from './pages/CartPage/CartPage';
import SnakePage from './pages/SnakePage/SnakePage';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import TerrariumCatalogPage from './pages/TerrariumCatalogPage/TerrariumCatalogPage';
import TerrariumPage from './pages/TerrariumPage/TerrariumPage';
import TerrariumCategoryPage from './pages/TerrariumCategoryPage/TerrariumCategoryPage';
import FoodCatalogPage from './pages/FoodCatalogPage/FoodCatalogPage';
import FoodPage from './pages/FoodPage/FoodPage';
import FoodCategoryPage from './pages/FoodCategoryPage/FoodCategoryPage';
import OrdersPage from './pages/OrdersPage/OrdersPage';
import AdminPage from './pages/AdminPage/AdminPage';
import api from './api/client';

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
          return api.getCart().then(r => r.ok ? api.parse(r) : null);
        }
      })
      .then(cart => {
        if (cart) {
          const count = cart.items.reduce((sum, i) => sum + i.quantity, 0);
          setCartCount(count);
        }
      })
      .catch(() => {})
      .finally(() => setAuthLoading(false));
  }, []);

  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';

  if (authLoading && AUTH_ROUTES.some(r => path.startsWith(r))) {
    return <GlobalStyle />;
  }

  if (path === '/admin-panel') {
    return (
      <>
        <GlobalStyle />
        <AdminPage user={user} />
      </>
    );
  }

  if (path === '/login') {
    return (
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <GlobalStyle />
        <LoginPage />
      </GoogleOAuthProvider>
    );
  }

  return (
    <>
      <GlobalStyle />
      <Header cartCount={cartCount} user={user} onLogout={() => setUser(null)} />
      {path === '/catalog' ? (
        <CatalogPage />
      ) : path === '/about' ? (
        <AboutPage />
      ) : path === '/faq' ? (
        <FaqPage />
      ) : path === '/delivery' ? (
        <DeliveryPage />
      ) : path === '/terrariums' ? (
        <TerrariumCatalogPage />
      ) : path.startsWith('/terrariums/category/') ? (
        <TerrariumCategoryPage />
      ) : path.startsWith('/terrariums/') ? (
        <TerrariumPage onCartChange={setCartCount} />
      ) : path === '/food' ? (
        <FoodCatalogPage />
      ) : path.startsWith('/food/category/') ? (
        <FoodCategoryPage />
      ) : path.startsWith('/food/') ? (
        <FoodPage onCartChange={setCartCount} />
      ) : path === '/orders' ? (
        <OrdersPage />
      ) : path === '/profile' ? (
        <ProfilePage user={user} onUserUpdate={setUser} />
      ) : path === '/cart' ? (
        <CartPage onCartChange={setCartCount} />
      ) : path.startsWith('/catalog/category/') ? (
        <CategoryPage />
      ) : path.startsWith('/catalog/') ? (
        <SnakePage onCartChange={setCartCount} />
      ) : path !== '/' ? (
        <NotFoundPage />
      ) : (
        <>
          <Hero />
          <Catalog />
          <Features />
          <Reviews />
          <Consultation />
        </>
      )}
      <Footer />
    </>
  );
}

export default App;
