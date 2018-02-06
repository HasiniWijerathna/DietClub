import React from 'react';
import {browserHistory} from 'react-router';
import {setSession} from '../services/SessionService';
import {post} from '../services/Requests';
import {registerURL} from '../services/urlFactory';
import BaseContainer from './BaseContainer';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Popup from 'react-popup';
import Snackbar from 'material-ui/Snackbar';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {getnewUserId, getProfile, getUsers} from '../services/juiceBarService';
/**
 * Representing the logic of user registration
 */
class Registration extends BaseContainer {
  /**
  * Validate username
  * @param  {String} username The username
  * @return {String}      Relevent error of the incorrect username
  */
  static validateUsername(username = '') {
    let error = null;

    if (!username || username.length === 0) {
      error = 'username is required';
    } else if (username.length < 6) {
      error = 'username should be atleast with 6 characters';
    }

    return error;
  }
  /**
* Validate name
* @param  {String} name The username
* @return {String}      Relevent error of the incorrect username
*/
  static validateName(name = '') {
    let error = null;

    if (!name || name.length === 0) {
      error = 'Name is required';
    } else if (name.length < 6) {
      error = 'Name should be atleast with 6 characters';
    }

    return error;
  }

  /**
 * validate email
 * @param  {String} email The email
 * @return {String}       Relevent error of the incorrect email
 */
  static validateEmail(email = '') {
    let error = null;

    if (!email || email.length === 0) {
      error = 'Email is required';
    } else if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      error = 'Invalid email address';
    }

    return error;
  }

  /**
* Validate password
* @param  {String} password        The password
* @param  {String} confirmPassword The confirmPassword

* @return {String}          Relevent error of the incorrect password
*/
  static validatePassword(password = '', confirmPassword = '') {
    let passwordError = null;
    let confirmPasswordError = null;

    if (!password || password.length === 0) {
      passwordError = 'Password is required';
    } else if (password.length < 6) {
      passwordError = 'Password must contain atleast 6 characters';
    }

    if (password !== confirmPassword) {
      confirmPasswordError = 'Confirm password does not match';
    }

    return {passwordError, confirmPasswordError};
  }

  /**
* Class constructor
* @param {Object} props User define component
*/
  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: '',
        name: '',
        email: '',
        image: '',
        password: '',
        confirmPassword: ''
      },
      formValid: false,
      error: {
        username: Registration.validateUsername(),
        name: Registration.validateName(),
        email: Registration.validateEmail(),
        password: Registration.validatePassword().passwordError,
        confirmPassword: Registration.validatePassword().confirmPasswordError
      },
      focused: {
        username: false,
        name: false,
        email: false,
        password: false,
        confirmPassword: false
      },
      errorMessage: {
        open: false,
        message: ''
      }
    };

    this.validateAll = this.validateAll.bind(this);
  }

  /**
* Event changer for the username
* @param  {String} changeEvent Changer event of the username
*/
  onChangeUsername(changeEvent) {
    const username = `${changeEvent.target.value}`;
    const user = this.state.user;
    const error = this.state.error;
    const usernameError = Registration.validateUsername(username);

    user.username = username;
    error.username = usernameError;
    this.setState({formValid: this.validateAll(), user, error});
  }

  /**
  * Event changer for the name
  * @param  {String} changeEvent Changer event of the username
  */
  onChangeName(changeEvent) {
    const newName = `${changeEvent.target.value}`;
    const user = this.state.user;
    const error = this.state.error;
    const nameError = Registration.validateName(newName);

    user.name = newName;
    error.name = nameError;

    this.setState({formValid: this.validateAll(), user, error});
  }

  /**
* Event changer for the email
* @param  {String} changeEvent Changer event of the email
*/
  onChangeEmail(changeEvent) {
    const newEmail = `${changeEvent.target.value}`;
    const user = this.state.user;
    const error = this.state.error;
    const emailError = Registration.validateEmail(newEmail);

    user.email = newEmail;
    error.email = emailError;

    this.setState({formValid: this.validateAll(), user, error});
  }

  /**
* Event changer for the image
* @param  {String} changeEvent Changer event of the email
*/
  onChangeImage(changeEvent) {
    const newImage = `${changeEvent.target.value}`;
    const user = this.state.user;

    user.image = newImage;

    this.setState({user});
  }

  /**
* Event changer for the password
* @param  {String} changeEvent Changer event of the password
*/
  onChangePassword(changeEvent) {
    const password = changeEvent.target.value;
    const user = this.state.user;
    const confirmPassword = `${user.confirmPassword}`;
    const error = this.state.error;
    const validationErrors = Registration.validatePassword(password, confirmPassword);

    user.password = password;
    error.password = validationErrors.passwordError;
    error.confirmPassword = validationErrors.confirmPasswordError;

    this.setState({formValid: this.validateAll(), user, error});
  }

  /**
* Sends a POST Request to register the user
*/
  onConfirm() {
    const data = {
      username: this.state.user.username,
      name: this.state.user.name,
      email: this.state.user.email,
      password: this.state.user.password
    };

   let results = localStorage.getItem('users');
   let user = localStorage.getItem('user');
   let users = JSON.parse(results);
    const newProfile = {
      id: getnewUserId(),
      name: this.state.user.name,
      userName: this.state.user.username,
      password: this.state.user.password,
      email: this.state.user.email,
      image: this.state.user.image ? this.state.user.image : 'http://animalnewyork.com/wp-content/uploads/sad-facebook.jpg' ,
      points: 0,
      favePeople: [],
      favBranches: [],
      faveNews: [],
      faveEvent: [],
      cartItems: []
    }

    users.push(newProfile);
    localStorage.setItem('users', JSON.stringify(users));
    console.log(JSON.parse(localStorage.getItem('users')));
    localStorage.setItem('user', JSON.stringify(newProfile));
    console.log(JSON.parse(localStorage.getItem('user')));
    browserHistory.push('/profile');


  // getUsers();
  // localStorage.setItem('users', JSON.stringify(getUsers()));
  // localStorage.setItem('user', JSON.stringify(newProfile));
  // let results = localStorage.getItem('users');
  // let resultsUser = localStorage.getItem('user');
  // let users = JSON.parse(results);
  // let user = JSON.parse(resultsUser);
  // console.log(users);
  // console.log(user);
  // users.push(newProfile);
  // console.log(users);
  }

  /**
* Checks if the mandotory fields are empty
* @param {String} elementName The selected text field
*/
  setFocus(elementName) {
    const focused = this.state.focused;

    if (!focused[elementName]) {
      focused[elementName] = true;
      this.setState({focused});
    }
  }

  /**
* Checks the password with the confirmPassword
* @param {Event} changeEvent The confirm password
*/
  OnConfirmPassword(changeEvent) {
    const confirmPassword = changeEvent.target.value;
    const user = this.state.user;
    const password = user.password;
    const error = this.state.error;
    const validationErrors = Registration.validatePassword(password, confirmPassword);

    user.confirmPassword = confirmPassword;
    error.password = validationErrors.passwordError;
    error.confirmPassword = validationErrors.confirmPasswordError;

    this.setState({formValid: this.validateAll(), user, error});
  }

  /**
* Validates the user credentials
* @return {Boolean} valied user credentials
*/
  validateAll() {
    return !this.state.error.name && !this.state.error.email && !this.state.error.password && !this.state.error.confirmPassword;
  }

  /**
   * Hides the snackbar
   */
  handleRequestClose() {
    this.setState({
      errorMessage: {
        open: false,
        message: ''
      }
    });
  }

  /**
* Describes the elements on the registration page
* @return {String} HTML elements
*/
  render() {
    const onChangeName = this.onChangeName.bind(this);
    const onChangeUsername = this.onChangeUsername.bind(this);
    const onChangeImage = this.onChangeImage.bind(this);
    const onChangeEmail = this.onChangeEmail.bind(this);
    const onChangePassword = this.onChangePassword.bind(this);
    const OnConfirmPassword = this.OnConfirmPassword.bind(this);
    const handleRequestClose = this.handleRequestClose.bind(this);
    const onConfirm = this.onConfirm.bind(this);

    const onUsernameFocusOut = this.setFocus.bind(this, 'username');
    const onNameFocusOut = this.setFocus.bind(this, 'name');
    const onEmailFocusOut = this.setFocus.bind(this, 'email');
    const onPasswordFocusOut = this.setFocus.bind(this, 'password');
    const OnConfirmPasswordFocusOut = this.setFocus.bind(this, 'confirmPassword');

    return (<div>
      <Card>
        <CardText>
          <center>Please enter yout login details to proceed</center>
        </CardText>
        <form>
          <div id="textForm">
            <TextField floatingLabelText="Username" onChange={onChangeUsername} value={this.state.user.username} errorText={this.state.focused.username && this.state.error.username} onBlur={onUsernameFocusOut}/><br/>
          </div>
          <div id="textForm">
            <TextField floatingLabelText="Name" onChange={onChangeName} value={this.state.user.name} errorText={this.state.focused.name && this.state.error.name} onBlur={onNameFocusOut}/><br/>
          </div>
          <div id="textForm">
            <TextField floatingLabelText="Eamil" onChange={onChangeEmail} value={this.state.user.email} errorText={this.state.focused.email && this.state.error.email} onBlur={onEmailFocusOut}/><br/>
          </div>
          <div id="textForm">
            <TextField floatingLabelText="Profile image URL" onChange={onChangeImage} value={this.state.user.image}/><br/>
          </div>
          <div id="textForm">
            <TextField floatingLabelText="Password" type="password" onChange={onChangePassword} value={this.state.user.password} errorText={this.state.focused.password && this.state.error.password} onBlur={onPasswordFocusOut}/><br/>
          </div>
          <div id="textForm">
            <TextField floatingLabelText="Confirm Password" type="password" onChange={OnConfirmPassword} value={this.state.user.confirmPassword} errorText={this.state.focused.confirmPassword && this.state.error.confirmPassword} onBlur={OnConfirmPasswordFocusOut}/><br/>
          </div>
        </form>
        <CardText></CardText>
        <div></div>

        <div>
          <div id="cardButton">
            <center>
              <RaisedButton label="Create Account" buttonStyle={{
                  borderRadius: 25
                }} style={{
                  borderRadius: 25
                }} labelColor={'#FFFFFF'} backgroundColor={'#00BF9A'} onClick={onConfirm} disabled={!this.state.formValid}/>
            </center>
          </div>
        </div>
      </Card>
    </div>);
  }
}
export default Registration;
