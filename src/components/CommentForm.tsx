import React, { FunctionComponent } from 'react';
import { Formik, Form, Field } from 'formik';

import { useOvermind } from '../state';
import { isImg } from '../utils/regex';

interface Props {
  slug: string;
}

export const CommentForm: FunctionComponent<Props> = ({ slug }) => {
  const {
    state: {
      auth: { currentUser, authenticated },
    },
    actions: {
      comments: { createComment },
    },
  } = useOvermind();
  const image = currentUser?.image;
  if (!authenticated) {
    return null;
  }
  return (
    <Formik
      initialValues={{ body: '' }}
      onSubmit={({ body }) => createComment({ slug, body })}
    >
      <Form className='card comment-form'>
        <div className='card-block'>
          <Field
            as='textarea'
            name='body'
            className='form-control'
            placeholder='Write a comment...'
            rows={3}
          />
        </div>
        <div className='card-footer'>
          {image && isImg(image) && (
            <img className='comment-author-img' src={image || ''} />
          )}
          <button className='btn btn-sm btn-primary' type='submit'>
            Post Comment
          </button>
        </div>
      </Form>
    </Formik>
  );
};
