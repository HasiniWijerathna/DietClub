import React from 'react';
import {Carousel} from 'react-responsive-carousel';

/**
* Represents the view logic
*/
class CarouselView extends React.Component {

  /**
  * Describes the elements on the About Us page
  * @return {String} HTML elements
  */
  render() {
    
    return (
      <div>
        <Carousel showArrows swipeScrollTolerance={0} autoPlay={true} infiniteLoop={true}>
          <div>
            <img src="https://cdn.bormiolirocco.com/wp-content/uploads/2016/08/Smoothie_antiossidante.jpg"/>

          </div>
          <div>
            <img src="https://wallpaperscraft.com/image/berries_smoothies_blueberries_currants_107543_1920x1080.jpg"/>

          </div>
          <div>
            <img src="http://www.kaizennaturals.com/wp-content/uploads/2017/10/Neopolitan-Smoothie.jpg"/>

          </div>
          <div>
            <img src="http://thejuiceparlor.com/wp-content/uploads/2015/09/tjp-bg-temp.jpg"/>

          </div>

        </Carousel>
      </div>
    );
  }
}

export default CarouselView;
