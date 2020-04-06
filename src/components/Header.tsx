import React from 'react';
import { Link } from '@reach/router';
import { NavLinkProps, NavLink } from './NavLink';
import { useOvermind } from '../state';

// TODO: temporary page links
const unauthenticatedPageLinks: NavLinkProps[] = [
  { to: '/', label: 'Home' },
  { to: '/register', label: 'Sign up' },
  { to: '/login', label: 'Sign in' },
];
const authenticatedPageLinks: NavLinkProps[] = [
  { to: '/', label: 'Home' },
  { to: '/new', label: 'New Post', icon: 'ion-compose' },
  { to: '/settings', label: 'Settings', icon: 'ion-gear-a' },
];

export const Header = () => {
  const {
    state: {
      auth: { authenticated },
    },
  } = useOvermind();
  const pageLinks = authenticated
    ? authenticatedPageLinks
    : unauthenticatedPageLinks;
  return (
    <nav className='navbar navbar-light'>
      <div className='container'>
        <Link className='navbar-brand' to='index.html'>
          conduit
        </Link>
        <ul className='nav navbar-nav pull-xs-right'>
          {pageLinks.map(page => (
            <NavLink key={page.to} {...page} />
          ))}
        </ul>
      </div>
    </nav>
  );
};
