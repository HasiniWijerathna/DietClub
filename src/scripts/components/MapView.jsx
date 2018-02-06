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
import {getAllBranches, updateUser} from '../services/juiceBarService';
import MediaQuery from 'react-responsive';
import {browserHistory} from 'react-router';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import ActionHome from 'material-ui/svg-icons/action/home';
import ShoppingCart from 'material-ui/svg-icons/action/shopping-cart';


import {red500} from 'material-ui/styles/colors';

import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

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
      liked: false,
      branches: getAllBranches(),
      cardViewBranches: {
        name: '',
        image: '',
        id: ''
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
        personLiked: this.createLikeMap()
      }
    });
  }

  createLikeMap() {
    const personLiked = {};
    const results = localStorage.getItem('user');
    const user = JSON.parse(results);
    const favouritePeople = (user.faveBranches || []);

    favouritePeople
      .forEach((person) => {
        personLiked[person.id] = true;
      });

    return personLiked;
  }

  /**
  * Handle the maker press event in map view
  */

  handleMarkerPress(index) {
    console.log(this.state.branches[index]);
    if (this.state.branches[index]) {
      this.setState({
        open: true,
        cardViewBranches: {
          id: this.state.branches[index].id,
          name: this.state.branches[index].name,
          image: this.state.branches[index].image,
          openingHours: this.state.branches[index].openingHours,
          address: this.state.branches[index].address,
          contact: this.state.branches[index].contact,
        }
      });
    }
  }

  add(branch) {
    console.log(branch);
      this.setState({liked: true});
      const results = localStorage.getItem('user');
      let user = JSON.parse(results);
      console.log('local user');
      console.log(user);
      // user.faveBranches.forEach((place, index) => {
      //   if(branch.id = place.id) {
      //     console.log(user);
      //   } else {
      //     user.favBranches.push(branch);
      //     localStorage.setItem('user', JSON.stringify(user));
      //     updateUser(user.id);
      //   }
      // });
      user.favBranches.push(branch);
         localStorage.setItem('user', JSON.stringify(user));
         updateUser(user.id);
         const personLiked = {
           ...this.state.personLiked,
           [branch.id]: true,
         };



  }

  remove(branch) {
console.log(branch);
  this.setState({liked: false});
  let removeNewsIndex = null;
  const results = localStorage.getItem('user');
  let user = JSON.parse(results);
  user.favBranches.forEach((place, index) => {
    if(place.id === branch.id) {
      removeNewsIndex = index;
      console.log('Must remove item number ' + index);
    }
  });
   user.faveNews.splice(removeNewsIndex, 1 );
   localStorage.setItem('user', JSON.stringify(user));
     console.log(user);
     const personLiked = {
       ...this.state.personLiked,
       [branch.id]: false,
     };

     this.setState({personLiked});
  }

  /**
  * Describes the elements on the About Us page
  * @return {String} HTML elements
  */
  render() {
    console.log(this.state.cardViewBranches);
    const handleMarkerPress = this.handleMarkerPress.bind(this);
    const handleClose = this.handleClose.bind(this);
    const add = this.add.bind(this, this.state.cardViewBranches);
    const remove = this.remove.bind(this, this.state.cardViewBranches);

    let favouriteButton = null;
    if (this.state.liked) {
    favouriteButton = (
      <div>
        <div>
          <IconButton
             touch={true}
             onClick ={remove}
             color={red500}>
            <ActionFavorite color={red500}/>
          </IconButton>
        </div>
      </div>
    );
  } else {
    favouriteButton = (
      <div>
        <div>
          <IconButton
             touch={true}
              onClick ={add}
             >
            <ActionFavoriteBorder color={red500}/>
          </IconButton>
        </div>
      </div>
    );
  }


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


         <Dialog modal={false} open={this.state.open} autoScrollBodyContent={true} onRequestClose={handleClose} bodyClassName={'smoothie-dialog-content'} repositionOnUpdate="repositionOnUpdate">
           <div id="image-container" class="center-cropped" style={{
               backgroundImage: `url(${this.state.cardViewBranches.image})`
             }}>
             <GridTile title={this.state.cardViewBranches.name} subtitle={`${this.state.cardViewBranches.openingHours}`} actionIcon={

                 favouriteButton

           } titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"></GridTile>
           </div>
           <div id="mapViewText"> Address: {this.state.cardViewBranches.address}</div>
            <div id="mapViewText">Contact: {this.state.cardViewBranches.contact}</div>
            <div></div>
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
