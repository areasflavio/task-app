import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import { TaskProvider } from '../context/TaskContext';

import { lightTheme } from '../styles/themes';
import GlobalStyle from '../styles/global';
import Head from 'next/head';
import { RefsProvider } from '../context/RefsContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>tasked</title>
      </Head>

      <ThemeProvider theme={lightTheme}>
        <GlobalStyle />

        <RefsProvider>
          <TaskProvider>
            <Component {...pageProps} />
          </TaskProvider>
        </RefsProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
