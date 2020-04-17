import React, { FunctionComponent } from 'react';
import { Link } from '@reach/router';
import { isImg } from '../utils/regex';
import { useOvermind } from '../state';

interface Props {
  slug: string;
  favorited: boolean;
  favoritesCount: number;
  createdAt: string;
  username: string;
  following: boolean;
  image: string | null;
}

export const ArticleActions: FunctionComponent<Props> = ({
  slug,
  favorited,
  favoritesCount,
  username,
  following,
  image,
  createdAt,
}) => {
  const {
    actions: {
      articles: { favoriteArticle, unfavoriteArticle },
      profile: { followUser, unfollowUser },
    },
  } = useOvermind();
  const favoriteAction = favorited ? unfavoriteArticle : favoriteArticle;
  const followAction = following ? followUser : unfollowUser;
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
      <button
        className='btn btn-sm btn-outline-secondary'
        onClick={() => followAction(username)}
      >
        <span className='ion-plus-round' />
        Follow {username}
      </button>{' '}
      <button
        className='btn btn-sm btn-outline-primary'
        onClick={() => favoriteAction(slug)}
      >
        <span className='ion-heart' />
        Favorite Post <span className='counter'>({favoritesCount})</span>
      </button>
    </div>
  );
};
