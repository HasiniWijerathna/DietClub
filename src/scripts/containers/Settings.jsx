import React from 'react';
import BaseContainer from './BaseContainer';
import TextField from 'material-ui/TextField';
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card';
import {getUsers, getProfile} from '../services/juiceBarService';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {browserHistory} from 'react-router';
/**
* Represents the view logic
*/
class Settings extends BaseContainer {
/**
* Class constructor
* @param {Object} props User define component
*/
constructor(props) {
  const results = localStorage.getItem('user');
  let user = JSON.parse(results);
  super(props);

  this.state = {
    users: getUsers(),
    currentuser: user,
    open: false
  };
}
handleOpen() {
   this.setState({open: true});

 };

 handleClose() {
   setTimeout(function () {
 browserHistory.push('/');
}, 500);
   this.setState({open: false});
 };
  /**
* Describes the elements on the About Us page
* @return {String} HTML elements
*/
  render() {
    const handleOpen = this.handleOpen.bind(this);
    const handleClose = this.handleClose.bind(this);
    const headerContainerStyle = {
      backgroundColor: '#00BF9A'
    };
    const actions = [
     <FlatButton
       label="Cancel"
       primary={true}
       onClick={handleClose}
     />,
     <FlatButton
       label="Confirm"
       primary={true}
       keyboardFocused={true}
       onClick={handleClose}
     />,
   ];

    console.log(this.state.currentuser);
    return (
      <div>
        <Dialog
         title="Are you sure you want to save?"
         actions={actions}
         modal={false}
         open={this.state.open}
         onRequestClose={this.handleClose}
       >
        Your credentials will be changed
       </Dialog>
        <div  id="settingsHead" style={headerContainerStyle}>
          <center>
            SETTINGS
          </center>
        </div>
      <div id="settings">
      <TextField defaultValue={this.state.currentuser.name}/><br/>
      <TextField defaultValue={this.state.currentuser.userName}/><br/>
      <TextField defaultValue={this.state.currentuser.email}/><br/>
      <TextField defaultValue={this.state.currentuser.password} type="password"/><br/>
      </div>
      <div id="settingsButton">
        <center>
      <RaisedButton
        label="Save Changes"
        onClick={handleOpen}
        buttonStyle={{ borderRadius: 25 }}
        style={{ borderRadius: 25 }}
        labelColor={'#FFFFFF'}
        backgroundColor={'#00BF9A'}
      />
    </center>
  </div>

    </div>);
  }
}

export default Settings;
