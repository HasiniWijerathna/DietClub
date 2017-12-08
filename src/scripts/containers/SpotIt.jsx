import React from 'react';
import BaseContainer from './BaseContainer';

import SpotItCarousel from '../components/SpotItCarousel';

/**
* Represents the view logic
*/
class SpotIt extends BaseContainer {
/**
* Describes the elements on the About Us page
* @return {String} HTML elements
*/
  render() {
    return (
      <div>
      <SpotItCarousel/>
      </div>
    );
  }
}

export default SpotIt;
