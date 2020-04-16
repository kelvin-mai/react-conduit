import React, { FunctionComponent } from 'react';

import { useOvermind } from '../state';
import { CurrentFeed } from '../state/articles';

interface Props {
  feeds: {
    title: string;
    to: CurrentFeed;
    type: string;
  }[];
}

export const FeedToggle: FunctionComponent<Props> = ({ feeds }) => {
  const {
    state: {
      articles: {
        feeds: { current },
      },
    },
    actions: {
      articles: { setCurrentPage },
    },
  } = useOvermind();
  return (
    <div className='feed-toggle'>
      <ul className='nav nav-pills outline-active'>
        {feeds.map(feed => (
          <li key={feed.title} className='nav-item'>
            <a
              className={`nav-link ${
                current.type === feed.type ? 'active' : 'disabled'
              }`}
              style={{
                cursor: 'pointer',
              }}
              onClick={() => setCurrentPage(feed.to)}
            >
              {feed.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
