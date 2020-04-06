import React, { FunctionComponent } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { useOvermind } from '../state';

interface Props {}

const SettingsValidationSchema = Yup.object().shape({
  bio: Yup.string(),
  image: Yup.string(),
  username: Yup.string(),
  email: Yup.string(),
  password: Yup.string().required(),
});

export const SettingsForm: FunctionComponent<Props> = () => {
  const {
    state: {
      auth: { currentUser },
    },
    actions: {
      profile: { updateCurrentUser },
    },
  } = useOvermind();
  const initialValues = {
    bio: currentUser?.bio || '',
    image: currentUser?.image || '',
    username: currentUser?.username || '',
    email: currentUser?.email || '',
    password: '',
  };
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={updateCurrentUser}
      validationSchema={SettingsValidationSchema}
    >
      {({ isValid }) => (
        <Form>
          <fieldset className='form-group'>
            <Field
              className='form-control'
              type='text'
              placeholder='URL of profile picture'
              name='image'
            />
          </fieldset>
          <fieldset className='form-group'>
            <Field
              className='form-control form-control-lg'
              type='text'
              placeholder='Your Name'
              name='username'
            />
          </fieldset>
          <fieldset className='form-group'>
            <Field
              className='form-control form-control-lg'
              as='textarea'
              rows={8}
              placeholder='Short bio about you'
              name='bio'
            />
          </fieldset>
          <fieldset className='form-group'>
            <Field
              className='form-control form-control-lg'
              type='text'
              placeholder='Email'
              name='email'
            />
          </fieldset>
          <fieldset className='form-group'>
            <Field
              className='form-control form-control-lg'
              type='password'
              placeholder='Password'
              name='password'
            />
          </fieldset>
          <button
            className='btn btn-lg btn-primary btn-block'
            disabled={!isValid}
          >
            Update Settings
          </button>
        </Form>
      )}
    </Formik>
  );
};
