import React from 'react';
import { useMount } from 'react-use';
import { Router, globalHistory } from '@reach/router';
import { QueryParamProvider } from 'use-query-params';

import { Layout } from './components/Layout';
import { Auth } from './pages/Auth';
import { useOvermind } from './state';
import { Settings } from './pages/Settings';
import { Profile } from './pages/Profile';
import { Home } from './pages/Home';
import { Article } from './pages/Article';
import { Editor } from './pages/Editor';

export const App = () => {
  const {
    actions: {
      auth: { initializeUser },
    },
  } = useOvermind();
  useMount(initializeUser);
  return (
    <Layout>
      <QueryParamProvider reachHistory={globalHistory}>
        <Router>
          <Home path='/' />
          <Auth path='/login' auth='login' />
          <Auth path='/register' auth='register' />
          <Settings path='/settings' />
          <Editor path='/editor' />
          <Editor path='/editor/:slug' />
          <Article path='/articles/:slug' />
          <Profile path='/:username' />
        </Router>
      </QueryParamProvider>
    </Layout>
  );
};
