import React, { FunctionComponent } from 'react';

import { ArticleActions } from './ArticleActions';
import { ArticleResponse } from '../api/models';
import { useOvermind } from '../state';
import { EditActions } from './EditActions';
import { CommentList } from './CommentList';

interface Props extends ArticleResponse {}

export const ArticleContent: FunctionComponent<Props> = ({
  slug,
  title,
  createdAt,
  favorited,
  favoritesCount,
  body,
  author: { username, following, image },
}) => {
  const {
    state: {
      auth: { currentUser },
    },
  } = useOvermind();
  const actionButtons =
    currentUser && currentUser.username === username ? (
      <EditActions slug={slug} createdAt={createdAt} />
    ) : (
      <ArticleActions
        slug={slug}
        createdAt={createdAt}
        favorited={Boolean(favorited)}
        favoritesCount={favoritesCount}
        username={username || ''}
        following={Boolean(following)}
        image={image}
      />
    );
  return (
    <>
      <div className='banner'>
        <div className='container'>
          <h1>{title}</h1>
          {actionButtons}
        </div>
      </div>
      <div className='container page'>
        <div className='row article-content'>
          <div className='col-md-12'>{body}</div>
        </div>
        <hr />
        <div className='article-actions'>{actionButtons}</div>
        <div className='row'>
          <div className='col-xs-12 col-md-8 offset-md-2'>
            <CommentList slug={slug} />
          </div>
        </div>
      </div>
    </>
  );
};
