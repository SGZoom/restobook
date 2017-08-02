import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

import styles from './index.scss';

const Comment = ({ username, createdAt, text }) => {
  const userPermalink = `/user/${username}`;
  return (
    <div className={cn('mtb20', styles.item)}>
      <div className={styles.header}>
        <Link to={userPermalink}>
          {username}
        </Link>
        <span>
          {` | ${distanceInWordsToNow(new Date(createdAt))} ago`}
        </span>
      </div>
      <div className={cn('mtb40', styles.text)}>
        {text}
      </div>
    </div>
  );
};

export default Comment;
