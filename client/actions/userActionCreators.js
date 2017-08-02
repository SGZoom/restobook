import request from 'axios';
import * as actions from './actions';
import { setToken } from '../utils/authorization';

export function editUserDetails(key, value) {
  return {
    type: actions.EDIT_USER_DETAILS,
    key,
    value,
  };
}

function createUserRequest() {
  return {
    type: actions.CREATE_USER_REQUEST,
  };
}

function createUserSuccess() {
  return {
    type: actions.CREATE_USER_SUCCESS,
  };
}

function createUserFailure(message) {
  return {
    type: actions.CREATE_USER_FAILURE,
    message,
  };
}

export function createUser() {
  return (dispatch, getState) => {
    const { username, password, passwordConfirm } = getState().User;

    dispatch(createUserRequest());
    request
      .post('/api/signup', {
        username,
        password,
        password_confirmation: passwordConfirm,
      })
      .then((response) => {
        const { token } = response.data;
        setToken(token);
        dispatch(createUserSuccess());
        window.location = '/';
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          dispatch(createUserFailure(error.response.data));
        } else {
          dispatch(createUserFailure('Unknown error occurred'));
        }
      });
    return true;
  };
}

function loginUserRequest() {
  return {
    type: actions.LOGIN_USER_REQUEST,
  };
}

function loginUserSuccess() {
  return {
    type: actions.LOGIN_USER_SUCCESS,
  };
}

function loginUserFailure(message) {
  return {
    type: actions.LOGIN_USER_FAILURE,
    message,
  };
}

export function loginUser() {
  return (dispatch, getState) => {
    const { username, password } = getState().User;

    dispatch(loginUserRequest());
    request
      .post('/api/login', {
        username,
        password,
      })
      .then((response) => {
        const { token } = response.data;
        setToken(token);
        dispatch(loginUserSuccess());
        window.location = '/';
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          dispatch(loginUserFailure(error.response.data));
        } else {
          dispatch(loginUserFailure('Unknown error occurred'));
        }
      });
    return true;
  };
}
