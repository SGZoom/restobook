import React from 'react';
import cn from 'classnames';

import styles from './index.scss';

export default function PostItem(
  { username, createdAt, text },
) {
  return (
    <div className={cn('card mtb20', styles.item)}>
      <div>{username}</div>
      <div>{createdAt}</div>
      <div>{text}</div>
    </div>
  );
}
