import { IState, AsyncAction } from 'overmind';

import { UserDTO, ProfileResponse } from '../api/models';
import { formatErrors } from '../utils/errors';

interface State extends IState {
  loading: boolean;
  errors: string[];
  users: {
    [username: string]: ProfileResponse;
  };
}

export const state: State = {
  loading: false,
  errors: [],
  users: {},
};

const getUser: AsyncAction<string> = async ({ state, effects }, value) => {
  state.profile.loading = true;
  try {
    const {
      data: { profile },
    } = await effects.getUser(value);
    state.profile.users[value] = profile;
  } catch (err) {
    state.profile.errors = formatErrors(err.response.data);
  }
  state.profile.loading = false;
};

const updateCurrentUser: AsyncAction<UserDTO> = async (
  { state, effects },
  value,
) => {
  try {
    const {
      data: { user },
    } = await effects.updateUser({ user: value });
    state.auth.currentUser = user;
  } catch (err) {
    state.profile.errors = formatErrors(err.response.data);
  }
};

const followUser: AsyncAction<string> = async (
  { state, actions, effects },
  username,
) => {
  try {
    await effects.followUser(username);
  } catch (err) {
    state.profile.errors = formatErrors(err.response.data);
  }
  actions.profile.getUser(username);
};

const unfollowUser: AsyncAction<string> = async (
  { state, actions, effects },
  username,
) => {
  try {
    await effects.unfollowUser(username);
  } catch (err) {
    state.profile.errors = formatErrors(err.response.data);
  }
  actions.profile.getUser(username);
};

export const actions = {
  updateCurrentUser,
  getUser,
  followUser,
  unfollowUser,
};
