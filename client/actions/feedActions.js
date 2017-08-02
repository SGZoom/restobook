import request from 'axios';
import * as actions from './actions';
import { getToken } from '../utils/authorization';

export function updateNewPostText(value) {
  return {
    type: actions.UPDATE_NEW_POST_TEXT,
    value,
  };
}

export function emittedNewPost() {
  return {
    type: actions.UNSET_POST_CREATED_FLAG,
  };
}

export function showNewPostsAlert() {
  return {
    type: actions.SHOW_ALERT,
  };
}

export function refreshTimeStamps() {
  return {
    type: actions.UPDATE_POST_TIMESTAMP,
  };
}

function createNewPostRequest() {
  return {
    type: actions.CREATE_NEW_POST_REQUEST,
  };
}

function createNewPostSuccess(data) {
  return {
    type: actions.CREATE_NEW_POST_SUCCESS,
    data,
  };
}

function createNewPostFailure(response) {
  return {
    type: actions.CREATE_NEW_POST_FAILURE,
    payload: {
      message: response,
    },
  };
}

export function createNewPost() {
  return (dispatch, getState) => {
    const token = getToken();
    const { newPostText } = getState().Feed;
    dispatch(createNewPostRequest());

    request
      .create({
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .post('/api/posts', {
        text: newPostText,
      })
      .then(response => dispatch(createNewPostSuccess(response.data)))
      .catch((error) => {
        if (error.response && error.response.data) {
          dispatch(createNewPostFailure(error.response.data));
        } else {
          console.log(error);
          dispatch(createNewPostFailure('Unknown error occurred'));
        }
      });
  };
}

function fetchPostsRequest() {
  return {
    type: actions.FETCH_POSTS_REQUEST,
  };
}

function fetchPostsSuccess(data) {
  return {
    type: actions.FETCH_POSTS_SUCCESS,
    payload: data.posts,
  };
}

function fetchPostsFailure(response) {
  return {
    type: actions.FETCH_POSTS_FAILURE,
    payload: {
      message: response,
    },
  };
}

export function fetchPosts(author) {
  const authorQuery = author ? `&author=${author}` : '';

  return (dispatch) => {
    dispatch(fetchPostsRequest());
    request
      .get(`/api/posts?max_time=${Date.now()}${authorQuery}`)
      .then(response => dispatch(fetchPostsSuccess(response.data)))
      .catch((error) => {
        if (error.response && error.response.data) {
          dispatch(fetchPostsFailure(error.response.data));
        } else {
          console.log(error);
          dispatch(fetchPostsFailure('Unknown error occurred'));
        }
      });
  };
}
