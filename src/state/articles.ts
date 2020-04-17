import {
  IState,
  AsyncAction,
  Derive,
  Operator,
  Action,
  pipe,
  mutate,
  when,
  noop,
} from 'overmind';

import { arrayToMap, appendToMap } from '../utils/hashmap';
import { formatErrors } from '../utils/errors';
import { ArticleResponse } from '../api/models';

export type CurrentFeed = {
  type: string;
  page: number;
  tag?: string;
  author?: string;
} & (
  | { type: 'all' | 'favorite' | 'feed'; page: number }
  | { type: 'tag'; page: number; tag: string }
  | { type: 'author'; page: number; author: string }
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
    feed: Partial<Array<string[]>>;
    author: Partial<Array<string[]>>;
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
    if (['all', 'feed', 'author', 'favorite', 'tag'].includes(type)) {
      return state.feeds[type][page]?.map(slug => state.db[slug]) || [];
    }
    return [];
  },
  db: {},
  feeds: {
    all: [[]],
    feed: [[]],
    favorite: [[]],
    author: [[]],
    tag: [[]],
    current: {
      type: 'all',
      page: 0,
    },
  },
};

const loadArticle: AsyncAction<string> = async ({ state, effects }, slug) => {
  state.articles.loading = true;
  try {
    const {
      data: { article },
    } = await effects.getArticle(slug);
    state.articles.db[slug] = article;
  } catch (err) {
    state.articles.errors = formatErrors(err.response.data);
  }
  state.articles.loading = false;
};

const loadArticles: AsyncAction<CurrentFeed> = async (
  { state, effects },
  { type, page, tag, author },
) => {
  const request = {
    all: () => effects.getAllArticles(page),
    feed: () => effects.getFeed(page),
    author: () => author && effects.getArticlesByAuthor(author, page),
    favorite: () =>
      state.auth.currentUser?.username &&
      effects.getArticlesByFavorited(state.auth.currentUser.username, page),
    tag: () => tag && effects.getArticlesByTag(tag, page),
  }[type];
  state.articles.loading = true;
  try {
    const response = await request();
    if (response) {
      const {
        data: { articles },
      } = response;
      state.articles.db = appendToMap(
        state.articles.db,
        arrayToMap(articles, 'slug'),
      );
      state.articles.feeds[type][page] = articles.map(article => article.slug);
    }
  } catch (err) {
    state.articles.errors = formatErrors(err.response.data);
  }
  state.articles.loading = false;
};

const setCurrentFeed: Action<CurrentFeed> = ({ state }, value) => {
  state.articles.feeds.current = value;
};

const resetFeed: Action<CurrentFeed> = ({ state }, { type }) => {
  state.articles.feeds[type] = [[]];
};

const setCurrentPage: Operator<CurrentFeed> = pipe(
  when(({ state }, { tag }) => state.articles.feeds.current.tag !== tag, {
    true: mutate(resetFeed),
    false: mutate(noop),
  }),
  when(
    ({ state }, { author }) => state.articles.feeds.current.author !== author,
    {
      true: mutate(resetFeed),
      false: mutate(noop),
    },
  ),
  mutate(setCurrentFeed),
  when(
    ({ state }, { type, page }) => !state.articles.feeds[type][page]?.length,
    {
      true: mutate(loadArticles),
      false: mutate(noop),
    },
  ),
);

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

const favoriteArticle: AsyncAction<string> = async (
  { state, effects },
  slug,
) => {
  state.articles.loading = true;
  try {
    const {
      data: { article },
    } = await effects.favoriteArticle(slug);
    state.articles.db[slug] = article;
  } catch (err) {
    state.articles.errors = formatErrors(err.response.data);
  }
  state.articles.loading = false;
};

const unfavoriteArticle: AsyncAction<string> = async (
  { state, effects },
  slug,
) => {
  state.articles.loading = true;
  try {
    const {
      data: { article },
    } = await effects.unfavoriteArticle(slug);
    state.articles.db[slug] = article;
  } catch (err) {
    state.articles.errors = formatErrors(err.response.data);
  }
  state.articles.loading = false;
};

export const actions = {
  loadArticle,
  loadTags,
  setCurrentPage,
  favoriteArticle,
  unfavoriteArticle,
};
