import React, { FunctionComponent, useEffect } from 'react';
import { useMount } from 'react-use';
import { RouteComponentProps } from '@reach/router';
import { useQueryParam, StringParam } from 'use-query-params';

import { useOvermind } from '../state';
import { Tags } from '../components/Tags';
import { ArticleList } from '../components/ArticleList';

export const Home: FunctionComponent<RouteComponentProps> = () => {
  const [tag] = useQueryParam('tag', StringParam);
  const {
    state: {
      articles: { tags, list, loading },
    },
    actions: {
      articles: { loadTags, loadArticles, loadArticlesByTags },
    },
  } = useOvermind();
  useMount(() => tags.length < 1 && loadTags());
  useEffect(() => {
    if (tag) {
      loadArticlesByTags({ tag });
    } else {
      loadArticles(0);
    }
  }, [tag]);
  return (
    <div className='home-page'>
      <div className='banner'>
        <h1 className='logo-font'>conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-9'>
            <ArticleList loading={loading} articles={list} />
          </div>
          <div className='col-md-3'>
            <Tags tags={tags} />
          </div>
        </div>
      </div>
    </div>
  );
};
