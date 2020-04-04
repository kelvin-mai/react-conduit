import React, { FunctionComponent } from 'react';
import { RouteComponentProps, Link } from '@reach/router';

interface Props extends RouteComponentProps {
  auth: 'login' | 'register';
}

export const Auth: FunctionComponent<Props> = ({ auth }) => {
  const header = auth === 'login' ? 'Sign in' : 'Sign up';
  const link = auth === 'login' ? '/register' : '/login';
  const linkText = auth === 'login' ? 'Have an account?' : 'Need an account?';
  return (
    <div className='auth-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 col-xs-12'>
            <h1 className='text-xs-center'>{header}</h1>
            <p className='text-xs-center'>
              <Link to={link}>{linkText}</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
