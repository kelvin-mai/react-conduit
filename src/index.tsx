import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'overmind-react';

import { App } from './App';
import * as serviceWorker from './serviceWorker';
import { overmind } from './state';

render(
  <Provider value={overmind}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
