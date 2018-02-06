import React from 'react';
import {setSession} from '../services/SessionService';
import {loginURL} from '../services/urlFactory';
import {searchUser, getProfile, getUsers} from '../services/juiceBarService';
import BaseContainer from './BaseContainer';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import {Card, CardText} from 'material-ui/Card';
import {browserHistory} from 'react-router';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

/**
* Representing the logic of user login function
*/
class Login extends BaseContainer {
  /**
* Class constructor
* @param {Object} props User define component
*/
  constructor(props) {
    super(props);

    this.state = {
      invalid : false,
      user: {
        name: '',
        password: ''
      },
      currentUser: ''
    }

  }
  onConfirm() {

    const currentUser = searchUser(this.state.user.name, this.state.user.password);
    if (currentUser) {
      this.setState({currentUser: getProfile()});

      browserHistory.push('/profile');
    } else {
  this.setState({invalid:true});
    }

  }

  /**
* Event changer for the username
* @param  {String} changeEvent Changer event of the username
*/
  onChangeName(changeEvent) {
    const newName = changeEvent.target.value;
    const user = this.state.user;

    user.name = newName;

    this.setState({user});
  }

  /**
  * Event changer for the password
  * @param  {String} changeEvent Changer event of the password
  */
  onChangePassword(changeEvent) {
    const newPassword = changeEvent.target.value;
    const user = this.state.user;

    user.password = newPassword;

    this.setState({user});
  }

  /**
    Navigate to Registration page
    */
  navigateReg() {
    browserHistory.push('/registration');
  }

  handleClose() {
      this.setState({invalid:false});
  }


  /**
* Describes the elements on the Post page
* @return {String} HTML elements
*/
  render() {
    const onConfirm = this.onConfirm.bind(this);
    const onChangeName = this.onChangeName.bind(this);
    const onChangePassword = this.onChangePassword.bind(this);
    const navigateReg = this.navigateReg.bind(this);
    const handleClose = this.handleClose.bind(this);

    return (<div>
      <Dialog
         modal={false}
         open={this.state.invalid}
          onRequestClose={handleClose}
       >
         Invalied credentials
       </Dialog>
      <Card>
        <CardText>
          <center>Please enter yout login details to proceed</center>
        </CardText>
        <form>
          <div id="textForm">
            <TextField floatingLabelText="Username" onChange={onChangeName}/><br/>
            <TextField floatingLabelText="Password" type="password" onChange={onChangePassword}/>
          </div>
        </form>
        <CardText></CardText>
        <div>
          <div id="cardButton">
            <center>
              <RaisedButton label="Login" onClick={onConfirm} buttonStyle={{
                  borderRadius: 25
                }} style={{
                  borderRadius: 25
                }} labelColor={'#FFFFFF'} backgroundColor={'#00BF9A'}/>
            </center>
          </div>
        </div>

        <div>
          <div id="cardButton">
            <center>
              <RaisedButton label="Create your account" onClick={navigateReg} buttonStyle={{
                  borderRadius: 25
                }} style={{
                  borderRadius: 25
                }} labelColor={'#FFFFFF'} backgroundColor={'#00BF9A'}/>
            </center>
          </div>
        </div>
      </Card>

    </div>);
  }
}

export default Login;
