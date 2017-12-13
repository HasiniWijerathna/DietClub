import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';

import {getAllShakes} from '../services/juiceBarService';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

/**
* Represents the view logic
*/
class GridViewMenuBev extends React.Component {

  /**
* Class constructor
* @param {Object} props User define component
*/
  constructor(props) {

    super(props);

    this.state = {
      smoothies: getAllShakes()
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

    return (
      <div>
        <GridList cellHeight={180} style={GridVerticalStyles.gridList}>
          {this.state.smoothies.map((smoothie) => (
            <GridTile key={smoothie.id} title={smoothie.name}>
              <img src={smoothie.image}/>
            </GridTile>
          ))}
        </GridList>
      </div>
    );
  }
}

export default GridViewMenuBev;
