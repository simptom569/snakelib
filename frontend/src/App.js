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

const path = window.location.pathname;

function App() {
  return (
    <>
      <GlobalStyle />
      <Header cartCount={0} />
      {path === '/catalog' ? (
        <CatalogPage />
      ) : path === '/about' ? (
        <AboutPage />
      ) : path === '/faq' ? (
        <FaqPage />
      ) : path === '/delivery' ? (
        <DeliveryPage />
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
