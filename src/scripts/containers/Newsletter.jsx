import React from 'react';
import BaseContainer from './BaseContainer';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import {red500} from 'material-ui/styles/colors';

import {getAllNewsletters} from '../services/juiceBarService';
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
handleOpen() {
  this.setState({alertOpen: false});
};

/**
 * Alert handle alert
 */
handleClose() {
  this.setState({alertOpen: true});
};

/**
* Describes the elements on the About Us page
* @return {String} HTML elements
*/
  render() {
  let newsletterView = null;
  let favouriteButton = null;
  const handleOpen = this.handleOpen.bind(this);
  const handleClose = this.handleClose.bind(this);
  const selectedNewsletter = this.state.newsletters[this.props.params.newsletterId];

  const iconButton = {};

  if (selectedNewsletter) {
    if(this.state.alertOpen) {
      favouriteButton = (
        <div>
          <div>
            <IconButton
               touch={true}
               style={iconButton}
               onClick={handleOpen}
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
               onClick={handleClose}>
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
