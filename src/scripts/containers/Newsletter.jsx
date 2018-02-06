import React from 'react';
import BaseContainer from './BaseContainer';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import {red500} from 'material-ui/styles/colors';

import {getAllNewsletters, updateUser} from '../services/juiceBarService';
import FlatButton from 'material-ui/FlatButton';
/**
* Represents the view logic
*/
class Newsletter extends BaseContainer {

/**
* Class constructor
* @param {Object} props User define component
*/
  constructor(props) {
    super(props);
    this.state = {
      newsletters: getAllNewsletters(),
      alertOpen: false
    };
  }

/**
 * Alert handle alert
 */
handleOpen(selectedNewsletter) {
  // this.setState({alertOpen: true});
  // const results = localStorage.getItem('user');
  // let user = JSON.parse(results);
  //
  // user.faveEvent.push(selectedPerson);
  // localStorage.setItem('user', JSON.stringify(user));
  //   console.log(user);
  // updateUser(user.id);
  //   const personLiked = {
  //     ...this.state.personLiked,
  //     [selectedPerson.id]: true,
  //   };
  //
  //   this.setState({personLiked});

  this.setState({alertOpen: true});
  const results = localStorage.getItem('user');
  let user = JSON.parse(results);
  console.log(selectedNewsletter);
  user.faveNews.push(selectedNewsletter);
  localStorage.setItem('user', JSON.stringify(user));
  updateUser(user.id);
    console.log(user);
};

/**
 * Alert handle alert
 */
handleClose(selectedNewsletter) {
  this.setState({alertOpen: false});
  let removeNewsIndex = null;
  const results = localStorage.getItem('user');
  let user = JSON.parse(results);
  user.faveNews.forEach((userNews, index) => {
    if(userNews.id === selectedNewsletter.id) {
      removeNewsIndex = index;
      console.log('Must remove item number ' + index);
    }
  });
   user.faveNews.splice(removeNewsIndex, 1 );
   localStorage.setItem('user', JSON.stringify(user));
     console.log(user);

};

addToFavorites(newsletter) {
  const results = localStorage.getItem('user');
  let user = JSON.parse(results);
  console.log(newsletter);
}

/**
* Describes the elements on the About Us page
* @return {String} HTML elements
*/
  render() {
  let newsletterView = null;
  let favouriteButton = null;
  const selectedNewsletter = this.state.newsletters[this.props.params.newsletterId];
  const handleOpen = this.handleOpen.bind(this, selectedNewsletter);
  const handleClose = this.handleClose.bind(this, selectedNewsletter);

  const iconButton = {};

  if (selectedNewsletter) {
    if(this.state.alertOpen) {
      favouriteButton = (
        <div>
          <div>
            <IconButton
               touch={true}
               style={iconButton}
               onClick={handleClose}
               color={red500}>
              <ActionFavorite color={red500}/>
            </IconButton>
          </div>
        </div>
      );
    } else {
      favouriteButton = (
        <div>
          <div>
            <IconButton
               touch={true}
               style={iconButton}
               onClick={handleOpen}>
              <ActionFavoriteBorder color={red500}/>
            </IconButton>
          </div>
        </div>
      );
    }


    newsletterView = (
      <Card>
        <CardMedia overlay={< CardTitle title = {
          selectedNewsletter.name
        } />}>
          <img src={selectedNewsletter.image} alt=""/>
        </CardMedia>
        {favouriteButton}
        <CardText>
          {selectedNewsletter.content}
        </CardText>
      </Card>
    );

  } else {
    newsletterView = (
      <Card>
        <CardText>
          No Newsletters to display :(
        </CardText>
      </Card>
    )
  }
  return (
    <div>
      {newsletterView}
    </div>
  );
}
}

export default Newsletter;
