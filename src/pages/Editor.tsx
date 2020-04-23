import React, { useEffect } from 'react';
import { RouteComponentProps, useNavigate } from '@reach/router';
import { Formik } from 'formik';

import { useOvermind } from '../state';
import { EditorForm } from '../components/EditorForm';
import { ArticleDTO } from '../api/models';

interface Props extends RouteComponentProps<{ slug: string }> {}

export const Editor: React.FunctionComponent<Props> = ({ slug }) => {
  const {
    state: {
      auth: { currentUser },
      articles: { db, loading },
    },
    actions: {
      articles: { createArticle, updateArticle, loadArticle },
    },
  } = useOvermind();
  const navigate = useNavigate();
  useEffect(() => {
    slug && !db[slug] && loadArticle(slug);
  }, [slug]);
  const handleSubmit = async ({
    tag,
    ...value
  }: ArticleDTO & { tag: string }) => {
    if (slug) {
      updateArticle({ value, slug });
      navigate(`/articles/${slug}`);
    }
    createArticle(value);
    navigate(`/${currentUser?.username}`);
  };
  const initialValues = slug
    ? { ...db[slug], tag: '' }
    : {
        title: '',
        description: '',
        body: '',
        tagList: [],
        tag: '',
      };
  return (
    <div className='editor-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-10 offset-md-1 col-xs-12'>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <EditorForm />
              </Formik>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
