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
            <img src="https://www.arla.com/globalassets/arla-global/milk/open-your-senses/smoothies/images/open_your_senses_smoothies-split_deck_berry-morning-boost.jpg?preset=half-desktop" />

          </div>
          <div>
            <img src="https://www.arla.com/globalassets/arla-global/milk/open-your-senses/smoothies/images/open_your_senses_smoothies-split_deck_broccoli-breaky.jpg?preset=half-desktop"/>

          </div>
          <div>
            <img src="https://www.arla.com/globalassets/arla-global/milk/open-your-senses/smoothies/images/open_your_senses_smoothies-split_deck_green-power-bowl.jpg?preset=half-desktop"/>

          </div>
          <div>
            <img src="https://www.arla.com/globalassets/arla-global/milk/open-your-senses/smoothies/images/open_your_senses_smoothies-split_power-up.jpg?preset=half-desktop"/>

          </div>
          <div>
            <img src="https://www.arla.com/globalassets/arla-global/milk/open-your-senses/tea/images/open_your_senses_tea-link.jpg?preset=half-desktop"/>

          </div>
          <div>
            <img src="https://www.arla.com/globalassets/arla-global/milk/open-your-senses/coffee/images/open_your_senses_coffee-link.jpg?preset=half-desktop"/>

          </div>

        </Carousel>
      </div>
    );
  }
}

export default CarouselView;
