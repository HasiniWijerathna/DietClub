import React from 'react';
import BaseContainer from './BaseContainer';
import {Tabs, Tab} from 'material-ui/Tabs';
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

    return (
      <Tabs value={this.state.value} onChange={handleChange}>
        <Tab label="Beverages" value="a">
          <div>
            <h2 style={styles.headline}>Controllable Tab A</h2>
            <p>
              Tabs are also controllable if you want to programmatically pass them their values. This allows for more functionality in Tabs such as not having any Tab selected or assigning them different values.
            </p>
          </div>
        </Tab>
        <Tab label="Salads" value="b">
          <div>
            <h2 style={styles.headline}>Controllable Tab B</h2>
            <p>
              This is another example of a controllable tab. Remember, if you use controllable Tabs, you need to give all of your tabs values or else you wont be able to select them.
            </p>
          </div>
        </Tab>
      </Tabs>
    );
  }
}

export default Menu;
