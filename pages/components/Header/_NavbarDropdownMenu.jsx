import React from 'react';

export default function NavbarDropdownMenu({ links }) {
  return (
    <div className="sub-nav">
      {
        links.map((item) => item.active && <NavbarDropdownItem key={item.handle} {...item} />)
      }
    </div>
  );
}

export function NavbarDropdownItem({ title, url }) {
  return (
    <a href={url} className="sub-nav__item">
      {title}
    </a>
  );
}