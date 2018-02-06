import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HeaderBar from '../components/HeaderBar';
import Footer from '../components/Footer';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {grey900, grey700, green500, yellow600} from 'material-ui/styles/colors';
import {getAllSmoothies, getUsers} from '../services/juiceBarService';
//import  $ from 'jquery-ui';
////import 'jquery';
import MediaQuery from 'react-responsive';

const primaryColor = '#00BF9A';

const muiTheme = getMuiTheme({
  fontFamily: 'Overpass, sans-serif',
  palette: {
    primary1Color: primaryColor,
    textColor: grey900,
    accent1Color: yellow600
  }
});
class App extends React.PureComponent {

  constructor(props) {
    super(props);

    this.setLocalStorage = this.setLocalStorage.bind(this);
   // $( document ).tooltip();
console.log(window.$);

$(document).ready(function(){
  $(document).tooltip()
});

  $('button1').click(function(event){
$('effect').show();
});

  $('button2').click(function(event){
$('effect').hide();
});
  }

  componentDidMount() {
    console.log('comoent did mount');
    console.log(JSON.stringify(getAllSmoothies()));
    // setter
    localStorage.setItem('smoothies', JSON.stringify(getAllSmoothies()));

    const s = localStorage.getItem('smoothies');
    const store = JSON.parse(s)
    console.log(s);
    this.setLocalStorage();
  }

  setLocalStorage() {
    console.log('set locat');
    console.log(JSON.stringify(getAllSmoothies()));
    // setter
    localStorage.setItem('smoothies', JSON.stringify(getAllSmoothies()));
    //localStorage.setItem('users', JSON.stringify(getUsers()));

    const users = localStorage.getItem('users');
    const store = JSON.parse(users)
    console.log(store);
  }


  /**
* Describes the elements on the About Us page
* @return {String} HTML elements
*/
  render() {

    return (
      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
    <div>
      <HeaderBar/>
      <section>
        {this.props.children || 'Diat Club is loading...'}
      </section>
      <Footer/>
    </div>
  </MuiThemeProvider>

    </div>

)
  }
}

App.propTypes = {
  children: React.PropTypes.element
};

export default App;
