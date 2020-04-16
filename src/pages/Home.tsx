import React, { FunctionComponent, useEffect } from 'react';
import { useMount } from 'react-use';
import { RouteComponentProps } from '@reach/router';
import { useQueryParam, StringParam, NumberParam } from 'use-query-params';

import { useOvermind } from '../state';
import { Tags } from '../components/Tags';
import { ArticleList } from '../components/ArticleList';
import { FeedToggle } from '../components/FeedToggle';
import { CurrentFeed } from '../state/articles';

export const Home: FunctionComponent<RouteComponentProps> = () => {
  const [tag] = useQueryParam('tag', StringParam);
  const [page, setPage] = useQueryParam('page', NumberParam);
  const {
    state: {
      auth: { authenticated },
      articles: { tags, list, loading },
    },
    actions: {
      articles: { loadTags, setCurrentPage },
    },
  } = useOvermind();
  useMount(() => tags.length < 1 && loadTags());
  useEffect(() => {
    setCurrentPage(
      tag
        ? { type: 'tag', page: page || 0, tag }
        : { type: 'all', page: page || 0 },
    );
  }, [tag, page]);
  let feeds = [
    {
      title: 'Global Feed',
      type: 'all',
      to: { type: 'all', page: page || 0 } as CurrentFeed,
    },
  ];
  if (authenticated) {
    feeds = [
      ...feeds,
      {
        title: `Your Feed`,
        type: 'feed',
        to: { type: 'feed', page: page || 0 } as CurrentFeed,
      },
    ];
  }
  if (tag) {
    feeds = [
      ...feeds,
      {
        title: `#${tag}`,
        type: 'tag',
        to: { type: 'tag', page: page || 0, tag } as CurrentFeed,
      },
    ];
  }
  return (
    <div className='home-page'>
      <div className='banner'>
        <h1 className='logo-font'>conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-9'>
            <FeedToggle feeds={feeds} />
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
