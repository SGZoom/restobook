import * as actions from '../actions/actions';

export default function reducer(
  state = {
    newCommentText: '',
    post: {},
    comments: [],
    fetchingPost: false,
    fetchingComments: false,
    error: false,
    message: null,
  }, action) {
  let newState;

  switch (action.type) {
    case actions.UPDATE_NEW_COMMENT_TEXT: {
      newState = {
        ...state,
        newCommentText: action.value,
      };
      break;
    }

    case actions.CREATE_NEW_COMMENT_REQUEST: {
      newState = {
        ...state,
        creating: true,
        error: false,
        message: null,
      };
      break;
    }

    case actions.CREATE_NEW_COMMENT_SUCCESS: {
      newState = {
        ...state,
        creating: false,
        fetching: false,
        comments: [action.data.comment, ...state.comments],
        newCommentText: '',
        error: false,
        message: null,
      };
      break;
    }

    case actions.CREATE_NEW_COMMENT_FAILURE: {
      newState = {
        ...state,
        creating: false,
        error: true,
        message: action.payload.message,
      };
      break;
    }

    case actions.FETCH_POST_REQUEST: {
      newState = {
        ...state,
        fetchingPost: true,
      };
      break;
    }

    case actions.FETCH_POST_SUCCESS: {
      newState = {
        ...state,
        post: action.data,
        fetchingPost: false,
      };
      break;
    }

    case actions.FETCH_POST_FAILURE: {
      newState = {
        ...state,
        fetchingPost: false,
        error: true,
        message: action.payload.message,
      };
      break;
    }

    case actions.FETCH_COMMENTS_REQUEST: {
      newState = {
        ...state,
        fetchingComments: true,
      };
      break;
    }

    case actions.FETCH_COMMENTS_SUCCESS: {
      newState = {
        ...state,
        comments: [...action.data.comments],
        fetchingComments: false,
      };
      break;
    }

    case actions.FETCH_COMMENTS_FAILURE: {
      newState = {
        ...state,
        fetchingComments: false,
        error: true,
        message: action.payload.message,
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

