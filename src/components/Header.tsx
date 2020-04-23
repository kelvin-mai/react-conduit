import React from 'react';
import { Link } from '@reach/router';
import { NavLinkProps, NavLink } from './NavLink';
import { useOvermind } from '../state';

const unauthenticatedPageLinks: NavLinkProps[] = [
  { to: '/', label: 'Home' },
  { to: '/register', label: 'Sign up' },
  { to: '/login', label: 'Sign in' },
];
const authenticatedPageLinks: NavLinkProps[] = [
  { to: '/', label: 'Home' },
  { to: '/editor', label: 'New Article', icon: 'ion-compose' },
  { to: '/settings', label: 'Settings', icon: 'ion-gear-a' },
];

export const Header = () => {
  const {
    state: {
      auth: { authenticated, currentUser },
    },
  } = useOvermind();
  const pageLinks = authenticated
    ? [
        ...authenticatedPageLinks,
        { to: `/${currentUser?.username}`, label: `${currentUser?.username}` },
      ]
    : unauthenticatedPageLinks;
  return (
    <nav className='navbar navbar-light'>
      <div className='container'>
        <Link className='navbar-brand' to='/'>
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
