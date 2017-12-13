import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {isAuthenticated, resetSession} from '../services/SessionService';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';

import {getAllSmoothies} from '../services/juiceBarService';
import CarouselView from '../components/CarouselView';
import GridTileSmoothies from '../components/GridTileSmoothies';
import GridVerticalSmoothies from '../components/GridVerticalSmoothies';
import MapView from '../components/MapView';

/**
* Representing the login sign up functionalities
*/
class Home extends Component {

  /**
* Navigates to the login page
*/
  static login() {
    browserHistory.push('/login');
  }

  /**
* Navigates to the sign up page
*/
  static signUp() {
    browserHistory.push('/registration');
  }

  /**
* Class constructor
* @param {Object} props User define component
*/
  constructor(props) {

    super(props);

    this.state = {
      isAuthenticated: isAuthenticated(),

      smoothies: getAllSmoothies()
    };

  }

/**
* Sets the session if the authenticaion false
*/
  logout() {
    resetSession();
    this.setState({isAuthenticated: false});
  }

  //elements only for example
  getElements(numElements) {
    const elements = [];
    for (let i = 0; i < numElements; ++i) {
      elements.push(
        <div className="subelement" key={i}>
          {i}
        </div>
      );
    }
    return elements;
  }

  /**
* Describes the elements
* @return {String} HTML elements
*/
  render() {

    // const MyMapComponent = compose(withProps({
    //   googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places", loadingElement: <div style={{
    //     height: `100%`
    //   }}/>,
    //   containerElement: <div style={{
    //     height: `400px`
    //   }}/>,
    //   mapElement: <div style={{
    //       height: `100%`
    //     }}/>
    // }), withScriptjs, withGoogleMap)((props) => <GoogleMap defaultZoom={25} defaultCenter={{
    //   lat: 6.927079,
    //   lng: 79.861244
    // }}>
    //   {props.isMarkerShown && <Marker position={{
    //     lat: 6.927079,
    //     lng: 79.861244
    //   }}/>}
    // </GoogleMap>);

    return (
      <div>
        <CarouselView/>
        <div>
          <Subheader>Trending</Subheader>
        </div>

        <div>
          <GridTileSmoothies/>
          <Subheader>Smoothies</Subheader>
        </div>

        <div>
          <GridVerticalSmoothies/>
        </div>

        <div>
          <Subheader>Map view</Subheader>
          <MapView/>

        </div>

      </div>

    );
  }
}

export default Home;
