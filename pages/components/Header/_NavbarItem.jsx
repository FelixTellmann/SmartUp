import React from 'react';
import NavbarDropdownMenu from './_NavbarDropdownMenu';

import { FaCaretDown } from 'react-icons/fa';

export default function NavbarItem({ title, url, links }) {
  return (
    <div className="nav__item">
      <a href={url}>
        {title}
        <FaCaretDown style={{ verticalAlign: 'middle', padding: '2px 4px 4px' }} />
      </a>
      {
        links.length > 0 && <NavbarDropdownMenu {...{links}} />
      }
    </div>
  );
}

