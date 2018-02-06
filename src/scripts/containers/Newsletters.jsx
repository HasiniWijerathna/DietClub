import React from 'react';
import BaseContainer from './BaseContainer';
import {browserHistory} from 'react-router';
import {getAllNewsletters, updateUser} from '../services/juiceBarService';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import {red500} from 'material-ui/styles/colors';

/**
* Represents the view logic
*/
class Newsletters extends BaseContainer {

/**
* Class constructor
* @param {Object} props User define component
*/
  constructor(props) {
    super(props);

    this.state = {
      openNewsletterCard: false,
      newsletters: getAllNewsletters()
    };
  }

/**
  * Handle the newsletter click event
  */
newsletterOnClick(id) {
  // Not quite sure about what's going on
  const newsletterId = id - 1;
  browserHistory.push(`/newsletter/${newsletterId}`);
}

addToFavorites(newsletter) {
  const results = localStorage.getItem('user');
  let user = JSON.parse(results);
  console.log(newsletter);
}

  render() {
    const newsletters = this.state.newsletters;
    let viewNewsletters = [];
    const content = (viewNewsletters = newsletters.map((newsletter) => {
    const newsletterOnClick = this.newsletterOnClick.bind(this,newsletter.id);
    const addToFavorites = this.addToFavorites.bind(this,newsletter);

      return (
        <div key={newsletter.id}>
          <Card key={newsletter.id}>
            <CardMedia onClick= {newsletterOnClick} overlay={< CardTitle title = {newsletter.name} subtitle = "Read more.." />}>
              <div id="favorite">
              
              </div>
              <img src={newsletter.image} alt=""/>
            </CardMedia>
          </Card>
        </div>
      );
    }));
    return (
      <div>
        {content}
      </div>
    );
  }
}

export default Newsletters;
