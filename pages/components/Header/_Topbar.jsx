import { Row } from '../../helpers';
import React from 'react';

export default function Topbar() {
  return (
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
  );
}