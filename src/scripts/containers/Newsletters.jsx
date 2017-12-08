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

import Divider from 'material-ui/Divider';
import {getAllNewsletters} from '../services/juiceBarService';
/**
* Represents the view logic
*/
class Newsletters extends BaseContainer {

  /**
* Class constructor
* @param {Object} props User define component
*/
  constructor(props) {
    super(props);

    this.state = {
      newsletters: getAllNewsletters()
    };
  }
  /**
* Describes the elements on the About Us page
* @return {String} HTML elements
*/
  // render() {
  //   const newsletters = this.state.newsletters;
  //   console.log(getAllNewsletters());
  //   return (

  //     let content =null;
  //   content=(
  //
  //    if(newsletters.length) {
  //      viewNewsletters = newsletters.map((Newsletter) => {
  //        return (
  //          <div key={Newsletter.id}>
  //            <Card key={Newsletter.id}>
  //                <CardTitle>
  //                  {Newsletter.content}
  //                </CardTitle>
  //            </Card>
  //          </div>
  //        );
  //      })
  //    } else {
  //      viewNewsletters = (<div><formgroup>
  //        <h3>No newsletters yet!</h3>
  //      </formgroup></div>);
  //    }
  //      );
  //
  //
  // }

  render() {
    //  let content = null;
    const newsletters = this.state.newsletters;
    console.log(getAllNewsletters());
    let viewNewsletters = [];
    const content = (viewNewsletters = newsletters.map((Newsletter) => {
      return (
        <div key={Newsletter.id}>
          <Card key={Newsletter.id}>
            <CardMedia overlay={< CardTitle title = "Overlay title" subtitle = "Overlay subtitle" />}>
              <img src={Newsletter.image} alt=""/>
            </CardMedia>
            <CardTitle>
              {Newsletter.content}
            </CardTitle>
          </Card>
  

        </div>
      );
    }));
    return (
      <div>
        {content}
      </div>
    );
  }
}

export default Newsletters;
