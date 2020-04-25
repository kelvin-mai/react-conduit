import React, { FunctionComponent } from 'react';
import { Link } from '@reach/router';

import { CommentResponse } from '../api/models';
import { isImg } from '../utils/regex';
import { useOvermind } from '../state';

interface Props extends CommentResponse {
  slug: string;
}

export const Comment: FunctionComponent<Props> = ({
  id,
  slug,
  body,
  createdAt,
  author: { username, image },
}) => {
  const {
    state: {
      auth: { currentUser },
    },
    actions: {
      comments: { deleteComment },
    },
  } = useOvermind();
  return (
    <div className='card'>
      <div className='card-block'>
        <p className='card-text'>{body}</p>
      </div>
      <div className='card-footer'>
        <Link className='comment-author' to={`/${username}`}>
          {image && isImg(image) && (
            <img className='comment-author-img' src={image || ''} />
          )}
        </Link>{' '}
        <span className='date-posted'>{createdAt}</span>
        {currentUser?.username === username && (
          <span
            className='mod-options'
            onClick={() => deleteComment({ slug, id })}
          >
            <span className='ion-trash-a' />
          </span>
        )}
      </div>
    </div>
  );
};
