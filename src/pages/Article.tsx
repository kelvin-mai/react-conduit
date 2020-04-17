import React, { FunctionComponent, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';

import { useOvermind } from '../state';
import { ArticleContent } from '../components/ArticleContent';

interface Props extends RouteComponentProps<{ slug: string }> {}

export const Article: FunctionComponent<Props> = ({ slug }) => {
  const {
    state: {
      articles: { db },
    },
    actions: {
      articles: { loadArticle },
    },
  } = useOvermind();
  useEffect(() => {
    if (slug && !db[slug]) {
      loadArticle(slug);
    }
  }, [slug]);
  const article = slug && db[slug];
  return (
    <div className='article-page'>
      {article ? <ArticleContent {...article} /> : <>Article Not Found</>}
    </div>
  );
};
