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
import Newsletters from './containers/Newsletters';
import Favorites from './containers/Favorites';
import SpotIt from './containers/SpotIt';
import Menu from './containers/Menu';
import AboutUs from './containers/AboutUs';
import MyOrders from './containers/MyOrders';
import Rewards from './containers/Rewards';
import QRCode from './containers/QRCode';
import Settings from './containers/Settings';
import PlaceOrder from './containers/PlaceOrder';
import Events from './containers/Events';
import MapViewBranches from './containers/MapViewBranches';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const requireAuth = (nextState, replace) => {
  const authenticated = isAuthenticated();

  if (!authenticated) {
    replace({
      pathname: '/login',
      state: {
        nextPathname: nextState.location.pathname
      }
    });
  }
};

const checkAuth = (nextState, replace) => {
  const authenticated = isAuthenticated();

  if (authenticated) {
    replace({pathname: '/'});
  }
};

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="deals" component={Deals}/>
      <Route path="newsletters" component={Newsletters}/>
      <Route path="favorites" component={Favorites}/>
      <Route path="spotIt" component={SpotIt}/>
      <Route path="menu" component={Menu}/>
      <Route path="aboutUs" component={AboutUs}/>
      <Route path="myOrders" component={MyOrders}/>
      <Route path="rewards" component={Rewards}/>
      <Route path="QRCode" component={QRCode}/>
      <Route path="settings" component={Settings}/>
      <Route path="placeOrder" component={PlaceOrder}/>
      <Route path="events" component={Events}/>
      <Route path="mapViewBranches" component={MapViewBranches}/>
    </Route>
  </Router>
), document.getElementById('root'));
