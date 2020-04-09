import React, { FunctionComponent } from 'react';
import { Link } from '@reach/router';

import { ArticleResponse } from '../api/models';
import { isImg } from '../utils/regex';

interface Props extends ArticleResponse {}

export const ArticlePreview: FunctionComponent<Props> = ({
  slug,
  title,
  description,
  favoritesCount,
  createdAt,
  author: { username, image },
}) => (
  <div className='article-preview'>
    <div className='article-meta'>
      <Link to={`/${username}`}>
        {image && isImg(image) && <img src={image || ''} />}
      </Link>
      <div className='info'>
        <Link to={`/${username}`} className='author'>
          {username}
        </Link>
        <span className='date'>{createdAt}</span>
      </div>
      <button className='btn btn-outline-primary btn-sm pull-xs-right'>
        <span className='ion-heart' /> {favoritesCount}
      </button>
      <Link to={`/articles/${slug}`} className='preview-link'>
        <h1>{title}</h1>
        <p>{description}</p>
        <span>Read more...</span>
      </Link>
    </div>
  </div>
);
