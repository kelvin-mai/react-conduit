import { IState, AsyncAction } from 'overmind';

import { formatErrors } from '../utils/errors';
import { ArticleResponse } from '../api/models';

interface State extends IState {
  loading: boolean;
  tags: string[];
  errors: string[];
  list: ArticleResponse[];
}

export const state: State = {
  loading: false,
  tags: [],
  errors: [],
  list: [],
};

const loadArticles: AsyncAction<number> = async ({ state, effects }, value) => {
  state.articles.loading = true;
  try {
    const {
      data: { articles },
    } = await effects.getAllArticles(value);
    state.articles.list = articles;
  } catch (err) {
    state.articles.errors = formatErrors(err.response.data);
  }
  state.articles.loading = false;
};

const loadArticlesByTags: AsyncAction<{ tag: string; page?: number }> = async (
  { state, effects },
  { tag, page },
) => {
  state.articles.loading = true;
  try {
    const {
      data: { articles },
    } = await effects.getArticlesByTag(tag, page);
    state.articles.list = articles;
  } catch (err) {
    state.articles.errors = formatErrors(err.response.data);
  }
  state.articles.loading = false;
};

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
  loadArticles,
  loadArticlesByTags,
};
