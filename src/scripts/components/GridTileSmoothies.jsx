import React from 'react';

import {GridList, GridTile} from 'material-ui/GridList';

import {getAllJuices} from '../services/juiceBarService';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

/**
* Represents the view logic
*/
class GridTileSmoothies extends React.Component {

/**
* Class constructor
* @param {Object} props User define component
*/
  constructor(props) {

    super(props);

    this.state = {
      smoothies: getAllJuices()
    };

  }

/**
  * Describes the elements on the About Us page
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
      cellHeight: 400
    },
    titleStyle: {
      color: 'rgb(0, 188, 212)'
    }
  };

  return (
    <div>
      <GridList style={styles.gridList} cellHeight={180}>
        {this.state.smoothies.map((smoothie) => (
          <GridTile key={smoothie.id} title={smoothie.title} actionIcon={< IconButton >
            <StarBorder
              color="rgb(0, 188, 212)"/> < /IconButton>}
              titleStyle={styles.titleStyle}
              titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)">
            <img src={smoothie.image}/>
          </GridTile>
        ))}
      </GridList>
    </div>
  );
}
}

export default GridTileSmoothies;
