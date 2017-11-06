import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {getSession, isAuthenticated, resetSession} from '../services/SessionService';
import {Link} from 'react-router';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
/**
 * Representing the header bar
 */
class HeaderBar extends Component {
/**
  * Class constructor
  * @param {Object} props User define component
  */
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    };
  }
/**
 * [description]
 * @param  {[type]} event [description]
 * @param  {[type]} index [description]
 * @param  {[type]} value [description]
 */
  handleChange(event, index, value) {
    this.setState({value});
  }

/**
 *Navigates to the login page
 */
  login() {
    browserHistory.push('/login');
  }
/**
 * Sets the authenticated false and navigates to the home page
 */
  signOut() {
    resetSession();
    isAuthenticated() === false;
    browserHistory.push('/');
  }
  /**
   * Navigates to the home page
   */
  navaigateHome() {
    browserHistory.push('/');
  }
/**
 * Navigate to the blogs page
 */
  navaigateBlogs() {
    browserHistory.push('/blogs');
  }
/**
 * Navigate to the about us page
 */
  navaigateAboutUs() {
    browserHistory.push('/aboutUs');
  }
/**
 * Navigate to the about us page
 */
  navigateProfile() {
    browserHistory.push('/UserProfile');
  }
  /**
   * Navigate to the settings page
   */
  navigateSettings() {
    browserHistory.push('/settings');
  }
  /**
   * Navigate to the home page
   */
  navigateHome() {
    browserHistory.push('/');
  }
  /**
   * Navigate to the home page
   */
  navigateHelp() {
    browserHistory.push('/help');
  }
  /**
  * Describes the elements on the registration page
  * @return {String} HTML elements
  */
  render() {
    const authenticated = getSession().authenticated;
    const navigateProfile = this.navigateProfile.bind(this);
    const navigateSettings = this.navigateSettings.bind(this);
    const signOut = this.signOut.bind(this);
    const navigateHome = this.navigateHome.bind(this);
    const navigateHelp = this.navigateHelp.bind(this);
    let container = <div className="container">
      <div className="row">
        <div className="col-12">
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <a className="navbar-brand">
                  <img className="logo" alt="Logo" onClick={navigateHome}/>
                </a>
              </div>
              <div className="navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav navbar-right">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/blogs">Blogs</Link></li>
                  <li><Link to="/aboutUs">About Us</Link></li>
                  <li><Link to="/login">Login</Link></li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>;
    if (authenticated) {
      container = <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <a className="navbar-brand">
                    <img className="logo" alt="Logo" onClick={navigateHome}/>
                  </a>
                </div>
                <div className="navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul className="nav navbar-nav navbar-right">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/blogs">Blogs</Link></li>
                    <li><Link to="/aboutUs">About Us</Link></li>
                    <li><a onClick={signOut} >Sign out</a></li>
                    <li><IconMenu
                         iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                         anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                         targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    >
                      <MenuItem primaryText="Profile" onClick={navigateProfile} />
                      <MenuItem primaryText="Help" onClick={navigateHelp} disabled/>
                      <MenuItem primaryText="Settings" onClick={navigateSettings} disabled/>
                    </IconMenu>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>;
    }
    return (
      <div>
        <header>
          {container}
        </header>
      </div>
    );
  }
}

export default HeaderBar;
