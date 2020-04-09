import React, { FunctionComponent } from 'react';
import { Link } from '@reach/router';

interface Props {
  tags: string[];
}

export const Tags: FunctionComponent<Props> = ({ tags }) => (
  <div className='sidebar'>
    <p>Popular Tags</p>
    <div className='tag-list'>
      {tags.map(tag => (
        <Link key={tag} className='tag-pill tag-default' to={`/?tag=${tag}`}>
          {tag}
        </Link>
      ))}
    </div>
  </div>
);
