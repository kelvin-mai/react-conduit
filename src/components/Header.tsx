import React from 'react';
import { Link } from '@reach/router';
import { NavLinkProps, NavLink } from './NavLink';

// TODO: temporary page links
const pageLinks: NavLinkProps[] = [
  { to: '/', label: 'Home' },
  { to: '/signup', label: 'Sign up' },
  { to: '/signin', label: 'Sign in' },
  { to: '/new', label: 'New Post', icon: 'ion-compose' },
  { to: '/settings', label: 'Settings', icon: 'ion-gear-a' },
];

export const Header = () => (
  <nav className='navbar navbar-light'>
    <div className='container'>
      <Link className='navbar-brand' to='index.html'>
        conduit
      </Link>
      <ul className='nav navbar-nav pull-xs-right'>
        {pageLinks.map((page) => (
          <NavLink {...page} />
        ))}
      </ul>
    </div>
  </nav>
);
