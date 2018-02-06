import React, {Component} from 'react';
import {Card} from 'material-ui/Card';

import CarouselView from '../components/CarouselView';
import GirdViewMenuSalads from '../components/GirdViewMenuSalads';

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
      files: 'wfwdf'
    };
  }

  /**
  * Describes the elements on the About Us page
  * @return {String} HTML elements
  */
  render() {
    console.log(this.state.files);
    return (
      <div>
        <CarouselView/>
          <div>
            <GirdViewMenuSalads/>
          </div>
      </div>
    );
  }
}

export default Deals;
