import GlobalStyle from './styles/GlobalStyle';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Catalog from './components/Catalog/Catalog';
import Features from './components/Features/Features';
import Reviews from './components/Reviews/Reviews';
import Consultation from './components/Consultation/Consultation';
import Footer from './components/Footer/Footer';
import CatalogPage from './pages/CatalogPage/CatalogPage';

const isCatalog = window.location.pathname === '/catalog';

function App() {
  return (
    <>
      <GlobalStyle />
      <Header cartCount={0} />
      {isCatalog ? (
        <CatalogPage />
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
