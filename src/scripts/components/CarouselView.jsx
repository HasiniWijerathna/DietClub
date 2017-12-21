import React from 'react';
import {Carousel} from 'react-responsive-carousel';
import {Media, Player, controls} from 'react-media-player'
const {PlayPause, MuteUnmute} = controls
import MediaQuery from 'react-responsive';
// import { MediaQuery } from "react-native-responsive";
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
      <div id="player">
        <MediaQuery query="(min-device-width: 768px)">
          <div>
            <div id="logo"><img src="http://www.freelogoservices.com/api/main/images/1j+ojl1FOMkX9WypfBe43D6kjfCGqRFInRnJwXs1M3EMoAJtlSEuhvVu9v4z" alt="Logo is down" width="250" height="135"/></div>
            <Media autoPlay={true}>
              <div className="media">
                <div >
                  <Player poster="http://www.freelogoservices.com/api/main/images/1j+ojl1FOMkX9WypfBe43D6kjfCGqRFInRnJwXs1M3EMoAJtlSEuhvVu9v4z" autoPlay={true} loop={true} width="1364" src="https://www.arla.com/globalassets/arla-global/milk/open-your-senses/smoothies/videos/open_your_senses_smoothies-split_deck-tropical_energiserconverted.mp4"/>
                </div>
              </div>
            </Media>
          </div>
        </MediaQuery>
        <MediaQuery query="(max-device-width: 480px && min-device-width: 667px )">
          <div>
            <div id="logo"><img src="http://www.freelogoservices.com/api/main/images/1j+ojl1FOMkX9WypfBe43D6kjfCGqRFInRnJwXs1M3EMoAJtlSEuhvVu9v4z" alt="Girl in a jacket" width="90" height="53"/></div>
            <Media autoPlay={true}>
              <div className="media">
                <div >
                  <Player poster="http://www.freelogoservices.com/api/main/images/1j+ojl1FOMkX9WypfBe43D6kjfCGqRFInRnJwXs1M3EMoAJtlSEuhvVu9v4z" autoPlay={true} loop={true} width="375" src="https://www.arla.com/globalassets/arla-global/milk/open-your-senses/smoothies/videos/open_your_senses_smoothies-split_deck-tropical_energiserconverted.mp4"/>
                </div>
              </div>
            </Media>
          </div>
        </MediaQuery>

      </div>
    </div>
  );}
}

export default CarouselView;
