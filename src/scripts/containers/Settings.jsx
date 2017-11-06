import React from 'react';
import BaseContainer from './BaseContainer';
import {post} from '../services/Requests';
import {modelURL} from '../services/urlFactory';

import {Card, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
/**
 * Represents the Settings page components
 */
class Settings extends BaseContainer {
/**
* Class constructor
* @param {Object} props User define component
*/
  constructor(props) {
    super(props);

    this.state = {
      user: {
        password: '',
      },
    };
  }
/**
* Event changer for the password
* @param  {String} changeEvent Changer event of the password
*/
  onChangePassword(changeEvent) {
    const password = changeEvent.target.value;
    const user = this.state.user;

    user.password = password;

    this.setState({
      user,
    });
  }
/**
 * Checks the password with the logged in user password to confirm deletion
 */
  onConfirm() {
    const url = modelURL('user');
    const data = {
      password: this.state.user.password,
    };
    // post(url, data)
    //   .then((response) => {
    //     console.log('deletion');
    //     console.log(response);
        // resetSession();
        // isAuthenticated() === false;
        // browserHistory.push('/home');

        // refresh
      // })
      // .catch((error) => {
      //   console.log('error!');
      // });
    this.makePOSTrequest(url, data)
     .then((response) => {

     })
     .catch((error) => {

     });
  }
/**
 * Describes the HTML elements
 * @return {String} HTML elements
 */
  render() {
    const onConfirm = this.onConfirm.bind(this);
    const onChangePassword = this.onChangePassword.bind(this);
    return(
      <div>
        <Card>
          <CardText></CardText>
          <form>
            <formgroup>
              <h3>Permanently delete your account and all of your content</h3>
              <p>We’re sorry to see you go. Once your account is deleted,
                 all of your content will be permanently gone, including your profile,
                 stories, publications, notes, and responses. If you’re not sure about that,
                we suggest you to confirm deletion, type your password below:</p>
              <hgroup>
                <h2>
                </h2>
                <TextField
                  floatingLabelText="Password"
                  value={this.state.user.password}
                  type="password"
                  onChange={onChangePassword}
                  />
                <FlatButton label="Confirm account Deletion" onClick={onConfirm}/>
              </hgroup>
            </formgroup>
          </form>
          <CardText></CardText>
        </Card>
      </div>
    );
  }
}
export default Settings;
