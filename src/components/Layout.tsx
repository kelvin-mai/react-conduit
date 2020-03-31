import React, { FunctionComponent } from 'react';

import { Header } from './Header';
import { Footer } from './Footer';

export const Layout: FunctionComponent = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);
