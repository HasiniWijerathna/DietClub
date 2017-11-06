import React from 'react';
import {getSession} from '../services/SessionService';
import {modelURL} from '../services/urlFactory';
import BaseContainer from './BaseContainer';
import {browserHistory} from 'react-router';

import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

/**
 * Represents the Edit profile components
 */
class EditProfile extends BaseContainer {
/**
* Validate username
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
        password: '',
        confirmPassword: '',
      },
      formValid: false,
      error: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      focused: {
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
      },
      errorMessage: {
        open: false,
        message: '',
      },
      open: false,
    };
    this.validateAll = this.validateAll.bind(this);
    this.editProfileInfo = this.editProfileInfo.bind(this);
    this.editProfileInfo();
  }
/**
* Event changer for the email
* @param  {String} changeEvent Changer event of the email
*/
  onChangeEmail(changeEvent) {
    const newEmail = `${changeEvent.target.value}`;
    const user = this.state.user;
    const error = this.state.error;
    const emailError = EditProfile.validateEmail(newEmail);

    user.email = newEmail;
    error.email = emailError;

    this.setState({
      formValid: this.validateAll(),
      user,
      error,
    });
  }
  /**
  * Event changer for the name
  * @param  {String} changeEvent Changer event of the username
  */
  onChangeName(changeEvent) {
    const newName = `${changeEvent.target.value}`;
    const user = this.state.user;
    const error = this.state.error;
    const nameError = EditProfile.validateName(newName);

    user.name = newName;
    error.name = nameError;

    this.setState({
      formValid: this.validateAll(),
      user,
      error,
    });
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
    const validationErrors = EditProfile.validatePassword(password, confirmPassword);

    user.password = password;
    error.password = validationErrors.passwordError;
    error.confirmPassword = validationErrors.confirmPasswordError;

    this.setState({
      formValid: this.validateAll(),
      user,
      error,
    });
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
    const validationErrors = EditProfile.validatePassword(password, confirmPassword);

    user.confirmPassword = confirmPassword;
    error.password = validationErrors.passwordError;
    error.confirmPassword = validationErrors.confirmPasswordError;

    this.setState({
      formValid: this.validateAll(),
      user,
      error,
    });
  }

/**
* Validates the user credentials
* @return {Boolean} valied user credentials
*/
  validateAll() {
    return !this.state.error.name && !this.state.error.email &&
      !this.state.error.password && !this.state.error.confirmPassword;
  }
  /**
   * Hides the snackbar
   */
  handleRequestClose() {
    this.setState({
      errorMessage: {
        open: false,
        message: '',
      },
    });
  }
/**
* Checks if the mandotory fields are empty
* @param {String} elementName The selected text field
*/
  setFocus(elementName) {
    const focused = this.state.focused;

    if (!focused[elementName]) {
      focused[elementName] = true;
      this.setState({
        focused,
      });
    }
  }
  /**
   * Handles the alert open
   */
  handleOpenAlert() {
    this.setState({open: true});
  };
 /**
  * Handles the alert close
  */
  handleCloseAlert() {
    this.setState({open: false});
  };
  /**
   * Handles the alert close
   */
  confirmChanges() {
    this.setState({open: false});
    const url = modelURL('user');
    const data = {
      name: this.state.user.name,
      email: this.state.user.email,
      password: this.state.user.password,
    };
    this.makePUTrequest(url, data)
    .then((response) => {
      browserHistory.push('login');
    })
    .catch((error) => {
      this.setState({
        errorMessage: {
          open: true,
          message: 'Oops Something went wrong!',
        },
      });
    });
  };
/**
 * Sends a GET request to user.js
 */
  editProfileInfo() {
    const userId = getSession().user.id;
    const url = modelURL('user', userId);
    this.makeGETRequest(url)
     .then((response) => {
       this.setState({
         user: {
           name: response.name,
           email: response.email,
           password: '',
           confirmPassword: '',
         },

         error: {
           name: EditProfile.validateName(response.name),
           email: EditProfile.validateEmail(response.email),
           password: EditProfile.validatePassword().passwordError,
           confirmPassword: EditProfile.validatePassword().confirmPasswordError,
         },
       });
     })
     .catch((error) => {
       this.setState({
         errorMessage: {
           open: true,
           message: 'Oops Something went wrong!',
         },
       });
     });
  }
/**
 * Describes the HTML elements
 * @return {String} HTML elements
 */
  render() {
    const onChangeName = this.onChangeName.bind(this);
    const onChangeEmail = this.onChangeEmail.bind(this);
    const onChangePassword = this.onChangePassword.bind(this);
    const OnConfirmPassword = this.OnConfirmPassword.bind(this);
    const handleRequestClose = this.handleRequestClose.bind(this);
    const confirmChanges = this.confirmChanges.bind(this);
    const handleOpenAlert = this.handleOpenAlert.bind(this);
    const handleCloseAlert = this.handleCloseAlert.bind(this);

    const onNameFocusOut = this.setFocus.bind(this, 'name');
    const onEmailFocusOut = this.setFocus.bind(this, 'email');
    const onPasswordFocusOut = this.setFocus.bind(this, 'password');
    const OnConfirmPasswordFocusOut = this.setFocus.bind(this, 'confirmPassword');

    const actions = [
      <FlatButton
        label="Confirm"
        primary={true}
        onTouchTap={confirmChanges}
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={handleCloseAlert}
      />,
    ];

    return (
      <div>
        <div>
          <Dialog
            actions={actions}
            modal={true}
            open={this.state.open}
            >
         Confirm profile changes
       </Dialog>
        </div>
        <div>
          <Snackbar
            open={this.state.errorMessage.open}
            message={this.state.errorMessage.message}
            autoHideDuration={4000}
            onRequestClose={handleRequestClose}
            />
          <hgroup>
            <Card>
              <CardHeader/>
              <form>
                <formgroup>
                  <h3>Edit your basic account information</h3>
                </formgroup>
                <img className="logo" alt="loginlogo"/>
                <CardActions>
                  <div>
                    <TextField
                      id = "1"
                      value={this.state.user.name}
                      errorText={this.state.focused.name && this.state.error.name}
                      onChange={onChangeName}
                      onBlur={onNameFocusOut}
                    />
                  </div>
                  <div>
                    <TextField
                      id="2"
                      value={this.state.user.email}
                      errorText={this.state.focused.email && this.state.error.email}
                      onChange={onChangeEmail}
                      onBlur={onEmailFocusOut}
                    />
                  </div>
                  <div>
                    <TextField
                      id="3"
                      floatingLabelText="Change your password"
                      value={this.state.user.password}
                      errorText={this.state.focused.password && this.state.error.password}
                      type="password"
                      onChange={onChangePassword}
                      onBlur={onPasswordFocusOut}
                    />
                  </div>
                  <div>
                    <TextField
                      id="4"
                      floatingLabelText="Confirm new Password"
                      value={this.state.user.confirmPassword}
                      errorText={this.state.focused.confirmPassword && this.state.error.confirmPassword}
                      type="password"
                      onChange={OnConfirmPassword}
                      onBlur={OnConfirmPasswordFocusOut}
                      />
                  </div>
                </CardActions>
                <div>
                  <RaisedButton
                    label="Submit changes"
                    disabled={!this.state.formValid}
                    onClick={handleOpenAlert} /></div>
              </form>
              <CardText ></CardText>
              <section id="global-header">
                <div className="container">
                  <div className="row">
                    <div className="col-md-11">
                      <div className="block">
                        <h3>Find and share real perspectives about topics that matter today</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </Card>
          </hgroup>
        </div>
      </div>
    );
  }
}
export default EditProfile;
