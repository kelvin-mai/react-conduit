import React, { FunctionComponent } from 'react';

import { ArticleActions } from './ArticleActions';
import { ArticleResponse } from '../api/models';

interface Props extends ArticleResponse {}

export const ArticleContent: FunctionComponent<Props> = ({
  slug,
  title,
  createdAt,
  favorited,
  favoritesCount,
  body,
  author: { username, following, image },
}) => (
  <>
    <div className='banner'>
      <div className='container'>
        <h1>{title}</h1>
        <ArticleActions
          slug={slug}
          createdAt={createdAt}
          favorited={Boolean(favorited)}
          favoritesCount={favoritesCount}
          username={username || ''}
          following={Boolean(following)}
          image={image}
        />
      </div>
    </div>
    <div className='container page'>
      <div className='row article-content'>
        <div className='col-md-12'>{body}</div>
      </div>
      <hr />
      <div className='article-actions'>
        <ArticleActions
          slug={slug}
          createdAt={createdAt}
          favorited={Boolean(favorited)}
          favoritesCount={favoritesCount}
          username={username || ''}
          following={Boolean(following)}
          image={image}
        />
      </div>
      <div className='row'>
        <div className='col-xs-12 col-md-8 offset-md-2'>{/* comments */}</div>
      </div>
    </div>
  </>
);
