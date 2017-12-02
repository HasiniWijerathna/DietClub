import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import '../styles/master.scss';

import {isAuthenticated} from './services/SessionService';

import App from './containers/App';
import Home from './containers/Home';
import Deals from './containers/Deals';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const requireAuth = (nextState, replace) => {
  const authenticated = isAuthenticated();

  if (!authenticated) {
    replace({
      pathname: '/login',
      state: {nextPathname: nextState.location.pathname},
    });
  }
};

const checkAuth = (nextState, replace) => {
  const authenticated = isAuthenticated();

  if (authenticated) {
    replace({
      pathname: '/',
    });
  }
};

render(
  (<Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="deals" component={Deals} />
    </Route>
  </Router>), document.getElementById('root')
);
