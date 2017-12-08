import React from 'react';

import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps";
import {compose, withProps} from "recompose";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import Branch from './Branch';

const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
};

const MapComponent = withScriptjs(withGoogleMap((props) => {
  const markers = [
    <Marker position={{ lat: 6.9201137, lng: 79.8582955}} onClick={props.onMarkerClick.bind(this, 1)}/>,
    <Marker position={{ lat: 6.864908099999999, lng: 79.89967890000003 }} onClick={props.onMarkerClick.bind(this, 2)}/>,
    <Marker position={{ lat: 6.9060787, lng: 79.96962770000005 }} onClick={props.onMarkerClick.bind(this, 3)}/>,
    <Marker position={{ lat: 7.002512999999999, lng: 79.90989250000007}} onClick={props.onMarkerClick.bind(this, 4)}/>,
    <Marker position={{ lat: 6.830118499999999, lng: 79.88008319999994 }} onClick={props.onMarkerClick.bind(this, 5)}/>
  ]
  return (
    <GoogleMap
      defaultZoom={11}
      defaultCenter={{ lat: 6.9201137, lng: 79.8582955 }}
    >
      {markers}
    </GoogleMap>
  )
}));

/**
* Represents the view logic
*/
class MapView extends React.Component {

  /**
* Class constructor
* @param {Object} props User define component
*/
  constructor(props) {

    super(props);

    this.state = {
      open: false,
    };

  this.handleMarkerPress = this.handleMarkerPress.bind(this);
  }

  handleClose() {
     this.setState({open: false});
  }

  handleMarkerPress(index) {
    console.log('cliked', index);
     this.setState({open: true});
    // console.log(this.state.open);
  }

  /**
  * Describes the elements on the About Us page
  * @return {String} HTML elements
  */
  render() {
    const handleMarkerPress = this.handleMarkerPress.bind(this);
    const handleClose = this.handleClose.bind(this);
    console.log(this.state.open);

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={handleClose}
      />,
    ];

    return (
      <div>
        <div>98
         <Dialog
           title="Dialog With Custom Width"
           actions={actions}
           modal={true}
           contentStyle={customContentStyle}
           open={this.state.open}
         >
           <Branch/>
         </Dialog>

       </div>
       <MapComponent
         googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
         loadingElement={<div style={{ height: `100%` }} />}
         containerElement={<div style={{ height: `400px` }} />}
         mapElement={<div style={{ height: `100%` }} />}
         onMarkerClick={this.handleMarkerPress}
       />

      </div>




   );
  }
}

export default MapView;
