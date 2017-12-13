import React from 'react';
import BaseContainer from './BaseContainer';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
/**
* Represents the view logic
*/
class SignUp extends BaseContainer {
/**
* Describes the elements on the About Us page
* @return {String} HTML elements
*/
  render() {
    return (
      <div >
        <img src="https://www.freelogoservices.com/api/main/images/1j+ojl1FOMkX9WypfBe43D6kjfCGqRFInRnJwXs1M3EMoAJtlSEuhvVu9v4z" />
        <div>
        <TextField
          hintText="Username"
        /><br />
        <TextField
          hintText="Password"
          floatingLabelText="Password"
          type="password"
        /><br />
      </div>
        <FlatButton label="Sign In" primary={true} />
      </div>

    );
  }
}

export default SignUp;
