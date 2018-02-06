import React from 'react';
import BaseContainer from './BaseContainer';
import {sendMail} from '../services/urlFactory';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';

/**
* Represents the view logic
*/
class Favorites extends BaseContainer {

  /**
* Class constructor
* @param {Object} props User define component
*/
  constructor(props) {
      super(props);
  }

/**
  * Handle the newsletter click event
  */
sendFavorites() {
  axios.post(sendMail(), {
      email: 'wijerathna.hasini@gmail.com',
      text: 'Favorite List'
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}


  /**
* Describes the elements on the About Us page
* @return {String} HTML elements
*/
  render() {
    const sendFavorites = this.sendFavorites.bind(this);
    return (<div>
      Favorites
        <FlatButton label="Send Email" primary={true}  onClick= {sendFavorites}/>
    </div>);
  }
}

export default Favorites;
