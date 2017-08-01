import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import FeedContainer from './containers/Feed';
import ProfileContainer from './containers/Profile';
import PostContainer from './containers/Post';

import store from './store';

const APP_CONTAINER_NAME = 'app-container';

const App = () => (
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={FeedContainer} />
        <Route
          path="/user/:user_id"
          component={ProfileContainer}
        />
        <Route
          path="/post/:post_id"
          component={PostContainer}
        />
      </div>
    </Router>
  </Provider>
);

window.addEventListener('DOMContentLoaded', () => {
  let appContainer = document.getElementById(APP_CONTAINER_NAME);

  if (!appContainer) {
    appContainer = document.createElement('DIV');
    appContainer.id = APP_CONTAINER_NAME;
    document.body.appendChild(appContainer);
  }

  render(<App />, appContainer);
});
