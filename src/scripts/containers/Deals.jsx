import React, {Component} from 'react';
import {Card} from 'material-ui/Card';

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
      files: [],
    };
  }

  /**
  * Describes the elements on the About Us page
  * @return {String} HTML elements
  */
  render() {
    return (
      <div>
        Deals Page
      </div>
    );
  }
}

export default Deals;
