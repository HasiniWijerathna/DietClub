import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HeaderBar from '../components/HeaderBar';
import Footer from '../components/Footer';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {grey900, grey700, green500, yellow600

} from 'material-ui/styles/colors';

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
      <HeaderBar/>
      <section>
        {children || 'Diat Club is loading...'}
      </section>
    </div>
  </MuiThemeProvider>
);

App.propTypes = {
  children: React.PropTypes.element,
};

export default App;
