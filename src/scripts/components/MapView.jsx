import React from 'react';

import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps";
import {compose, withProps} from "recompose";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card';

import Branch from './Branch';
import {getAllBranches} from '../services/juiceBarService';
import MediaQuery from 'react-responsive';
import {browserHistory} from 'react-router';

const customContentStyle = {
  // padding: 0,
  // maxHeight: '80%',
  // background: 'black'
  // width: '100%',
  // maxWidth: 'none'
  // width: '100%',
  // maxWidth: 'none',
};

/**
* Represents the map view logic
*/
const MapComponent = withScriptjs(withGoogleMap((props) => {
  const markers = [ < Marker position = {{ lat: 6.9201137, lng: 79.8582955}}onClick = {
      props.onMarkerClick.bind(this, 1)
    } />, < Marker position = {{ lat: 6.864908099999999, lng: 79.89967890000003 }}onClick = {
      props.onMarkerClick.bind(this, 2)
    } />, < Marker position = {{ lat: 6.9060787, lng: 79.96962770000005 }}onClick = {
      props.onMarkerClick.bind(this, 3)
    } />, < Marker position = {{ lat: 7.002512999999999, lng: 79.90989250000007}}onClick = {
      props.onMarkerClick.bind(this, 4)
    } />, < Marker position = {{ lat: 6.830118499999999, lng: 79.88008319999994 }}onClick = {
      props.onMarkerClick.bind(this, 5)
    } />
  ]
  return (
    <GoogleMap defaultZoom={11} defaultCenter={{
      lat: 6.9201137,
      lng: 79.8582955
    }}>
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

      branches: getAllBranches(),
      cardViewBranches: {
        name: '',
        image: ''
      }
    };

    this.handleMarkerPress = this.handleMarkerPress.bind(this);
  }

  /**
  * Handle the newsletter click event
  */
  mapViewOnClick(id)  {
    // Not quite sure about what's going on
    const branchId = id-1;
     browserHistory.push(`/branch/${branchId}`);
  }

  /**
  * Handle the dialog box close event
  */
  handleClose() {
    this.setState({
      open: false,
      cardViewBranches: {
        id: '',
        name: '',
        image: '',
        openingHours: '',
      }
    });
  }

  /**
  * Handle the maker press event in map view
  */

  handleMarkerPress(index) {
    if (this.state.branches[index]) {
      this.setState({
        open: true,
        cardViewBranches: {
          id: this.state.branches[index].id,
          name: this.state.branches[index].name,
          image: this.state.branches[index].image,
          openingHours: this.state.branches[index].openingHours,
        }
      });
    }
  }

  /**
  * Describes the elements on the About Us page
  * @return {String} HTML elements
  */
  render() {
    console.log(this.state.cardViewBranches.id);
    const handleMarkerPress = this.handleMarkerPress.bind(this);
    const handleClose = this.handleClose.bind(this);

    const actions = [ < FlatButton label = "Cancel" fullWidth={true}
      onClick = {
        handleClose
      } />, < FlatButton label = "Submit" primary = {
        true
      }
      onClick = {
        handleClose
      } />
    ];

    // const post = this.state.post;
    //     let comments = [];
    //     if(post.Comments && post.Comments.length) {
    //       comments = post.Comments.map((comment) =>
    //         <Comment
    //           key={comment.id}
    //           comment={comment}
    //           onDelete={onCommentDelete}
    //           onEdit={onCommentEdit}
    //         />
    //     );
    //     }

    // let cardViewBranches = null;
    // const branches = this.state.branches;
    // if(branches.length){
    //   branches.map((branch) => {
    //     console.log(branch.image);
    //        cardViewBranches =  (
    //     <Card>
    //       <img src={branch.image} alt="" />
    //       <CardTitle title={branch.name} subtitle="Card subtitle" />
    //       <CardText>
    //         Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    //         Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
    //         Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
    //         Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
    //       </CardText>
    //       <CardActions>
    //         <FlatButton label="Action1" />
    //         <FlatButton label="Action2" />
    //       </CardActions>
    //     </Card>
    //   );
    //   }
    // );
    //
    // }

    // <div id="image-container" class="center-cropped">
    //   <img src={this.state.cardViewBranches.image} alt="" />
    // </div>

    return (
      <div>
       <div>
         <Dialog modal={true} open={this.state.open} autoScrollBodyContent={true} onRequestClose={handleClose} bodyClassName={'mapview-dialog-content'} repositionOnUpdate>
           <div id="image-container" class="center-cropped" style={{backgroundImage: `url(${this.state.cardViewBranches.image})`}}></div>
           <CardTitle title={this.state.cardViewBranches.name} subtitle={this.state.cardViewBranches.openingHours}/>
           <FlatButton label="Click for more" onClick={handleClose} fullWidth={true}/>
         </Dialog>

       </div>
       <MapComponent googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
         loadingElement={< div style = {{ height: `100%` }}/>}
         containerElement={< div style = {{ height: `400px` }}/>}
         mapElement={< div style = {{ height: `100%` }}/>}
         onMarkerClick={this.handleMarkerPress}/>

     </div>

    );
  }
}

export default MapView;
