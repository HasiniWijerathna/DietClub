import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';

import {getAllShakes, updateUser} from '../services/juiceBarService';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {browserHistory} from 'react-router';
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
import ActionHome from 'material-ui/svg-icons/action/home';
import ShoppingCart from 'material-ui/svg-icons/action/shopping-cart';


/**
* Represents the view logic
*/
class GridVerticalSmoothies extends React.Component {

  /**
* Class constructor
* @param {Object} props User define component
*/
  constructor(props) {

    super(props);

    this.state = {
      open: false,
      smoothies: getAllShakes(),
      cardViewSmoothie: {
        name: '',
        image: '',
        price: ''
      }
    };

  }

  /**
  * Handle the dialog box close event
  */
  handleClose() {
    this.setState({
      open: false,
      loginAlert: false,
      cardViewSmoothie: {
        name: '',
        image: '',
        price: ''
      }
    });
  }

  handleCloseLoginAlert() {
    this.setState({loginAlert: false});
  };

  addToCart(id) {
    const results = localStorage.getItem('user');
    let user = JSON.parse(results);
    if (!user.name) {
      browserHistory.push('/login');

    } else {
      user.cartItems.push(id);
      localStorage.setItem('user', JSON.stringify(user));
      updateUser(user.id);
      console.log(user);
    }

  }

  /**
  * Handle the newsletter click event
  */
  smoothieOnClick(id) {
    // console.log(this.state.smoothies[id]);
    //
    // this.setState({
    //   open: true,
    //   cardViewSmoothie: {
    //     name: this.state.smoothies[id].name,
    //     image: this.state.smoothies[id].image,
    //     price: this.state.smoothies[id].price
    //   }
    // });

    const smoothies = this.state.smoothies.map((smoothie) => {
      if(smoothie.id == id) {
        this.setState({
          open: true,
          cardViewSmoothie: {
            name: smoothie.name,
            image: smoothie.image,
            price: smoothie.price
          }
        });
      }
    });
  }

  /**
  * Describes the elements on the About Us page
  * @return {String} HTML elements
  */
  render() {
    const handleClose = this.handleClose.bind(this);
      const handleCloseLoginAlert = this.handleCloseLoginAlert.bind(this);
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

    const actions = [
     <FlatButton
       label="Cancel"
       primary={true}
       onClick={handleCloseLoginAlert}
     />,
     <FlatButton
       label="Submit"
       primary={true}
       keyboardFocused={true}
       onClick={handleCloseLoginAlert}
     />,
   ];

    return (<div>
      <Dialog
         title="Dialog With Actions"
         actions={actions}
         modal={false}
         open={this.state.loginAlert}
         onRequestClose={handleCloseLoginAlert}
       >
         The actions in this window were passed in as an array of React objects.
       </Dialog>
      <Dialog modal={false} open={this.state.open} autoScrollBodyContent={true} onRequestClose={handleClose} bodyClassName={'smoothie-dialog-content'} repositionOnUpdate="repositionOnUpdate">
        <div id="image-container" class="center-cropped" style={{
            backgroundImage: `url(${this.state.cardViewSmoothie.image})`
          }}>
          <GridTile title={this.state.cardViewSmoothie.name} subtitle={`Rs.${this.state.cardViewSmoothie.price}`} actionIcon={<IconButton tooltip="Added to the cart" tooltipPosition="top-left"> < ShoppingCart color = "rgb(255,255,255)" onClick = {
              this.addToCart.bind(this, this.state.cardViewSmoothie)
            } />< /IconButton>} titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"></GridTile>
        </div>
        <FlatButton label="Back" onClick={handleClose} fullWidth={true}/>
      </Dialog>

      <GridList cellHeight={180} style={GridVerticalStyles.gridList}>
        {
          this.state.smoothies.map((smoothie) => (<GridTile key={smoothie.id} title={smoothie.name} onClick={this.smoothieOnClick.bind(this, smoothie.id)}>
            <img src={smoothie.image}/>
          </GridTile>))
        }
      </GridList>
    </div>);
  }
}

export default GridVerticalSmoothies;
