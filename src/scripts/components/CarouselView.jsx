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


      <MediaQuery query="(orientation: portrait)">
        <div>
          <MediaQuery query="(min-device-width: 375px)">
            <MediaQuery query="(max-device-width: 812px) ">
              <div>
                <Media autoPlay={true}>
                  <div className="media">
                    <div >
                      <Player poster="http://www.freelogoservices.com/api/main/images/1j+ojl1FOMkX9WypfBe43D6kjfCGqRFInRnJwXs1M3EMoAJtlSEuhvVu9v4z" autoPlay={true} loop={true} width="424"src="https://www.arla.com/globalassets/arla-global/milk/open-your-senses/smoothies/videos/open_your_senses_smoothies-full_deck-heroconverted.mp4"/>
                    </div>
                  </div>
                </Media>
              </div>
                  </MediaQuery>


    </MediaQuery>

    <MediaQuery query="(min-device-width: 1024px) ">

              <div>

                <Media autoPlay={true}>
                  <div className="media">
                    <div >
                      <Player poster="http://www.freelogoservices.com/api/main/images/1j+ojl1FOMkX9WypfBe43D6kjfCGqRFInRnJwXs1M3EMoAJtlSEuhvVu9v4z" autoPlay={true} loop={true} width="1064"src="https://www.arla.com/globalassets/arla-global/milk/open-your-senses/smoothies/videos/open_your_senses_smoothies-full_deck-heroconverted.mp4"/>
                    </div>
                  </div>
                </Media>
              </div>



          </MediaQuery>

        </div>
      </MediaQuery>

      <MediaQuery query="(orientation: landscape)">
        <div>
          <Media autoPlay={true}>
            <div className="media">
              <div >
                <Player poster="http://www.freelogoservices.com/api/main/images/1j+ojl1FOMkX9WypfBe43D6kjfCGqRFInRnJwXs1M3EMoAJtlSEuhvVu9v4z" autoPlay={true} loop={true} width="1364" src="https://www.arla.com/globalassets/arla-global/milk/open-your-senses/smoothies/videos/open_your_senses_smoothies-full_deck-heroconverted.mp4"/>
              </div>
            </div>
          </Media>
        </div>
      </MediaQuery>

          </div>
            </div>
    );
  }
}

export default CarouselView;
