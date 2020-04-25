import { IState, AsyncAction } from 'overmind';

import { CommentResponse } from '../api/models';
import { formatErrors } from '../utils/errors';

interface State extends IState {
  loading: boolean;
  comments: CommentResponse[];
  errors: string[];
}

export const state: State = {
  loading: false,
  comments: [],
  errors: [],
};

const loadComments: AsyncAction<string> = async ({ state, effects }, slug) => {
  state.comments.loading = true;
  try {
    const {
      data: { comments },
    } = await effects.getArticlesComments(slug);
    state.comments.comments = comments;
  } catch (err) {
    state.comments.errors = formatErrors(err.response.err);
  }
  state.comments.loading = false;
};

const createComment: AsyncAction<{ slug: string; body: string }> = async (
  { state, effects },
  { slug, body },
) => {
  state.comments.loading = true;
  try {
    const {
      data: { comment },
    } = await effects.createComment(slug, { comment: { body } });
    state.comments.comments = [...state.comments.comments, comment];
  } catch (err) {
    state.comments.errors = formatErrors(err.response.err);
  }
  state.comments.loading = false;
};

const deleteComment: AsyncAction<{ slug: string; id: string }> = async (
  { state, effects },
  { slug, id },
) => {
  try {
    await effects.deleteComment(slug, id);
  } catch (err) {
    state.comments.errors = formatErrors(err.response.err);
  }
  state.comments.comments = state.comments.comments.filter(
    comment => comment.id !== id,
  );
};

export const actions = {
  loadComments,
  createComment,
  deleteComment,
};
