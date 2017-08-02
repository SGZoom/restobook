import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import Replies from '../Replies';

import styles from './index.scss';

const Comment = ({ username, id, createdAt, text, handleReplyRequest,
  replies, newReplyText, updateNewReply, createNewReply }) => {
  const userPermalink = `/user/${username}`;
  return (
    <div className={cn('mtb20', styles.item)}>
      <div className={styles.header}>
        <span>
          <Link to={userPermalink}>
            {username}
          </Link>
        </span>
        <span className={styles.separated}>
          {`${distanceInWordsToNow(new Date(createdAt))} ago`}
        </span>
        <span className={styles.separated}>
          <a onClick={event => handleReplyRequest(id, event)} role={'link'} tabIndex={'-1'}>{'Reply'}</a>
        </span>
      </div>
      <div className={cn('mtb10', styles.text)}>
        {text}
      </div>
      { replies
        ? (
          <Replies
            commentId={id}
            newReplyText={newReplyText}
            updateNewReply={updateNewReply}
            createNewReply={createNewReply}
            replies={replies}
          />
        )
        : null
      }

    </div>
  );
};

export default Comment;
