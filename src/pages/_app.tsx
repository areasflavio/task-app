import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import { lightTheme } from '../styles/themes';

import GlobalStyle from '../styles/global';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />

      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
