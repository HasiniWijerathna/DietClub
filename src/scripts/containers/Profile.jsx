import React from 'react';
import BaseContainer from './BaseContainer';
import {getUsers, getProfile} from '../services/juiceBarService';
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card';
import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import RaisedButton from 'material-ui/RaisedButton';
import {browserHistory} from 'react-router';
/**
* Represents the view logic
*/
class Profile extends BaseContainer {
  /**
* Class constructor
* @param {Object} props User define component
*/
  constructor(props) {
    super(props);

    const userResults = localStorage.getItem('user');
    let user = JSON.parse(userResults);

    this.state = {
      users: getUsers(),
      currentuser: JSON.parse(userResults),
      slideIndex: 0
    };
    //console.log(this.state.currentUser);
    this.checkUserValidity = this.checkUserValidity.bind(this);
    this.checkUserValidity();
  }

  checkUserValidity() {
    const userResults = localStorage.getItem('user');
    let user = JSON.parse(userResults);
    this.setState({currentUser: getProfile()});
    console.log('user');
    console.log(user);

    if (!this.state.currentuser.userName){

      browserHistory.push('/login');
    }

  }

  handleChange(value) {
    this.setState({slideIndex: value});
  }
  navigatefavItems() {
    browserHistory.push('/favItems');
  }
  navigateSettings() {
    browserHistory.push('/settings');
  }
  logOut() {
    const userResults = localStorage.getItem('user');
    let user = JSON.parse(userResults);
    const removeUser = {
      id: 0,
      name: '',
      userName: '',
      password: '',
      email: '',
      image:'',
      points: 0,
      favePeople: [],
      favBranches: [],
      faveNews: [],
      faveEvent: []
    }
    localStorage.setItem('user', JSON.stringify(removeUser));
    const resultEmptyUser = localStorage.getItem('user');
    let emptyUser = JSON.parse(resultEmptyUser);

    browserHistory.push('/');

  }
  /**
* Describes the elements on the About Us page
* @return {String} HTML elements
*/
  render() {
    console.log(this.state.currentuser.userName);
    const currentuser = this.state.currentuser;
    const handleChange = this.handleChange.bind(this);
    const navigatefavItems = this.navigatefavItems.bind(this);
    const navigateSettings = this.navigateSettings.bind(this);
    const logOut = this.logOut.bind(this);

    const styles = {
      headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400
      },
      slide: {
        padding: 10
      }
    };

    let view = null;
    if (this.state.currentuser.userName) {
      view = (<div>
        <div id="cardButton">
          <Card key={currentuser.id}>
            <CardMedia overlay={<CardTitle title = {
                currentuser.name
              }
              subtitle = {
                `Rewards ${currentuser.points}`
              } />}>
              <img src={currentuser.image} alt=""/>
            </CardMedia>
          </Card>
        </div>

        <div>
          <div id="cardButton">
            <center>
              <RaisedButton label="Your Favorites" onClick={navigatefavItems} buttonStyle={{
                  borderRadius: 25
                }} style={{
                  borderRadius: 25
                }} labelColor={'#FFFFFF'} backgroundColor={'#00BF9A'}/>
            </center>
          </div>
          <div id="cardButtonSecond">
            <center>
              <RaisedButton label="Profile Settings" onClick={navigateSettings} buttonStyle={{
                  borderRadius: 25
                }} style={{
                  borderRadius: 25
                }} labelColor={'#FFFFFF'} backgroundColor={'#00BF9A'}/>
            </center>
          </div>
          <div id="cardButtonSecond">
            <center>
              <RaisedButton label=" Logout" onClick={logOut} buttonStyle={{
                  borderRadius: 25
                }} style={{
                  borderRadius: 25
                }} labelColor={'#FFFFFF'} backgroundColor={'#00BF9A'}/>
            </center>
          </div>

        </div>
      </div>);
    } else {
      view = (<div>
        Please login
      </div>)
    }

    return (<div>
      {view}
    </div>);
  }
}

export default Profile;
