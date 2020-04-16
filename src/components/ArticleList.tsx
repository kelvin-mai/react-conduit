import React, { FunctionComponent } from 'react';

import { ArticleResponse } from '../api/models';
import { ArticlePreview } from './ArticlePreview';
import { useQueryParam, NumberParam } from 'use-query-params';

interface Props {
  loading: boolean;
  articles: ArticleResponse[];
}

export const ArticleList: FunctionComponent<Props> = ({
  loading,
  articles,
}) => {
  const [page, setPage] = useQueryParam('page', NumberParam);
  const prevDisabled = page === 0 || !page;
  const nextDisabled = articles.length < 10;
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
      <button
        className={`btn btn-primary pull-xs-left ${prevDisabled && 'disabled'}`}
        onClick={() => !prevDisabled && setPage(page ? page - 1 : 0)}
      >
        Previous Page
      </button>
      <button
        className={`btn btn-primary pull-xs-right ${
          nextDisabled && 'disabled'
        }`}
        onClick={() => !nextDisabled && setPage(page ? page + 1 : 1)}
      >
        Next Page
      </button>
    </>
  );
};
