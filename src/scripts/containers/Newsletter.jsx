import React from 'react';
import BaseContainer from './BaseContainer';

import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card';
import {getAllNewsletters} from '../services/juiceBarService';
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
    console.log(this.props.params.newsletterId);
    this.state = {
      newsletters: getAllNewsletters()

    };

  }

/**
* Describes the elements on the About Us page
* @return {String} HTML elements
*/
  render() {
    let newsletterView = null;
    console.log(this.state.newsletters);
    console.log(this.state.newsletters[this.props.params.newsletterId]);
    const selectedNewsletter = this.state.newsletters[this.props.params.newsletterId];
    if(selectedNewsletter) {
          newsletterView =  (
            <Card>
               <CardMedia
                 overlay={<CardTitle title={selectedNewsletter.name}/>}>
                 <img src={selectedNewsletter.image} alt="" />
               </CardMedia>
               <CardText>
                 {selectedNewsletter.content}
               </CardText>
             </Card>
        );
    } else {
      newsletterView = (
        <div>get the  away</div>
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
