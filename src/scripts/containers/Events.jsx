import React from 'react';
import BaseContainer from './BaseContainer';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import DateRange from 'material-ui/svg-icons/action/date-range';
import LocationOn from 'material-ui/svg-icons/communication/location-on';
import Description from 'material-ui/svg-icons/action/description';

import {getAllEvents} from '../services/juiceBarService';
import IconButton from 'material-ui/IconButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import {red500} from 'material-ui/styles/colors';
import {getAllNewsletters, updateUser} from '../services/juiceBarService';

/**
* Represents the view logic
*/
class Events extends BaseContainer {

/**
* Class constructor
* @param {Object} props User define component
*/
constructor(props) {
  super(props);

  this.state = {
    events: getAllEvents(),
    personLiked: this.createLikeMap(),
  };

}

createLikeMap() {
  const personLiked = {};
  const results = localStorage.getItem('user');
  const user = JSON.parse(results);
  const favouritePeople = (user.faveEvent || []);

  favouritePeople
    .forEach((person) => {
      personLiked[person.id] = true;
    });

  return personLiked;
}


/**
 * Alert handle alert
 */
handleOpen(selectedPerson) {
  this.setState({alertOpen: true});
  const results = localStorage.getItem('user');
  let user = JSON.parse(results);

  user.faveEvent.push(selectedPerson);
  localStorage.setItem('user', JSON.stringify(user));
    console.log(user);
  updateUser(user.id);
    const personLiked = {
      ...this.state.personLiked,
      [selectedPerson.id]: true,
    };

    this.setState({personLiked});
};

/**
 * Alert handle alert
 */
handleClose(selectedPerson) {
  this.setState({alertOpen: false});
  let removeSelectedEventId = null;
  const results = localStorage.getItem('user');
  let user = JSON.parse(results);
  user.faveEvent.forEach((userEvent, index) => {
    if(userEvent.id === selectedPerson.id) {
      removeSelectedEventId = index;
      console.log('Must remove item number ' + index);
    }
  });
   user.faveEvent.splice(removeSelectedEventId, 1 );
   localStorage.setItem('user', JSON.stringify(user));
     updateUser(user.id);
     console.log(user);

     const personLiked = {
       ...this.state.personLiked,
       [selectedPerson.id]: false,
     };

     this.setState({personLiked});

};
  /**
* Describes the elements on the About Us page
* @return {String} HTML elements
*/
  render() {
    let eventView = [];
    const iconButton = {};
    let favouriteButton = null;
    const content = (eventView = this.state.events.map((event) => {
    const handleOpen = this.handleOpen.bind(this, event);
    const handleClose = this.handleClose.bind(this, event);
      if (event.id) {
          if (this.state.personLiked[event.id]) {
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
}

      return (
        <div key={event.id}>

          <Card key={event.id} >
            <CardHeader
                title={event.branch}
              />
            <CardMedia>
              <img src={event.image} alt="" />
            </CardMedia>
              {favouriteButton}
            <CardTitle title={event.name} subtitle={`by ${event.organizer}`} />
              <List>
               <ListItem primaryText={event.date}  secondaryText={event.time} leftIcon={<DateRange />} />
               <ListItem primaryText={event.branch} leftIcon={<LocationOn />} />
               <ListItem primaryText={event.description}leftIcon={<Description />} />
             </List>
          </Card>

          <List/>
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

export default Events;
