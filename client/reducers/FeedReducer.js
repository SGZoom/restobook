import * as actions from '../actions/actions';

export default function reducer(
  state = {
    newPostText: '',
    posts: [],
    fetching: false,
    creating: false,
    error: false,
    message: null,
  }, action) {
  let newState;

  switch (action.type) {
    case actions.UPDATE_NEW_POST_TEXT: {
      newState = {
        ...state,
        newPostText: action.value,
      };
      break;
    }

    case actions.CREATE_NEW_POST_REQUEST: {
      newState = {
        ...state,
        creating: true,
        error: false,
        message: null,
      };
      break;
    }

    case actions.CREATE_NEW_POST_SUCCESS: {
      newState = {
        ...state,
        creating: false,
        fetching: false,
        posts: [action.data, ...state.posts],
        newPostText: '',
        error: false,
        message: null,
      };
      break;
    }

    case actions.CREATE_NEW_POST_FAILURE: {
      newState = {
        ...state,
        creating: false,
        error: true,
        message: action.payload.message,
      };
      break;
    }

    case actions.FETCH_POSTS_REQUEST: {
      newState = {
        ...state,
        fetching: true,
        error: false,
        message: null,
      };
      break;
    }

    case actions.FETCH_POSTS_SUCCESS: {
      newState = {
        ...state,
        fetching: false,
        posts: [
          ...action.payload,
        ],
        error: false,
        message: null,
      };
      break;
    }

    case actions.FETCH_POSTS_FAILURE: {
      newState = {
        ...state,
        fetching: false,
        error: true,
        message: action.payload,
      };
      break;
    }

    case actions.CREATE_POST_REQUEST: {
      newState = {
        ...state,
        creating: true,
      };
      break;
    }

    case actions.CREATE_POST_SUCCESS: {
      newState = {
        ...state,
        creating: false,
        posts: [action.payload, ...state.posts],
      };
      break;
    }

    case actions.CREATE_POST_FAILURE: {
      newState = {
        ...state,
        creating: false,
        error: true,
        message: action.payload,
      };
      break;
    }

    case actions.UPDATE_POST_TIMESTAMP: {
      newState = {
        ...state,
        posts: [...state.posts],
      };
      break;
    }

    default: {
      newState = {
        ...state,
      };
    }
  }

  return newState;
}
