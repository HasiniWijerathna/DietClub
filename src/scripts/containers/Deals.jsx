import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {Carousel} from 'react-responsive-carousel';

import {getAllSmoothies} from '../services/juiceBarService';
import {GridList, GridTile} from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
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

      smoothies: getAllSmoothies()
    };
  }

  /**
  * Describes the elements on the About Us page
  * @return {String} HTML elements
  */
  render() {

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

    // <Card>
    //   <CardHeader title="Hot Deals"/>
    //   <Carousel showArrows>
    //     <div>
    //       <img src="https://cdn.bormiolirocco.com/wp-content/uploads/2016/08/Smoothie_antiossidante.jpg"/>
    //
    //     </div>
    //     <div>
    //       <img src="https://wallpaperscraft.com/image/berries_smoothies_blueberries_currants_107543_1920x1080.jpg"/>
    //
    //     </div>
    //     <div>
    //       <img src="http://www.kaizennaturals.com/wp-content/uploads/2017/10/Neopolitan-Smoothie.jpg"/>
    //
    //     </div>
    //     <div>
    //       <img src="http://thejuiceparlor.com/wp-content/uploads/2015/09/tjp-bg-temp.jpg"/>
    //
    //     </div>
    //
    //   </Carousel>
    // </Card>
    //   <CardHeader title="Hot Deals"/>
    //   <Card>
    //     <div style={GridVerticalStyles.root}>
    //       <GridList cellHeight={180} style={GridVerticalStyles.gridList}>
    //
    //         {this.state.smoothies.map((smoothie) => (
    //           <GridTile key={smoothie.id} title={smoothie.title} subtitle={< span > by < b > {
    //             smoothie.title
    //           } < /b></span >} actionIcon={< IconButton > <StarBorder color="white"/> < /IconButton>}>
    //             <img src={smoothie.image}/>
    //           </GridTile>
    //         ))}
    // </GridList>

    return (
      <div>
        <Card>
          <CardHeader title="Hot Deals"/>
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
          <CardHeader title="Hot Deals"/>
          <div>
            <Card>
              <GridList cellHeight={180} style={GridVerticalStyles.gridList}>
                {this.state.smoothies.map((smoothie) => (
                  <GridTile key={smoothie.id} title={smoothie.title} subtitle={< span > by < b > {
                    smoothie.title
                  } < /b></span >} actionIcon={< IconButton > <StarBorder color="white"/> < /IconButton>}>
                    <img src={smoothie.image}/>
                  </GridTile>
                ))}
              </GridList>

              <GridList cellHeight={180} style={GridVerticalStyles.gridList}>
                {this.state.smoothies.map((smoothie) => (
                  <GridTile key={smoothie.id} title={smoothie.title} subtitle={< span > by < b > {
                    smoothie.title
                  } < /b></span >} actionIcon={< IconButton > <StarBorder color="white"/> < /IconButton>}>
                    <img src={smoothie.image}/>
                  </GridTile>
                ))}
              </GridList>
            </Card>
          </div>
        </Card>
      </div>
    );
  }
}

export default Deals;
