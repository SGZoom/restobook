import React from 'react';
import ReplyCreator from '../Creator';

export default function Replies({ commentId, replies, newReplyText = '', updateNewReply, createNewReply }) {
  return (
    <div>
      { replies ? replies.map(reply => <div>{JSON.stringify(reply)}</div>) : null }
      <ReplyCreator
        value={newReplyText}
        btnText={'Reply'}
        name={`reply_${commentId}`}
        placeholder={'Write a reply..'}
        createHandler={event => createNewReply(commentId, newReplyText, event)}
        handleInputChange={event => updateNewReply(commentId, event)}
      />
    </div>
  );
}
