import React, { FunctionComponent, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';

import { useOvermind } from '../state';
import { ProfileButtonType, ProfileButton } from '../components/ProfileButton';
import { ProfileResponse } from '../api/models';

type Props = RouteComponentProps<{ username: string }>;

export const Profile: FunctionComponent<Props> = ({ username }) => {
  const {
    state: {
      auth: { currentUser },
      profile: { users, loading },
    },
    actions: {
      profile: { getUser },
    },
  } = useOvermind();
  useEffect(() => {
    if (username && currentUser?.username !== username && !users[username]) {
      getUser(username);
    }
  }, [username]);
  let user: ProfileResponse | null = null;
  let isCurrentUser = false;
  if (username && currentUser?.username === username) {
    user = currentUser as ProfileResponse;
    isCurrentUser = true;
  } else if (username) {
    user = users[username];
  }
  return (
    <div className='profile-page'>
      <div className='user-info'>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-md-10 offset-md-1'>
              {!loading && user ? (
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
    </div>
  );
};
