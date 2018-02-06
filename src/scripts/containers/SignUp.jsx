import React from 'react';
import BaseContainer from './BaseContainer';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardText} from 'material-ui/Card';
import {getNewProfile} from '../services/juiceBarService';
/**
* Represents the view logic
*/
class SignUp extends BaseContainer {
  /**
* Class constructor
* @param {Object} props User define component
*/
  constructor(props) {
    super(props);

    this.state = {
      newUser: getNewProfile(),
      user: {
      username: '',
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    formInvalid: false,
    incorrectPassword: false,
  };

    console.log(this.state.newUser);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
  }
  onConfirm() {
    this.onChangeConfirmPassword();
    if(this.state.user.username || this.state.user.name || this.state.user.email || this.state.user.password || this.state.user.confirmPassword) {
      this.setState({
        formInvalid: true
      });
    }
    console.log(this.state.formValid);
    console.log(this.state.incorrectPassword);
    console.log(this.state.user);
    console.log(profileConfirmPassword);
  }

  onChangeName(changeEvent) {
     const profileName = `${changeEvent.target.value}`;
     const updatedUser = {
       ...this.state.user,
       name: profileName,
     }
     this.setState({
       user: updatedUser
     });
  }

  onChangeUsername(changeEvent) {
     const profileUsername = `${changeEvent.target.value}`;
     const updatedUser = {
       ...this.state.user,
       userName: profileUsername,
     }
     this.setState({
       user: updatedUser
     });
  }

  onChangePassword(changeEvent) {
     const profilePassword = `${changeEvent.target.value}`;
     const updatedUser = {
       ...this.state.user,
       password: profilePassword,
     }
     this.setState({
       user: updatedUser
     });
  }

  onChangeEamail(changeEvent) {
     const profileEmail = `${changeEvent.target.value}`;
     const updatedUser = this.state.user;
     updatedUser.email = profileEmail;
     // const updatedUser = {
     //   ...this.state.user,
     //   email: profileEmail,
     // }
     this.setState({
       user: updatedUser
     });
  }

  onChangeConfirmPassword(changeEvent) {
    const profileConfirmPassword = `${changeEvent.target.value}`;
    const updatedUser = {
      ...this.state.user,
      confirmPassword: profileConfirmPassword,
    }
    if(this.state.user.password === profileConfirmPassword) {
      this.setState({
        incorrectPassword: true,
        formInvalid: true,
        user: updatedUser
      });

      console.log(this.state.formValid);
      console.log(this.state.incorrectPassword);
      console.log(this.state.user);
      console.log(profileConfirmPassword);
    }
  }
  /**
* Describes the elements on the About Us page
* @return {String} HTML elements
*/
  render() {
    const onConfirm = this.onConfirm.bind(this);
    const onChangeName = this.onChangeName.bind(this);
    const onChangePassword = this.onChangePassword.bind(this);
    const onChangeUsername = this.onChangeUsername.bind(this);
    const onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
    const onChangeEamail = this.onChangeEamail.bind(this);

    return (<div >
      <Card>
        <CardText></CardText>
        <form>
          <div id="textForm">
            <TextField hintText="Username" onChange={onChangeUsername} value={this.state.user.userName}/><br/>
            <TextField hintText="Name" onChange={onChangeName} value={this.state.user.name}/><br/>
            <TextField hintText="Email" onChange={onChangeEamail} value={this.state.user.email}/><br/>
            <TextField hintText="Password" onChange={onChangeUsername} value={this.state.user.password}/><br/>
            <TextField hintText="Confirm Password" type="password" value={this.state.user.confirmPassword} onChange={onChangeConfirmPassword}/>
          </div>
        </form>
        <CardText></CardText>

        <div>
          <div id="cardButton">
            <center>
              <RaisedButton label="Create your account" onClick={onConfirm}   disabled={this.state.formValid} buttonStyle={{
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

export default SignUp;
