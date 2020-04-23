import React, { FunctionComponent } from 'react';
import { Link, useNavigate } from '@reach/router';

import { isImg } from '../utils/regex';
import { useOvermind } from '../state';

interface Props {
  createdAt: string;
  slug: string;
}

export const EditActions: FunctionComponent<Props> = ({ createdAt, slug }) => {
  const {
    state: {
      auth: { currentUser },
    },
    actions: {
      articles: { deleteArticle },
    },
  } = useOvermind();
  const navigate = useNavigate();
  const deleteAndRedirect = () => {
    deleteArticle(slug);
    navigate('/');
  };
  const { username, image } = currentUser || { username: '', image: '' };
  return (
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
      <Link to={`/editor/${slug}`} className='btn btn-sm btn-outline-secondary'>
        <span className='ion-edit' />
        Edit Article
      </Link>{' '}
      <button
        className='btn btn-sm btn-outline-danger'
        onClick={deleteAndRedirect}
      >
        <span className='ion-trash-a' />
        Delete Article
      </button>
    </div>
  );
};
