import React, { FunctionComponent, useEffect } from 'react';
import { Comment } from './Comment';

import { useOvermind } from '../state';
import { CommentForm } from './CommentForm';

interface Props {
  slug: string;
}

export const CommentList: FunctionComponent<Props> = ({ slug }) => {
  const {
    state: {
      comments: { comments, loading },
    },
    actions: {
      comments: { loadComments },
    },
  } = useOvermind();
  useEffect(() => {
    loadComments(slug);
  }, [slug]);
  return loading ? (
    <>Loading comments...</>
  ) : (
    <>
      <CommentForm slug={slug} />
      {comments.map(comment => (
        <Comment key={comment.id} {...comment} slug={slug} />
      ))}
    </>
  );
};
