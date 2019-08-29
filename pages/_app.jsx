import React from 'react';
import App from 'next/app';
import fetch from 'isomorphic-unfetch';
import { Header } from './components';

import './helpers/_normalize.scss';
import './_app.scss';

class Layout extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    let navData = await (await fetch(`https://liquix-react.myshopify.com/pages/navigation`)).json();
    navData = (navData.filter(({ handle }) => handle.includes('nav')))[0];
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { ...pageProps, navData };
  }
  
  render() {
    const { Component, pageProps, navData } = this.props;
    return (
      <page>
        <Header {...navData} />
        <Component {...pageProps} />
      </page>
    );
  }
}

export default Layout;