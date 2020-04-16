import React, { FunctionComponent, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import { NumberParam, useQueryParam } from 'use-query-params';

import { useOvermind } from '../state';
import { ProfileButtonType, ProfileButton } from '../components/ProfileButton';
import { ProfileResponse } from '../api/models';
import { FeedToggle } from '../components/FeedToggle';
import { ArticleList } from '../components/ArticleList';
import { CurrentFeed } from '../state/articles';

type Props = RouteComponentProps<{ username: string }>;

export const Profile: FunctionComponent<Props> = ({ username }) => {
  const [page, setPage] = useQueryParam('page', NumberParam);
  const {
    state: {
      auth: { currentUser },
      profile: { users, loading: loadingProfile },
      articles: { list, loading: loadingArticles },
    },
    actions: {
      profile: { getUser },
      articles: { setCurrentPage },
    },
  } = useOvermind();
  useEffect(() => {
    if (username && currentUser?.username !== username && !users[username]) {
      getUser(username);
    }
    setCurrentPage({
      type: 'author',
      page: page || 0,
      author: username,
    } as CurrentFeed);
  }, [username, page]);
  let user: ProfileResponse | null = null;
  let isCurrentUser = false;
  if (username && currentUser?.username === username) {
    user = currentUser as ProfileResponse;
    isCurrentUser = true;
  } else if (username) {
    user = users[username];
  }
  let feeds = [
    {
      title: 'My Articles',
      type: 'author',
      to: { type: 'author', author: username, page: page || 0 } as CurrentFeed,
    },
  ];
  if (currentUser?.username === username) {
    feeds = [
      ...feeds,
      {
        title: 'My Favorites',
        type: 'favorite',
        to: { type: 'favorite', page: page || 0 } as CurrentFeed,
      },
    ];
  }
  return (
    <div className='profile-page'>
      <div className='user-info'>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-md-10 offset-md-1'>
              {!loadingProfile && user ? (
                <>
                  {user?.image && <img src={user.image} className='user-img' />}
                  <h4>{user?.username}</h4>
                  <p>{user?.bio}</p>
                  <ProfileButton
                    username={user?.username}
                    type={
                      isCurrentUser
                        ? ProfileButtonType.settings
                        : user?.following
                        ? ProfileButtonType.unfollow
                        : ProfileButtonType.follow
                    }
                  />
                </>
              ) : (
                <h4>Loading...</h4>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12 col-md-10 offset-md-1'>
            <FeedToggle feeds={feeds} />
            <ArticleList loading={loadingArticles} articles={list} />
          </div>
        </div>
      </div>
    </div>
  );
};
