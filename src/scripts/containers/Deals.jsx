import React, {Component} from 'react';
import {Card} from 'material-ui/Card';

import CarouselView from '../components/CarouselView';

/**
* Represents the view logic of adding new functionality
*/
class Deals extends Component {

  /**
* Class constructor
* @param {Object} props User define component
*/
  constructor(props) {
    super(props);

    this.state = {
      files: []
    };
  }

  /**
  * Describes the elements on the About Us page
  * @return {String} HTML elements
  */
  render() {
    return (
      <div>
        <CarouselView/>
      </div>
    );
  }
}

export default Deals;
