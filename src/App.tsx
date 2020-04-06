import React, { FunctionComponent } from 'react';
import { useMount } from 'react-use';
import { Router, RouteComponentProps } from '@reach/router';

import { Layout } from './components/Layout';
import { Auth } from './pages/Auth';
import { useOvermind } from './state';
import { Settings } from './pages/Settings';
import { Profile } from './pages/Profile';

export const Temp: FunctionComponent<RouteComponentProps> = () => (
  <div>Hello World</div>
);

export const App = () => {
  const {
    actions: {
      auth: { initializeUser },
    },
  } = useOvermind();
  useMount(initializeUser);
  return (
    <Layout>
      <Router>
        <Temp path='/' />
        <Auth path='/login' auth='login' />
        <Auth path='/register' auth='register' />
        <Settings path='/settings' />
        <Profile path='/:username' />
      </Router>
    </Layout>
  );
};
