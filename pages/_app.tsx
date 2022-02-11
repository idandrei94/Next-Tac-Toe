import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import Head from 'next/head';
import Nav from '@/components/ui/nav';
import Footer from '@/components/ui/footer';
import { Provider } from 'react-redux';
import store from 'redux-conf/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>Next-Tac-Toe</title>
        <meta
          name="description"
          content="Little multiplayer Tic-Tac-Toe implemented with NextJs and Socket.io"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
}

export default MyApp;
