import React from 'react';
import BaseContainer from './BaseContainer';
import MapView from '../components/MapView';
/**
* Represents the view logic
*/
class MapViewBranches extends BaseContainer {
/**
* Describes the elements on the About Us page
* @return {String} HTML elements
*/
  render() {
    return (
      <div>
        <MapView/>
      </div>
    );
  }
}

export default MapViewBranches;
