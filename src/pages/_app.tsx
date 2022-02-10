import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import { AppContext } from '../context';

import { Header } from '../components/Header';

import { lightTheme } from '../styles/themes';
import GlobalStyle from '../styles/global';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>tasked</title>
      </Head>

      <ThemeProvider theme={lightTheme}>
        <GlobalStyle />

        <AppContext>
          <Header />

          <Component {...pageProps} />
        </AppContext>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
