import React from 'react';
import { useNavigate } from '@reach/router';

import { useOvermind } from './../state';

export enum ProfileButtonType {
  follow = 'follow',
  unfollow = 'unfollow',
  settings = 'settings',
}

interface Props {
  type: ProfileButtonType;
  username?: string;
}

export const ProfileButton: React.FunctionComponent<Props> = ({
  type,
  username,
}) => {
  const {
    actions: {
      profile: { followUser, unfollowUser },
    },
  } = useOvermind();
  const navigate = useNavigate();
  const onClick = () => {
    if (username) {
      switch (type) {
        case ProfileButtonType.settings:
          return navigate('/settings');
        case ProfileButtonType.follow:
          return followUser(username);
        case ProfileButtonType.unfollow:
          return unfollowUser(username);
        default:
          return;
      }
    }
  };
  const text =
    type === ProfileButtonType.settings
      ? ' Edit Profile Settings'
      : ` ${type[0].toUpperCase()}${type.substr(1)} ${username}`;
  const icon =
    type === ProfileButtonType.settings ? 'ion-gear-a' : 'ion-plus-round';
  return (
    <button className='btn btn-sm action-btn btn-secondary' onClick={onClick}>
      <span className={icon}></span>
      {text}
    </button>
  );
};
