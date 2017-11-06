import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HeaderBar from '../components/HeaderBar';
import Footer from '../components/Footer';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {grey900, grey700} from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  fontFamily: 'Overpass, sans-serif',
  palette: {
    primary1Color: grey700,
    textColor: grey900,
  },
});

const App = ({children}) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div>
      <HeaderBar/>
      <section>
        {children || 'Bloggger App loading...'}
      </section>
      <Footer/>
    </div>
  </MuiThemeProvider>
);

App.propTypes = {
  children: React.PropTypes.element,
};

export default App;
