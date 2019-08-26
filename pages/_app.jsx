import React from 'react';
import App, { Container } from 'next/app';
import { Row } from './helpers';
import fetch from 'isomorphic-unfetch';

import './_normalize.scss';
import './_app.scss';

import './_topbar.scss';
import './_navbar.scss';
import { IoMdSettings } from 'react-icons/io';
import { FaCaretDown } from 'react-icons/fa';

class Layout extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    const navData = await (await fetch(`http://localhost:3000/api/UiNavigation`)).json();
    navData.sort((a, b) => a.order - b.order);
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { ...pageProps, navData };
  }
  
  render() {
    const { Component, pageProps, navData } = this.props;
    return (
      <page>
        <header>
          <div className="topbar">
            <Row className="wrapper" x={'space-between'} y={'center'} height={'40px'} wrap={'nowrap'}>
              logo
              <div className="user">
                company
                settings
                username
              </div>
            </Row>
          
          </div>
          <div className="navbar">
            <Row className="wrapper" x={'space-between'} y={'center'} height={'40px'} wrap={'nowrap'}>
              <Row className="nav" y={'center'} height={'100%'} wrap={'nowrap'}>
                {navData.map(navItem => {
                  {/**/}
                  if (navItem.subitem === 0) {
                    return (
                      <a key={navItem.ui_setting_id} href={navItem.url} className="nav__item">{/**/}
                        {navItem.name}
                        <FaCaretDown style={{ verticalAlign: 'middle', padding: '2px 4px 4px' }} />
                        {navItem.submenu ?
                          <div className="sub-nav">
                          {navData.map(subItem => {
                            if (subItem.subitem === 1 && navItem.ui_navigation_id === subItem.parent_item_id) {
                              return <a key={subItem.ui_setting_id} className="sub-nav__item">
                                {subItem.name}
                              </a>;
                            }
                          })}
                          </div> : null}
                      
                      </a>
                    );
                  }
                })}
              </Row>
              Favorites
            </Row>
          </div>
        </header>
        <Component {...pageProps} />
      </page>
    );
  }
}

export default Layout;