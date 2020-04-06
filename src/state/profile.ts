import { IState, AsyncAction } from 'overmind';

import { UserDTO, ProfileResponse } from '../api/models';

interface State extends IState {
  loading: boolean;
  users: {
    [username: string]: ProfileResponse;
  };
}

export const state: State = {
  loading: false,
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
    console.log(err);
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
    console.log(err);
  }
};

export const actions = {
  updateCurrentUser,
  getUser,
};
