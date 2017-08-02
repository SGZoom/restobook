import request from 'axios';
import * as actions from './actions';
import { getToken } from '../utils/authorization';

export function updateNewCommentText(value) {
  return {
    type: actions.UPDATE_NEW_COMMENT_TEXT,
    value,
  };
}

function createNewCommentRequest() {
  return {
    type: actions.CREATE_NEW_COMMENT_REQUEST,
  };
}

function createNewCommentSuccess(data) {
  return {
    type: actions.CREATE_NEW_COMMENT_SUCCESS,
    data,
  };
}

function createNewCommentFailure(response) {
  return {
    type: actions.CREATE_NEW_COMMENT_FAILURE,
    payload: {
      message: response,
    },
  };
}

function fetchPostRequest() {
  return {
    type: actions.FETCH_POST_REQUEST,
  };
}

function fetchPostSuccess(data) {
  return {
    type: actions.FETCH_POST_SUCCESS,
    data,
  };
}

function fetchPostFailure(response) {
  return {
    type: actions.FETCH_POST_FAILURE,
    payload: {
      message: response,
    },
  };
}

function fetchCommentsRequest() {
  return {
    type: actions.FETCH_COMMENTS_REQUEST,
  };
}

function fetchCommentsSuccess(data) {
  return {
    type: actions.FETCH_COMMENTS_SUCCESS,
    data,
  };
}

function fetchCommentsFailure(response) {
  return {
    type: actions.FETCH_COMMENTS_FAILURE,
    payload: {
      message: response,
    },
  };
}

function fetchRepliesRequest(commentId) {
  return {
    type: actions.FETCH_REPLIES_REQUEST,
    commentId,
  };
}

function fetchRepliesSuccess(data) {
  return {
    type: actions.FETCH_REPLIES_SUCCESS,
    data,
  };
}

function fetchRepliesFailure(response, commentId) {
  return {
    type: actions.FETCH_REPLIES_FAILURE,
    payload: {
      message: response,
    },
    commentId,
  };
}

function createNewReplyRequest(commentId) {
  return {
    type: actions.CREATE_NEW_REPLY_REQUEST,
    commentId,
  };
}

function createNewReplySuccess(data) {
  return {
    type: actions.CREATE_NEW_REPLY_SUCCESS,
    data,
  };
}

function createNewReplyFailure(response, commentId) {
  return {
    type: actions.CREATE_NEW_REPLY_FAILURE,
    payload: {
      message: response,
    },
    commentId,
  };
}


export function updateNewReply(commentId, value) {
  return {
    type: actions.UPDATE_NEW_REPLY_TEXT,
    commentId,
    value,
  };
}

export function createNewComment(postId) {
  return (dispatch, getState) => {
    const token = getToken();
    const { newCommentText } = getState().Post;
    dispatch(createNewCommentRequest());

    request
      .create({
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .post(`/api/posts/${postId}/comments`, {
        text: newCommentText,
      })
      .then(response => dispatch(createNewCommentSuccess(response.data)))
      .catch((error) => {
        if (error.response && error.response.data) {
          dispatch(createNewCommentFailure(error.response.data));
        } else {
          console.log(error);
          dispatch(createNewCommentFailure('Unknown error occurred'));
        }
      });
  };
}

export function fetchPost(postId) {
  return (dispatch) => {
    dispatch(fetchPostRequest());
    request
      .get(`/api/posts/${postId}`)
      .then(response => dispatch(fetchPostSuccess(response.data && response.data.post)))
      .catch((error) => {
        if (error.response && error.response.data) {
          dispatch(fetchPostFailure(error.response.data));
        } else {
          console.log(error);
          dispatch(fetchPostFailure('Unknown error occurred'));
        }
      });
  };
}

export function fetchComments(postId) {
  return (dispatch) => {
    dispatch(fetchCommentsRequest());
    request
      .get(`/api/posts/${postId}/comments`)
      .then(response => dispatch(fetchCommentsSuccess(response.data)))
      .catch((error) => {
        if (error.response && error.response.data) {
          dispatch(fetchCommentsFailure(error.response.data));
        } else {
          console.log(error);
          dispatch(fetchCommentsFailure('Unknown error occurred'));
        }
      });
  };
}

export function fetchReplies(commentId) {
  return (dispatch) => {
    dispatch(fetchRepliesRequest(commentId));
    request
      .get(`/api/comments/${commentId}/replies`)
      .then(response => dispatch(fetchRepliesSuccess(response.data)))
      .catch((error) => {
        if (error.response && error.response.data) {
          dispatch(fetchRepliesFailure(error.response.data, commentId));
        } else {
          console.log(error);
          dispatch(fetchRepliesFailure('Unknown error occurred', commentId));
        }
      });
  };
}

export function createNewReply(commentId, text) {
  return (dispatch) => {
    const token = getToken();

    dispatch(createNewReplyRequest(commentId));
    request
      .create({
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .post(`/api/comments/${commentId}/replies`, {
        text,
      })
      .then(response => dispatch(createNewReplySuccess(response.data)))
      .catch((error) => {
        if (error.response && error.response.data) {
          dispatch(createNewReplyFailure(error.response.data, commentId));
        } else {
          console.log(error);
          dispatch(createNewReplyFailure('Unknown error occurred', commentId));
        }
      });
  };
}

