import { IState, Derive, AsyncAction, Action } from 'overmind';

import {
  AuthResponse,
  LoginDTO,
  RegisterDTO,
  ProfileResponse,
} from '../api/models';

interface State extends IState {
  currentUser: AuthResponse | ProfileResponse | null;
  authenticating: boolean;
  authenticated: Derive<State, boolean>;
  errors: string[];
}

export const state: State = {
  currentUser: null,
  authenticating: false,
  authenticated: state => Boolean(state.currentUser),
  errors: [],
};

const initializeUser: AsyncAction = async ({ state, effects }) => {
  const token = localStorage.getItem('access_token');
  state.authenticating = true;
  if (token) {
    effects.setToken(token);
    const {
      data: { user },
    } = await effects.getCurrentUser();
    state.currentUser = user;
  }
  state.authenticating = false;
};

const login: AsyncAction<LoginDTO> = async ({ state, effects }, value) => {
  state.errors = [];
  state.authenticating = true;
  try {
    const {
      data: { user },
    } = await effects.login({ user: value });
    effects.setToken(user.token);
    state.currentUser = user;
  } catch (err) {
    state.errors = Object.keys(err.response.data.errors).flatMap(
      key => `${key}: ${err.response.data.errors[key]}`,
    );
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
    state.errors = Object.keys(err.response.data.errors).flatMap(
      key => `${key}: ${err.response.data.errors[key]}`,
    );
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
  initializeUser,
};
