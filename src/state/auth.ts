import { IState, Derive, AsyncAction, Action } from 'overmind';

import {
  AuthResponse,
  LoginDTO,
  RegisterDTO,
  ProfileResponse,
} from '../api/models';
import { formatErrors } from '../utils/errors';

interface State extends IState {
  currentUser: AuthResponse | ProfileResponse | null;
  authenticating: boolean;
  authenticated: Derive<State, boolean>;
  errors: string[];
}

export const state: State = {
  currentUser: null,
  authenticating: true,
  authenticated: state => Boolean(state.currentUser),
  errors: [],
};

const initializeUser: AsyncAction = async ({ state, effects }) => {
  const token = localStorage.getItem('access_token');
  state.auth.authenticating = true;
  if (token) {
    effects.setToken(token);
    const {
      data: { user },
    } = await effects.getCurrentUser();
    state.auth.currentUser = user;
  }
  state.auth.authenticating = false;
};

const login: AsyncAction<LoginDTO> = async ({ state, effects }, value) => {
  state.auth.errors = [];
  state.auth.authenticating = true;
  try {
    const {
      data: { user },
    } = await effects.login({ user: value });
    effects.setToken(user.token);
    state.auth.currentUser = user;
  } catch (err) {
    state.auth.errors = formatErrors(err.response.data);
    effects.setToken();
    state.auth.currentUser = null;
  }
  state.auth.authenticating = false;
};

const register: AsyncAction<RegisterDTO> = async (
  { state, effects },
  value,
) => {
  state.auth.authenticating = true;
  try {
    const {
      data: { user },
    } = await effects.register({ user: value });
    effects.setToken(user.token);
    state.auth.currentUser = user;
  } catch (err) {
    state.auth.errors = formatErrors(err.response.data);
    effects.setToken();
    state.auth.currentUser = null;
  }
  state.auth.authenticating = false;
};

const logout: Action = ({ state, effects }) => {
  state.auth.currentUser = null;
  effects.setToken();
};

export const actions = {
  login,
  register,
  logout,
  initializeUser,
};
