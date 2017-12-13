import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';

import {getAllShakes} from '../services/juiceBarService';
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
      cardViewSmoothie: {
        name: '',
        image: '',
        price: ''
      }
    });
  }

  /**
  * Handle the newsletter click event
  */
    smoothieOnClick(id)  {
      console.log(this.state.smoothies[id]);

      this.setState({
        open: true,
        cardViewSmoothie: {
          name: this.state.smoothies[id].name,
          image: this.state.smoothies[id].image,
          price: this.state.smoothies[id].price,
        }
      });
  }

  /**
  * Describes the elements on the About Us page
  * @return {String} HTML elements
  */
  render() {
    const handleClose = this.handleClose.bind(this);
    console.log(this.state.cardViewSmoothie.image);

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

    return (

      <div>
        <Dialog modal={true} open={this.state.open} autoScrollBodyContent={true} onRequestClose={handleClose} bodyClassName={'smoothie-dialog-content'} repositionOnUpdate>
          <div id="image-container" class="center-cropped" style={{backgroundImage: `url(${this.state.cardViewSmoothie.image})`}}></div>
          <CardTitle title={this.state.cardViewSmoothie.name} subtitle={`Price ${this.state.cardViewSmoothie.price}`} />
          <FlatButton label="Back" onClick={handleClose} fullWidth={true}/>
        </Dialog>

        <GridList cellHeight={180} style={GridVerticalStyles.gridList}>
          {this.state.smoothies.map((smoothie) => (
            <GridTile key={smoothie.id} title={smoothie.name} onClick={this.smoothieOnClick.bind(this, smoothie.id)}>
              <img src={smoothie.image}/>
            </GridTile>
          ))}
        </GridList>
      </div>
    );
  }
}

export default GridVerticalSmoothies;
