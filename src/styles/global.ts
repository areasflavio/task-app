import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    background: ${(props) => props.theme.colors.bgColor};
    -webkit-font-smoothing: antialiased !important;

    padding: 1.5rem;

    position: relative;
    
    transition: 0.35s;
  }

  body, input, button {
    font: 1rem ${(props) => props.theme.fonts.text}, sans-serif;
    font-style: normal;
    font-weight: normal;
    line-height: 1.223;
  }


  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
    border: none;
  }
`;