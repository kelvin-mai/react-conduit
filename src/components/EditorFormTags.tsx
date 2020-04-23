import React, { FunctionComponent } from 'react';
import { ArrayHelpers, FormikProps, Field } from 'formik';

import { ArticleDTO } from '../api/models';
export const EditorFormTags: FunctionComponent<
  ArrayHelpers & { form: FormikProps<ArticleDTO & { tag: string }> }
> = ({ push, remove, form: { values, setFieldValue } }) => {
  return (
    <>
      <Field
        name='tag'
        className='form-control'
        placeholder='Enter tags'
        onKeyPress={(e: any) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            push(values.tag);
            setFieldValue('tag', '');
          }
        }}
      />
      <div className='tag-list'>
        {values &&
          values.tagList &&
          values.tagList.length > 0 &&
          values.tagList.map((t, i) => (
            <span key={t} className='tag-default tag-pill'>
              <span className='ion-close-round' onClick={() => remove(i)} /> {t}
            </span>
          ))}
      </div>
    </>
  );
};
