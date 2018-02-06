import React from 'react';
import BaseContainer from './BaseContainer';
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
import {getAllaboutUs} from '../services/juiceBarService';
import {getUsers, getProfile, getAllEvents, getAllNewsletters, getAllBranches} from '../services/juiceBarService';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import {red500} from 'material-ui/styles/colors';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import RaisedButton from 'material-ui/RaisedButton';
import {sendMail} from '../services/urlFactory';
import Dialog from 'material-ui/Dialog';
import axios from 'axios';
import {browserHistory} from 'react-router';
/**
* Represents the view logic
*/
class FavItems extends BaseContainer {
  /**
* Class constructor
* @param {Object} props User define component
*/
  constructor(props) {

    const userResults = localStorage.getItem('user');
    let user = JSON.parse(userResults);
    super(props);

    this.state = {
      mailedEvents: false,
      mailedNews: false,
      mailedBranches: false,
      mailedTeam: false,
      users: getUsers(),
      currentuser: user,
      slideIndex: 0,
      staff: user.favePeople,
      branches: getAllBranches(),
      events: getAllEvents(),
      newsletters: getAllNewsletters(),
      users: getUsers(),
      faveMembers: [],
      faveBranches: [],
      faveNews: [],
      faveEvents: [],
      newsletters: getAllNewsletters(),
      emailSuccess: false
    };
    this.getFavorites = this.getFavorites.bind(this);
    this.getFavorites();
      this. handleClose = this.handleClose.bind(this);
  }

  handleChange(value) {
    this.setState({slideIndex: value});
  }

  getFavorites() {
    console.log(this.state.staff);
    const staff = this.state.staff;
    const branches = this.state.branches;
    const events = this.state.events;
    const newsletters = this.state.newsletters;
    const matched = staff.map((member) => {
      const favMember = this.state.currentuser.favePeople.map((faveMem) => {
        if (member.id == faveMem) {
          this.state.faveMembers.push(member);
        }
      })
    });

    const matchedBranch = branches.map((matchedBranch) => {
      const favBranch = this.state.currentuser.favBranches.map((branch) => {
        if (matchedBranch.id == branch) {
          this.state.faveBranches.push(matchedBranch);
        }
      })
    });
    const matchedEvent = events.map((matchedEvent) => {
      const faveEvent = this.state.currentuser.faveEvent.map((faveEvent) => {
        if (matchedEvent.id == faveEvent) {
          this.state.faveEvents.push(matchedEvent);
        }
      })
    });
    const matchedNews = newsletters.map((newsletter) => {
      const favNews = this.state.currentuser.faveNews.map((faveNews) => {
        if (newsletter.id == faveNews) {
          this.state.faveNews.push(newsletter);
        }
      })
    });
  }

  emailEvents() {
    console.log('emailContent.toString()');
      this.setState({emailSuccess: true});
      this.setState({emailSuccess: true});
    const results = localStorage.getItem('user');
    let user = JSON.parse(results);
    let emailContent = [];
    if(user.faveEvent.length) {
      user.faveEvent.forEach((event) => {
        emailContent.push(event.name);
        emailContent.push(event.branch);
        emailContent.push(event.date);
        emailContent.push(event.time);
      });
    }

      this.setState({emailSuccess: true});
    console.log(emailContent.toString());
    axios.post(sendMail(), {
      email: 'wijerathna.hasini@gmail.com',
      text: `Favorite Events : ${user.name}`,
      description: emailContent.length?emailContent.toString():'No event has been added'
    }).then(function(response) {
      // setTimeout(function() {
      //   browserHistory.push('/');
      // }, 1000);

      console.log(response);
    }).catch(function(error) {
      console.log(error);
    });

  //this.setState({emailSuccess: false});

  }

  emailBranhes() {
    this.setState({emailSuccess: true});
    const results = localStorage.getItem('user');
    let user = JSON.parse(results);
    let emailContent = [];
    if(user.favBranches.length) {
      user.favBranches.forEach((event) => {
        emailContent.push(event.name);
        emailContent.push(event.address);
      });
    }

    console.log(emailContent.toString());
    axios.post(sendMail(), {
      email: 'wijerathna.hasini@gmail.com',
      text: `Favorite branches : ${user.name}`,
      description: emailContent.length? emailContent.toString() : 'No branch has been added to your favorites!'
    }).then(function(response) {

      console.log(response);
    }).catch(function(error) {
      console.log(error);
    });
    // setTimeout(function() {
    //   browserHistory.push('/');
    // }, 1000);

  //this.setState({emailSuccess: false});
  }

  emailTeam() {
      this.setState({emailSuccess: true});
    const results = localStorage.getItem('user');
    let user = JSON.parse(results);
    let emailContent = [];
      this.setState({emailSuccess: true});
    if(  user.favePeople.length) {
      user.favePeople.forEach((event) => {
        emailContent.push(event.fulName);
        emailContent.push(event.branch);
      });
    }
      this.setState({emailSuccess: true});
    axios.post(sendMail(), {
      email: 'wijerathna.hasini@gmail.com',
      text: `Favorite team members : ${user.name}`,
      description: emailContent.length?emailContent.toString(): 'No team member has been added to your favorites!'
    }).then(function(response) {

      console.log(response);
    }).catch(function(error) {
      console.log(error);
    });
    // setTimeout(function() {
    //   browserHistory.push('/');
    // }, 1000);
  //this.setState({emailSuccess: false});
  }

  emailNewsletters() {
    this.setState({emailSuccess: true});
    const results = localStorage.getItem('user');
    let user = JSON.parse(results);
    let emailContent = [];
      this.setState({emailSuccess: true});
    if(user.faveNews.length){
      user.faveNews.forEach((event) => {
        emailContent.push(event.name);
      });
    }

    axios.post(sendMail(), {
      email: 'wijerathna.hasini@gmail.com',
      text: `Feedback of customer : ${user.name}`,
      description: emailContent.length? emailContent.toString(): 'No newsletters has been added to your favorites!'
    }).then(function(response) {

      console.log(response);
    }).catch(function(error) {
      console.log(error);
    });
    // setTimeout(function() {
    //   browserHistory.push('/');
    // }, 1000);

  }


  handleClose() {
    this.setState({
      emailSuccess: false,
    });
  }

  /**
* Describes the elements on the About Us page
* @return {String} HTML elements
*/
  render() {
    const userResults = localStorage.getItem('user');
    let user = JSON.parse(userResults);
    console.log(user);
    console.log(user.favBranches
);
    const currentuser = this.state.currentuser;
    const handleChange = this.handleChange.bind(this);
    const emailNewsletters = this.emailNewsletters.bind(this);
    const emailTeam = this.emailTeam.bind(this);
    const emailBranhes = this.emailBranhes.bind(this);
    const emailEvents = this.emailEvents.bind(this);
    const handleClose = this.handleClose.bind(this);
    const newsletters = this.state.faveNews;
    const branches = this.state.faveBranches;
    const team = user.favePeople;
    const events = this.state.faveEvents;
    let favenewsletters = [];
    let faveEvent = [];
    let favePlaces = [];
    let faveTeam = [];
    let newsContent = null;
    let eventContent = null;
    let branchContent = null;
    let teamContent = null;
    if (user.faveNews) {
      newsContent = (favenewsletters = user.faveNews.map((newsletter) => {
        return (<div>
          <div >
            <Card >
              <CardMedia overlay={<CardTitle title = {
                  newsletter.name
                } />}>
                <div id="favorite">
                </div>
                <img src={newsletter.image} alt=""/>
              </CardMedia>
            </Card>
          </div>
        </div>);
      }));

    }
    if (user.faveEvent) {
      eventContent = (faveEvent = user.faveEvent.map((event) => {
        return (<div >
          <Card >
            <CardMedia overlay={<CardTitle title = {
                event.name
              } />}>
              <div id="favorite">
              </div>
              <img src={event.image} alt=""/>
            </CardMedia>
          </Card>
        </div>);
      }));
    }

    if (user.favBranches) {
      branchContent = ( user.favBranches.map((branch) => {
        return (<div >
          <Card >
            <CardMedia overlay={<CardTitle title = {
                branch.name
              } />}>
              <div id="favorite">
              </div>
              <img src={branch.image} alt=""/>
            </CardMedia>
          </Card>
        </div>);
      }));

    }

    if (user.favePeople) {
      teamContent = (faveTeam = user.favePeople.map((member) => {
        return (<div >
          <Card >
            <CardMedia overlay={<CardTitle title = {
                member.name
              } />}>
              <div id="favorite">
              </div>
              <img src={member.image} alt=""/>
            </CardMedia>
          </Card>
        </div>);
      }));
    }

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

    const headerContainerStyle = {
      backgroundColor: '#00BF9A'
    };

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

    return (<div>
      <div style={headerContainerStyle}>
        <center>
          FAVORITES
        </center>
      </div>
      <Tabs onChange={handleChange} value={this.state.slideIndex}>
        <Tab label="Events" value={0}/>
        <Tab label="Newsletters" value={1}/>
        <Tab label="Team" value={2}/>
        <Tab label="Branches" value={3}/>
      </Tabs>
      <Dialog
     modal={false}
     open={this.state.emailSuccess}
     onRequestClose={this.handleClose}
   >
     Email was sent!
   </Dialog>
      <SwipeableViews index={this.state.slideIndex} onChangeIndex={handleChange}>

        <div>

          <div id="emailToMe">
            <center>
              <RaisedButton label="Email events" onClick={emailEvents} buttonStyle={{
                  borderRadius: 25
                }} style={{
                  borderRadius: 25
                }} labelColor={'#FFFFFF'} backgroundColor={'#00BF9A'}/>
            </center>
          </div>
          {eventContent}
        </div>
        <div>
          <div id="emailToMe">
            <center>
              <RaisedButton label="Email news" onClick={emailNewsletters} buttonStyle={{
                  borderRadius: 25
                }} style={{
                  borderRadius: 25
                }} labelColor={'#FFFFFF'} backgroundColor={'#00BF9A'}/>
            </center>
          </div>
          {newsContent}</div>
        <div>
          <div id="emailToMe">
            <center>
              <RaisedButton label="Email team"  onClick={emailTeam} buttonStyle={{
                  borderRadius: 25
                }} style={{
                  borderRadius: 25
                }} labelColor={'#FFFFFF'} backgroundColor={'#00BF9A'}/>
            </center>
          </div>
          {teamContent}
        </div>
        <div>
          <div id="emailToMe">
            <center>
              <RaisedButton label="Email branch" onClick={emailBranhes} buttonStyle={{
                  borderRadius: 25
                }} style={{
                  borderRadius: 25
                }} labelColor={'#FFFFFF'} backgroundColor={'#00BF9A'}/>
            </center>
          </div>
          {branchContent}
        </div>
      </SwipeableViews>
    </div>);
  }
}

export default FavItems;
