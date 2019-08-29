import React from 'react';
import Topbar from './_Topbar';
import Navbar from './_Navbar';

import './_topbar.scss';
import './_navbar.scss';

export default function Header(navData) {
  return (
    <header>
      <Topbar />
      <Navbar {...navData} />
    </header>
  );
}