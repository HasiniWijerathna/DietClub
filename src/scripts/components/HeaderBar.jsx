import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {getSession, isAuthenticated, resetSession} from '../services/SessionService';
import {Link} from 'react-router';

import IconMenu from 'material-ui/IconMenu';

import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import ActionViewHeadline from 'material-ui/svg-icons/action/view-headline';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

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
      value: 1
    };
    this.state = {
      open: false
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

  handleToggle() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

  /**
  * Describes the elements on the registration page
  * @return {String} HTML elements
  */
  render() {
    const stylesDrawer = {
      backgroundColor: '#364150'
    };

    const headerContainerStyle = {
      backgroundColor: '#00BF9A'
    };

    const authenticated = getSession().authenticated;
    const signOut = this.signOut.bind(this);
    const handleToggle = this.handleToggle.bind(this);
    const handleClose = this.handleClose.bind(this);
    // const navigateDeals = this.navigateDeals.bind(this);

    let open = this.state.open;
    let container = <div className="container">
      <div className="row">
        <div className="col-12">
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header"></div>
              <div className="navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav navbar-right">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
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
                <div className="navbar-header"></div>
                <div className="navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul className="nav navbar-nav navbar-right">
                    <li>
                      <a onClick={signOut}>Sign out</a>
                    </li>
                    <li>
                      <IconMenu iconButtonElement={< IconButton > <MoreVertIcon/> < /IconButton>} anchorOrigin={{
                        horizontal: 'left',
                        vertical: 'top'
                      }} targetOrigin={{
                        horizontal: 'left',
                        vertical: 'top'
                      }}>
                        <MenuItem primaryText="Profile"/>
                        <MenuItem primaryText="Help" disabled/>
                        <MenuItem primaryText="Settings" disabled/>
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
      <div style={headerContainerStyle}>
        <Drawer docked={false} open={open} onRequestChange={handleClose} containerStyle={{
        }} disableSwipeToOpen>
          <MenuItem>Home</MenuItem>
          <MenuItem disabled={true}>Menu</MenuItem>
          <MenuItem >Snaks</MenuItem>
          <MenuItem >Promos</MenuItem>
          <MenuItem >Events</MenuItem>
          <MenuItem >Newsletters</MenuItem>
          <MenuItem >Find Us</MenuItem>
          <MenuItem >About Us</MenuItem>
        </Drawer>

        <IconButton style={{
          backgroundColor: '#00BF9A', color={red500} hoverColor={greenA200}
        }} onClick={handleToggle}>
          <ActionViewHeadline/>
        </IconButton>

        <HomeIcon style={iconStyles} color={red500} hoverColor={greenA200} />
      </div>
    )
  }
}

export default HeaderBar;
