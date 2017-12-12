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
    events: getAllEvents()
  };
}
  /**
* Describes the elements on the About Us page
* @return {String} HTML elements
*/
  render() {
    let eventView = [];
    const content = (eventView = this.state.events.map((event) => {
      console.log(event);
      return (
        <div key={event.id}>

          <Card key={event.id} >
            <CardHeader
                title={event.branch}
              />
            <CardMedia>
              <img src={event.image} alt="" />
            </CardMedia>
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
