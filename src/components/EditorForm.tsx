import React from 'react';
import { Form, Field, FieldArray } from 'formik';

import { EditorFormTags } from './EditorFormTags';

export const EditorForm = () => (
  <Form>
    <fieldset>
      <fieldset className='form-group'>
        <Field
          name='title'
          className='form-control form-control-lg'
          placeholder='Article Title'
        />
      </fieldset>
      <fieldset className='form-group'>
        <Field
          name='description'
          className='form-control'
          placeholder="What's this article about?"
        />
      </fieldset>
      <fieldset className='form-group'>
        <Field
          name='body'
          className='form-control'
          placeholder='Write your article (in markdown)'
          as='textarea'
          rows={8}
        />
      </fieldset>
      <fieldset>
        <FieldArray name='tagList' render={EditorFormTags} />
      </fieldset>
      <button className='btn btn-lg pull-xs-right btn-primary' type='submit'>
        Publish Article
      </button>
    </fieldset>
  </Form>
);
