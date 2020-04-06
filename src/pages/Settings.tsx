import React, { FunctionComponent } from 'react';
import { RouteComponentProps, Redirect } from '@reach/router';

import { SettingsForm } from '../components/SettingsForm';
import { useOvermind } from '../state';

export const Settings: FunctionComponent<RouteComponentProps> = () => {
  const {
    state: {
      auth: { authenticated, authenticating },
    },
    actions: {
      auth: { logout },
    },
  } = useOvermind();
  if (!authenticated && !authenticating) {
    return <Redirect to='/' noThrow={true} />;
  }
  return (
    <div className='settings-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 col-xs-12'>
            <h1 className='text-xs-center'>Your Settings</h1>
            <SettingsForm />
            <button
              className='btn btn-outline-danger btn-block'
              style={{ marginTop: '0.5rem' }}
              onClick={logout}
            >
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
