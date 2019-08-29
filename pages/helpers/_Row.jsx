import React from 'react';
import styled from 'styled-components';

export function Row({ x, y, direction, wrap, alignContent, padding = 0, height, ...props }) {
  const Row = styled.div`
      display: flex;
      flex-wrap: ${wrap};
      flex-direction: ${direction};
      align-items: ${y};
      justify-content: ${x};
      align-content: ${alignContent};
      padding: ${padding};
      height: ${height}
  `;
  
  return (
    <Row className={props.className && props.className}>
      {props.children}
    </Row>
  );
}
