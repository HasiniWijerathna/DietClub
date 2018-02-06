import React, {Component} from 'react';
import {Link} from 'react-router';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import MediaQuery from 'react-responsive';
/**
 * Representing the header bar
 */
class Footer extends Component {
  /**
  * Describes the elements on the footer
  * @return {String} HTML elements
  */
  render() {
    const headerContainerStyle = {
      backgroundColor: '#00BF9A'
    };
    return (<div>

      <MediaQuery query="(orientation: landscape)">
        <div>
          <footer>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="footer">
                  <ul>
                    <p><center>® 2018 Diet Club, Inc. All rights reserved. </center></p>
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </footer>
        </div>
      </MediaQuery>

      <MediaQuery query="(orientation: portrait)">
        <div>
          <footer>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="footer">
                  <ul>
                    <p><center>® 2018 Diet Club, Inc. All rights reserved. </center></p>
                  </ul>
                </div>




              </div>
            </div>
          </div>
        </footer>
        </div>
      </MediaQuery>

    </div>);
  }
}
export default Footer;
