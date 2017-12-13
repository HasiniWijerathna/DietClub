import React from 'react';
import BaseContainer from './BaseContainer';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

import {getAllShakes} from '../services/juiceBarService';
/**
* Represents the view logic
*/
class Smoothie extends BaseContainer {

  /**
  * Class constructor
  * @param {Object} props User define component
  */
    constructor(props) {
      super(props);
      this.state = {
        newsletters: getAllShakes(),
        alertOpen: false
      };
    }


/**
* Describes the elements on the About Us page
* @return {String} HTML elements
*/
  render() {
    const handleClose = this.handleClose.bind(this);
    const selectedSmoothie = this.state.newsletters[this.props.params.smoothieId];
    let smoothieView = null;
    console.log(selectedSmoothie);

    smoothieView = (
      <Card>
        <CardMedia overlay={< CardTitle title = {
          selectedSmoothie.name
        } />}>
          <img src={selectedSmoothie.image} alt=""/>
        </CardMedia>
        <CardText>
          {selectedSmoothie.price}
        </CardText>
      </Card>
    );
    return (
      <div>
      {smoothieView}
      </div>
    );
  }
}

export default Smoothie;
