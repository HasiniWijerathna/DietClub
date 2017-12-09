import React from 'react';
import {Carousel} from 'react-responsive-carousel';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
/**
* Represents the view logic
*/
class SpotItCarousel extends React.Component {

/**
* Class constructor
* @param {Object} props User define component
*/
  constructor(props) {

    super(props);

    this.changeSlide = this.changeSlide.bind(this);

    this.state = {
      index: 0,
      elements: [
        <div>
          <Card>
            <CardHeader
              title="URL Avatar"
              subtitle="Subtitle"
              avatar="http://thejuiceparlor.com/wp-content/uploads/2015/09/tjp-bg-temp.jpg"
            />
              <img src="http://www.kaizennaturals.com/wp-content/uploads/2017/10/Neopolitan-Smoothie.jpg" alt="" />
            <CardTitle title="Card title" subtitle="Card subtitle" />
            <CardText>
              ELEMENT 1
            </CardText>
            <CardActions>
              <FlatButton label="Action1" onClick={this.changeSlide} />
            </CardActions>
          </Card>
        </div>
      ],

      items: [
        <div>
          <Card>
            <CardHeader
              title="URL Avatar"
              subtitle="Subtitle"
              avatar="http://thejuiceparlor.com/wp-content/uploads/2015/09/tjp-bg-temp.jpg"
            />
              <img src="http://thejuiceparlor.com/wp-content/uploads/2015/09/tjp-bg-temp.jpg" alt="" />
            <CardTitle title="Card title" subtitle="Card subtitle" />
            <CardText>
            ELEMENT 2
            </CardText>
            <CardActions>
              <FlatButton label="Action1" onClick={this.changeSlide}/>
            </CardActions>
          </Card>
        </div>,

        <div>
          <Card>
            <CardHeader
              title="URL Avatar"
              subtitle="Subtitle"
              avatar="http://thejuiceparlor.com/wp-content/uploads/2015/09/tjp-bg-temp.jpg"
            />
              <img src="http://www.kaizennaturals.com/wp-content/uploads/2017/10/Neopolitan-Smoothie.jpg" alt="" />
            <CardTitle title="Card title" subtitle="Card subtitle" />
            <CardText>
              ELEMENT 3
            </CardText>
            <CardActions>
              <FlatButton label="Action1" onClick={this.changeSlide}/>
            </CardActions>
          </Card>
        </div>
      ]
    };
  }

  /**
  * Handle the change slide event
  */
    changeSlide()  {
    console.log(this.state.elements);
    const newElement = this.state.items[this.state.index];

    if(newElement) {
      this.setState({
        index: this.state.index+1,
        elements: this.state.elements.concat(newElement)
      });
    }
  }

  render() {
    return (
      <div>
        <Carousel showArrows swipeScrollTolerance={0} autoPlay={true}>
          {this.state.elements}
        </Carousel >
      </div>);
      }
    }

    export default SpotItCarousel;
