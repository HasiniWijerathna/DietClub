import React from 'react';
import BaseContainer from './BaseContainer';
import {Tabs, Tab} from 'material-ui/Tabs';
import GridViewMenuBev from '../components/GridViewMenuBev';
import GirdViewMenuSalads from '../components/GirdViewMenuSalads';
/**
* Represents the view logic
*/

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400
  }
};

class Menu extends BaseContainer {

  constructor(props) {
    super(props);
    this.state = {
      value: 'a'
    };
  }

  handleChange(value) {
    this.setState({value: value});
  }

  /**
* Describes the elements on the About Us page
* @return {String} HTML elements
*/
  render() {
  const handleChange = this.handleChange.bind(this);
  const headerContainerStyle = {
    backgroundColor: '#00BF9A'
  };
    return (
      <div>
      <div style={headerContainerStyle}>
        <center>
          MENU
        </center>
      </div>
      <Tabs value={this.state.value} onChange={handleChange}>
        <Tab label="Beverages" value="a">
          <div>
            <div>
              <GridViewMenuBev/>
            </div>
          </div>
        </Tab>
        <Tab label="Sandwiches" value="b">
          <div>
            <div>
              <GirdViewMenuSalads/>
            </div>
          </div>
        </Tab>
      </Tabs>
      </div>
    );
  }
}

export default Menu;
