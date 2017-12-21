import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HeaderBar from '../components/HeaderBar';
import Footer from '../components/Footer';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {grey900, grey700, green500, yellow600

} from 'material-ui/styles/colors';

import MediaQuery from 'react-responsive';

const primaryColor = '#00BF9A';

const muiTheme = getMuiTheme({
  fontFamily: 'Overpass, sans-serif',
  palette: {
    primary1Color: primaryColor,
    textColor: grey900,
    accent1Color: yellow600,
  },
});

const App = ({children}) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div>

          <div>
            <div id="player">
              <MediaQuery query="(min-device-width: 768px)">
                <div>
                  hvfhgvjgvghvgh
                  <section>
                    {children || 'Diat Club is loading...'}
                  </section>
                </div>
              </MediaQuery>
              <MediaQuery query="(max-device-width: 480px)">
                <div>
                  <HeaderBar/>
                  <section>
                    {children || 'Diat Club is loading...'}
                  </section>
                </div>
              </MediaQuery>
              <MediaQuery query="(min-device-width: 667px)">
                <div>
                  <section>
                    {children || 'Diat Club is loading...'}
                  </section>
                </div>
              </MediaQuery>
            </div>
          </div>

    </div>













  </MuiThemeProvider>
);

App.propTypes = {
  children: React.PropTypes.element,
};

export default App;
