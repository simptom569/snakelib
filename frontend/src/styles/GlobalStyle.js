import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    font-family: 'Nunito', sans-serif;
    font-size: 16px;
    color: #1a1a1a;
    background: #F9FCFA;
    -webkit-font-smoothing: antialiased;
  }
`;

export default GlobalStyle;
