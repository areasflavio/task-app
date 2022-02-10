import { useState } from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import { AppContext } from '../context';

import { Header } from '../components/Header';

import { darkTheme, lightTheme } from '../styles/themes';
import GlobalStyle from '../styles/global';

function MyApp({ Component, pageProps }: AppProps) {
  let [isDarkTheme, setIsDarkTheme] = useState(false);

  const handleToggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <>
      <Head>
        <title>tasked</title>
      </Head>

      <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
        <GlobalStyle />

        <AppContext>
          <Header toggleTheme={handleToggleTheme} />

          <Component {...pageProps} />
        </AppContext>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
