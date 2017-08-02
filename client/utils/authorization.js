const fetchUserToken = () => {
  const store = window.localStorage;
  if (!store) {
    // TODO: Handle this shit :P
    return null;
  }
  return store.getItem('token');
};

export const requireAuthentication = (nextState, replace) => {
  // return true;
  const token = fetchUserToken();
  if (!token) {
    replace({
      pathname: '/login',
    });
  }
};

export const redirectIfAuthenticated = (nextState, replace) => {
  // return true;
  const token = fetchUserToken();
  if (token) {
    replace({
      pathname: '/',
    });
  }
};

export const setToken = (token) => {
  const store = window.localStorage;
  if (!store) {
    return null;
  }
  return store.setItem('token', token);
};


export const purgeToken = () => {
  const store = window.localStorage;
  if (!store) {
    return null;
  }
  return store.removeItem('token');
};

export const getToken = fetchUserToken;
