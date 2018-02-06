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
import {blue500, red500, grey50} from 'material-ui/styles/colors';
import MediaQuery from 'react-responsive';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';

import FileFolder from 'material-ui/svg-icons/file/folder';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import {yellow600} from 'material-ui/styles/colors';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';
import ActionInfo from 'material-ui/svg-icons/action/info';


import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Search from 'material-ui/svg-icons/action/search';
import ShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
import ViewHeadline from 'material-ui/svg-icons/action/view-headline';
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
  navaigateToHome() {
    browserHistory.push('/');
    this.setState({open: false});
  }

  /**
   * Handle the drawer button event
   */
  handleToggle() {
    this.setState({open: true});
  }

  /**
   * Handle the drawer  event
   */
  handleClose() {
    this.setState({open: false});
  }

  /**
   * Navigates to the deals page
   */
  navaigateToDeals() {
    browserHistory.push('/deals');
    this.setState({open: false});
  }

  /**
   * Navigates to the newsletters page
   */
  navaigateToNewsletters() {
    browserHistory.push('/newsletters');
    this.setState({open: false});
  }

  /**
   * Navigates to the favorites page
   */
  navaigateTofavorites() {
    browserHistory.push('/favorites');
    this.setState({open: false});
  }

  /**
   * Navigates to the about us page
   */
  navaigateToAboutUs() {
    browserHistory.push('/aboutUs');
    this.setState({open: false});
  }

  /**
   * Navigates to the spot it game page
   */
  navaigateToSpotIt() {
    browserHistory.push('/spotIt');
    this.setState({open: false});
  }

  /**
   * Navigates to the QR code generation
   */
  navaigateToQRCode() {
    browserHistory.push('/QRCodeGenerator');
    this.setState({open: false});
  }

  /**
   * Navigates to the settings page
   */
  navaigateToSettings() {
    browserHistory.push('/settings');
    this.setState({open: false});
  }

  /**
   * Navigates to the place order page
   */
  navaigateToPlaceOrder() {
    browserHistory.push('/placeOrder');
    this.setState({open: false});
  }

  /**
   * Navigates to the events page
   */
  navaigateToEvents() {
    browserHistory.push('/events');
    this.setState({open: false});
  }

  /**
   * Navigates to the map view page
   */
  navaigateToMapView() {
    browserHistory.push('/mapViewBranches');
    this.setState({open: false});
  }

  /**
   * Navigates to the menu view page
   */
  navaigateToMenu() {
    browserHistory.push('/menu');
    this.setState({open: false});
  }

  /**
   * Navigates to the menu view page
   */
  navaigateToProfile() {
    browserHistory.push('/profile');
    this.setState({open: false});
  }


  /**
  * Describes the elements on the registration page
  * @return {String} HTML elements
  */
  render() {
    const authenticated = getSession().authenticated;
    const signOut = this.signOut.bind(this);
    const handleToggle = this.handleToggle.bind(this);
    const handleClose = this.handleClose.bind(this);

    const navaigateToDeals = this.navaigateToDeals.bind(this);
    const navaigateToSpotIt = this.navaigateToSpotIt.bind(this);
    const navaigateToMenu = this.navaigateToMenu.bind(this);
    const navaigateToAboutUs = this.navaigateToAboutUs.bind(this);
    const navaigateToPlaceOrder = this.navaigateToPlaceOrder.bind(this);
    const navaigateToQRCode = this.navaigateToQRCode.bind(this);
    const navaigateToSettings = this.navaigateToSettings.bind(this);
    const navaigateToHome = this.navaigateToHome.bind(this);
    const navaigateToEvents = this.navaigateToEvents.bind(this);
    const navaigateToNewsletters = this.navaigateToNewsletters.bind(this);
    const navaigateToMapView = this.navaigateToMapView.bind(this);
    const navaigateToProfile = this.navaigateToProfile.bind(this);

    const headerContainerStyle = {
      backgroundColor: '#00BF9A'
    };

    const toolbar = {
      height: '80px',
      background: '#00BF9A'
    }

    let open = this.state.open;

    return (
      <div style={headerContainerStyle}>
        <Toolbar style={toolbar}>
      <ToolbarGroup firstChild={true} float="left">
        <Drawer docked={false} open={open} onRequestChange={handleClose} disableSwipeToOpen>
          <MenuItem onClick={navaigateToHome}>Home</MenuItem>
          <MenuItem onClick={navaigateToMenu}>Menu</MenuItem>
          <MenuItem onClick={navaigateToDeals}>Promos</MenuItem>
          <MenuItem onClick={navaigateToEvents}>Events</MenuItem>
          <MenuItem onClick={navaigateToNewsletters}>Newsletters</MenuItem>
          <MenuItem onClick={navaigateToMapView}>Find Us map
          </MenuItem>
          <MenuItem onClick={navaigateToAboutUs}>About Us</MenuItem>
          <MenuItem onClick={navaigateToSpotIt}>Spot it</MenuItem>
          <MenuItem onClick={navaigateToPlaceOrder}>Place Order</MenuItem>
          <MenuItem onClick={navaigateToQRCode}>Scan It</MenuItem>
          <MenuItem onClick={navaigateToProfile}>Profile</MenuItem>
        </Drawer>
        <div>
          <IconButton onClick={handleToggle}>
            <ViewHeadline  color='black' hoverColor={grey50} onClick={handleToggle}/>
          </IconButton>
        </div>
      </ToolbarGroup>

      <ToolbarGroup style={{
          float       : 'none',
          width       : '100px',
          marginLeft  : 'auto',
          marginRight : 'auto',
          paddingBottom: '10px'
      }}>
          <img src="http://www.freelogoservices.com/api/main/images/1j+ojl1FOMkX9WypfBe43D6kjfCGqRFInRnJwXs1M3EMoAJtlSEuhvVu9v4z" alt="Logo is down" width="110" height="65"/>
      </ToolbarGroup>

      <ToolbarGroup lastChild={true} float="right">
        <IconButton>
          
      </IconButton>

      </ToolbarGroup>
  </Toolbar>

      </div>

)
  }
}

export default HeaderBar;
