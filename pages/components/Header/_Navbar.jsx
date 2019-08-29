import React from 'react';
import { Row } from '../../helpers';
import NavbarItem from './_NavbarItem';
import styled from 'styled-components';

export default function Navbar(navData) {
  
  const Navbar = styled.div`
      height: 40px;
      background: white;
      font-weight: 700;
      color: #3c424F;
      font-size: 12px;
  `;
  
  return (
    <Navbar>
      <Row className="wrapper" x={'space-between'} y={'center'} height={'40px'} wrap={'nowrap'}>
        <Row className="nav" y={'center'} height={'100%'} wrap={'nowrap'}>
          {
            navData.links.map((navItem) => navItem.active && <NavbarItem key={navItem.handle} {...navItem} />)
          }
        </Row>
        Favorites
      </Row>
    </Navbar>
  );
}