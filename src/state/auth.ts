import { IState, Derive, AsyncAction, Action } from 'overmind';

import { AuthResponse, LoginDTO, RegisterDTO } from '../api/models';

interface State extends IState {
  currentUser: AuthResponse | null;
  authenticating: boolean;
  authenticated: Derive<State, boolean>;
}

export const state: State = {
  currentUser: null,
  authenticating: false,
  authenticated: state => Boolean(state.currentUser),
};

const login: AsyncAction<LoginDTO> = async ({ state, effects }, value) => {
  state.authenticating = true;
  try {
    const {
      data: { user },
    } = await effects.login({ user: value });
    effects.setToken(user.token);
    state.currentUser = user;
  } catch (err) {
    console.log(err);
    effects.setToken();
    state.currentUser = null;
  }
  state.authenticating = false;
};

const register: AsyncAction<RegisterDTO> = async (
  { state, effects },
  value,
) => {
  state.authenticating = true;
  try {
    const {
      data: { user },
    } = await effects.register({ user: value });
    effects.setToken(user.token);
    state.currentUser = user;
  } catch (err) {
    console.log(err);
    effects.setToken();
    state.currentUser = null;
  }
  state.authenticating = false;
};

const logout: Action = ({ state, effects }) => {
  state.currentUser = null;
  effects.setToken();
};

export const actions = {
  login,
  register,
  logout,
};
