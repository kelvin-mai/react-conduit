import React, { FunctionComponent } from 'react';

import { ArticleResponse } from '../api/models';
import { ArticlePreview } from './ArticlePreview';

interface Props {
  loading: boolean;
  articles: ArticleResponse[];
}

export const ArticleList: FunctionComponent<Props> = ({
  loading,
  articles,
}) => {
  if (loading) {
    return <>Loading...</>;
  }
  if (articles.length < 1) {
    return <>No articles are here... yet.</>;
  }
  return (
    <>
      {articles.map(article => (
        <ArticlePreview key={article.slug} {...article} />
      ))}
    </>
  );
};
