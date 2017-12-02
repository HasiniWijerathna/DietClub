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
import {compose, withProps} from "recompose"
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps"

import {getAllSmoothies} from '../services/juiceBarService';

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
    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
      },
      gridList: {
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
        cellHeight: 400,

      },
      titleStyle: {
        color: 'rgb(0, 188, 212)'
      }
    };

    const GridVerticalStyles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
      },
      gridList: {
        // width: 500,
        // height: 450,
        overflowY: 'auto'
      }
    };

    const tilesData = [
      {
        img: 'https://natashaskitchen.com/wp-content/uploads/2016/01/Blueberry-Pear-Smoothie-4-600x900.jpg',
        title: 'Breakfast',
        author: 'jill111'
      }, {
        img: 'https://media1.popsugar-assets.com/files/thumbor/zF0Zq69iyQ4nbEYuXGGnhrxa5YU/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2017/03/10/810/n/1922729/14d6c60c248b77fb_Low-Carb-Smoothie.jpg',
        title: 'Tasty burger',
        author: 'pashminu'
      }, {
        img: 'http://images.media-allrecipes.com/images/69938.jpg',
        title: 'Camera',
        author: 'Danson67'
      }, {
        img: 'https://media1.popsugar-assets.com/files/thumbor/zF0Zq69iyQ4nbEYuXGGnhrxa5YU/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2017/03/10/810/n/1922729/14d6c60c248b77fb_Low-Carb-Smoothie.jpg',
        title: 'Morning',
        author: 'fancycrave1'
      }
    ];

    const MyMapComponent = compose(withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places", loadingElement: <div style={{
        height: `100%`
      }}/>,
      containerElement: <div style={{
        height: `400px`
      }}/>,
      mapElement: <div style={{
          height: `100%`
        }}/>
    }), withScriptjs, withGoogleMap)((props) => <GoogleMap defaultZoom={25} defaultCenter={{
      lat: 6.927079,
      lng: 79.861244
    }}>
      {props.isMarkerShown && <Marker position={{
        lat: 6.927079,
        lng: 79.861244
      }}/>}
    </GoogleMap>);

    return (
      <div>
        <Carousel showArrows>
          <div>
            <img src="https://cdn.bormiolirocco.com/wp-content/uploads/2016/08/Smoothie_antiossidante.jpg"/>

          </div>
          <div>
            <img src="https://wallpaperscraft.com/image/berries_smoothies_blueberries_currants_107543_1920x1080.jpg"/>

          </div>
          <div>
            <img src="http://www.kaizennaturals.com/wp-content/uploads/2017/10/Neopolitan-Smoothie.jpg"/>

          </div>
          <div>
            <img src="http://thejuiceparlor.com/wp-content/uploads/2015/09/tjp-bg-temp.jpg"/>

          </div>

        </Carousel>
        <div>
          <Subheader>Trending</Subheader>
        </div>

        <div style={styles.root}>
          <GridList style={styles.gridList} cellHeight={180}>
            {this.state.smoothies.map((smoothie) => (
              <GridTile key={smoothie.id} title={smoothie.title} actionIcon={< IconButton > <StarBorder color="rgb(0, 188, 212)"/> < /IconButton>} titleStyle={styles.titleStyle} titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)">
                <img src={smoothie.image}/>
              </GridTile>
            ))}
          </GridList>
        </div>

        <div style={GridVerticalStyles.root}>
          <GridList cellHeight={180} style={GridVerticalStyles.gridList}>

            {this.state.smoothies.map((smoothie) => (
              <GridTile key={smoothie.id} title={smoothie.title} subtitle={< span > by < b > {
                smoothie.title
              } < /b></span >} actionIcon={< IconButton > <StarBorder color="white"/> < /IconButton>}>
                <img src={smoothie.image}/>
              </GridTile>
            ))}
          </GridList>
        </div>

        <div>
          <Subheader>Map view</Subheader>
          <MyMapComponent isMarkerShown/>
        </div>

      </div>

    );
  }
}

export default Home;
