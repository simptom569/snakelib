import GlobalStyle from './styles/GlobalStyle';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Catalog from './components/Catalog/Catalog';

function App() {
  return (
    <>
      <GlobalStyle />
      <Header cartCount={0} />
      <Hero />
      <Catalog />
    </>
  );
}

export default App;
