import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import '../styles/master.scss';

import {isAuthenticated} from './services/SessionService';

import App from './containers/App';
import BlogsHomePage from './containers/BlogsHomePage';
import BlogPage from './containers/BlogPage';
import PostPage from './containers/PostPage';
import AddNewPost from './containers/AddNewPost';
import AddNewBlog from './containers/AddNewBlog';
import Home from './containers/Home';
import Login from './containers/Login';
import Registration from './containers/Registration';
import AboutUs from './containers/AboutUs';
import EditProfile from './containers/EditProfile';
import Settings from './containers/Settings';
import EditPost from './containers/EditPost';
import Help from './containers/Help';
import AllBlogs from './containers/AllBlogs';
import BlogCategory from './containers/BlogCategory';
import UserProfile from './containers/UserProfile';

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
      <Route path="editProfile" component={EditProfile} />
      <Route path="settings" component={Settings}/>
      <Route path="aboutUs" component={AboutUs} />
      <Route path="help" component={Help} />
      <Route path="userProfile" component={UserProfile} />
      <Route path="allBlogs" component={AllBlogs} />
      <Route path="login" component={Login} onEnter={checkAuth} />
      <Route path="registration" component={Registration} onEnter={checkAuth} />
      <Route path="blogs" component={BlogsHomePage} />
      <Route path="blogs/new" component={AddNewBlog} onEnter={requireAuth} />
      <Route path="blogs/category/:categoryId" component={BlogCategory} />
      <Route path="blogs/:blogId" component={BlogPage} />
      <Route path="blogs/:blogId/posts/new" component={AddNewPost} onEnter={requireAuth} />
      <Route path="blogs/:blogId/posts/:postId/editPost" component={EditPost} />
      <Route path="blogs/:blogId/posts/:postId" component={PostPage} />
    </Route>
  </Router>), document.getElementById('root')
);
