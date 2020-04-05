import React, { FunctionComponent } from 'react';
import { RouteComponentProps, Link, Redirect } from '@reach/router';
import { AuthForm } from '../components/AuthForm';
import { useOvermind } from '../state';

interface Props extends RouteComponentProps {
  auth: 'login' | 'register';
}

export const Auth: FunctionComponent<Props> = ({ auth }) => {
  const {
    state: { authenticated, authenticating, errors },
  } = useOvermind();
  const header = auth === 'login' ? 'Sign in' : 'Sign up';
  const link = auth === 'login' ? '/register' : '/login';
  const linkText = auth === 'login' ? 'Have an account?' : 'Need an account?';
  if (authenticated && !authenticating) {
    return <Redirect to='/' noThrow={true} />;
  }
  return (
    <div className='auth-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 col-xs-12'>
            <h1 className='text-xs-center'>{header}</h1>
            <p className='text-xs-center'>
              <Link to={link}>{linkText}</Link>
            </p>
            {Boolean(errors.length) && (
              <ul className='error-messages'>
                {errors.map(error => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            )}
            <AuthForm auth={auth} />
          </div>
        </div>
      </div>
    </div>
  );
};
