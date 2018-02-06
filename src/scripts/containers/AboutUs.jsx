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

import {getAllaboutUs} from '../services/juiceBarService';
import IconButton from 'material-ui/IconButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import {red500} from 'material-ui/styles/colors';
import {getAllNewsletters, updateUser} from '../services/juiceBarService';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
/**
* Represents the view logic
*/
class AboutUs extends BaseContainer {
  /**
* Class constructor
* @param {Object} props User define component
*/
  constructor(props) {

    super(props);

    this.state = {
      people: getAllaboutUs(),
      personLiked: this.createLikeMap(),
      // alertOpen: false
    };

    this.renderPeople = this.renderPeople.bind(this);
  }

  createLikeMap() {
    const personLiked = {};
    const results = localStorage.getItem('user');
    const user = JSON.parse(results);
    const favouritePeople = (user.favePeople || []);

    favouritePeople
      .forEach((person) => {
        personLiked[person.id] = true;
      });

    return personLiked;
  }

  /**
   * Alert handle alert
   */
  handleOpen(selectedPerson) {
    const results = localStorage.getItem('user');
    const user = JSON.parse(results);

    user.favePeople.push(selectedPerson);
    localStorage.setItem('user', JSON.stringify(user));
      updateUser(user.id);
    console.log(user);

    const personLiked = {
      ...this.state.personLiked,
      [selectedPerson.id]: true,
    };

    this.setState({personLiked});
  };

  /**
   * Alert handle alert
   */
  handleClose(selectedPerson) {
    let removeNewsIndex = null;
    const results = localStorage.getItem('user');
    let user = JSON.parse(results);
    user.favePeople.forEach((likedPerson, index) => {
      if (likedPerson.id === selectedPerson.id) {
        removeNewsIndex = index;
        console.log('Must remove item number ' + index);
      }
    });
    user.favePeople.splice(removeNewsIndex, 1);
    localStorage.setItem('user', JSON.stringify(user));
      updateUser(user.id);
    console.log(user);

    const personLiked = {
      ...this.state.personLiked,
      [selectedPerson.id]: false,
    };

    this.setState({personLiked});
  };

  renderPeople() {
    const {people} = this.state;
    const content = people.map((person) => {
      const handleOpen = this.handleOpen.bind(this, person);
      const handleClose = this.handleClose.bind(this, person);
      const iconButton = {
        zIndex: 1299,
      };
      let favouriteButton = null;

      if (this.state.personLiked[person.id]) {
        favouriteButton = (
          <div>
            <IconButton touch={true} style={iconButton} onClick={handleClose} color={red500}>
              <ActionFavorite color={red500}/>
            </IconButton>
          </div>
        );
      } else {
        favouriteButton = (
          <div>
            <IconButton touch={true} style={iconButton} onClick={handleOpen}>
              <ActionFavoriteBorder color={red500}/>
            </IconButton>
          </div>
        );
      }

      return (
        <div key={person.id}>
          <Card key={person.id}>



          </Card>
          <CardMedia overlay={<CardTitle title = {
              person.fullName
            } />}>
            <div id="favorite">
              {favouriteButton}
            </div>
            <img src={person.image} alt=""/>
          </CardMedia>
        </div>
      )
    });

    return content;
  }

  /**
* Describes the elements on the About Us page
* @return {String} HTML elements
*/
  render() {
    // const newsletters = this.state.people;
    // const iconButton = {};
    // let favouriteButton = null;
    // let viewNewsletters = [];
    // const content = (viewNewsletters = newsletters.map((newsletter) => {
    //   // const handleOpen = this.handleOpen.bind(this, newsletter);
    //   // const handleClose = this.handleClose.bind(this, newsletter);
    //   const handleOpen = console.log;
    //   const handleClose = console.log;
    //   if (this.state.alertOpen) {
    //     favouriteButton = (<div>
    //       <IconButton touch={true} style={iconButton} onClick={handleClose} color={red500}>
    //         <ActionFavorite color={red500}/>
    //       </IconButton>
    //     </div>);
    //   } else {
    //     favouriteButton = (<div>
    //       <IconButton touch={true} style={iconButton} onClick={handleOpen}>
    //         <ActionFavoriteBorder color={red500}/>
    //       </IconButton>
    //     </div>);
    //   }
    //
    //   return (<div key={newsletter.id}>
    //     <Card key={newsletter.id}>
    //       <CardMedia overlay={<CardTitle title = {
    //           newsletter.fullName
    //         }
    //         subtitle = {
    //           newsletter.branch
    //         } />}>
    //         {favouriteButton}
    //         <img src={newsletter.image} alt=""/>
    //       </CardMedia>
    //     </Card>
    //   </div>);
    // }));

    return (
      <div>
        {this.renderPeople()}
      </div>
    );
  }
}

export default AboutUs;
