import React, { FunctionComponent } from 'react';
import { Link } from '@reach/router';

interface Props {
  to: string;
  icon?: string;
  label: string;
}

export type NavLinkProps = Props;

export const NavLink: FunctionComponent<Props> = ({ to, icon, label }) => (
  <li className='nav-item'>
    <Link to={to} className='nav-link'>
      {icon && <span className={icon} />}
      {label}
    </Link>
  </li>
);
