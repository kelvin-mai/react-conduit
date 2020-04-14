import {
  IState,
  AsyncAction,
  Derive,
  Operator,
  Action,
  pipe,
  mutate,
} from 'overmind';

import { arrayToMap, appendToMap } from '../utils/hashmap';
import { formatErrors } from '../utils/errors';
import { ArticleResponse } from '../api/models';

type CurrentFeed = { type: string; page: number; tag?: string } & (
  | { type: 'all' | 'favorite' | 'user'; page: number }
  | { type: 'tag'; page: number; tag: string }
);

interface State extends IState {
  loading: boolean;
  tags: string[];
  errors: string[];
  list: Derive<State, ArticleResponse[]>;
  db: {
    [key: string]: ArticleResponse;
  };
  feeds: {
    all: Partial<Array<string[]>>;
    favorite: Partial<Array<string[]>>;
    user: Partial<Array<string[]>>;
    tag: Partial<Array<string[]>>;
    current: CurrentFeed;
  };
}

export const state: State = {
  loading: false,
  tags: [],
  errors: [],
  list: state => {
    const { type, page } = state.feeds.current;
    if (['all', 'user', 'favorite', 'tag'].includes(type)) {
      return state.feeds[type][page]?.map(slug => state.db[slug]) || [];
    }
    return [];
  },
  db: {},
  feeds: {
    all: [[]],
    favorite: [[]],
    user: [[]],
    tag: [[]],
    current: {
      type: 'all',
      page: 0,
    },
  },
};

const setCurrentFeed: Action<CurrentFeed> = ({ state }, value) => {
  state.articles.feeds.current = value;
};

const setCurrentPage: Operator<CurrentFeed> = pipe(mutate(setCurrentFeed));

const loadTags: AsyncAction = async ({ state, effects }) => {
  try {
    const {
      data: { tags },
    } = await effects.getTags();
    state.articles.tags = tags;
  } catch (err) {
    state.articles.errors = formatErrors(err.response.data);
  }
};

export const actions = {
  loadTags,
  setCurrentPage,
};
