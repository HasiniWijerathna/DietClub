 import React from 'react';
import BaseContainer from './BaseContainer';

import SpotItCarousel from '../components/SpotItCarousel';
import {Step, Stepper, StepLabel} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {updateUser} from '../services/juiceBarService';
import TextField from 'material-ui/TextField';
import {browserHistory} from 'react-router';
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card';

/**
* Represents the view logic
*/
class SpotIt extends BaseContainer {
  /**
  * Class constructor
  * @param {Object} props User define component
  */
  constructor(props) {
    super(props);

    this.state = {
      finished: false,
      stepIndex: 0,
      stepOne: 'https://nutritiouslife.com/wp-content/uploads/2017/01/easy-smoothie-recipes-1.jpg',
      stepOneScore: '',
      stepTwoScore: '',
      stepThreeScore: '',
      stepFourScore: '',
      stepFiveScore: '',
      stepSixScore: '',
      stepSevenScore: '',
      stepEightScore: '',
      stepNineScore: '',
      totoalScore: ''
    };

    this.onChangeStepOne = this.onChangeStepOne.bind(this);
    this.onChangeStepTwo = this.onChangeStepTwo.bind(this);
    this.onChangeStepThree = this.onChangeStepThree.bind(this);
    this.onChangeStepFour = this.onChangeStepFour.bind(this);
    this.onChangeStepFive = this.onChangeStepFive.bind(this);
    this.onChangeStepSix = this.onChangeStepSix.bind(this);
    this.onChangeStepSeven = this.onChangeStepSeven.bind(this);
    this.onChangeStepEight = this.onChangeStepEight.bind(this);
    this.onChangeStepNine = this.onChangeStepNine.bind(this);

  }

  handleNext() {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 8
    });
  };

  handlePrev() {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({
        stepIndex: stepIndex - 1
      });
    }
  };

  onChangeStepOne(changeEvent) {
    const stepOne = `${changeEvent.target.value}`;
    this.setState({stepOneScore: stepOne});
  }

    onChangeStepTwo(changeEvent) {
      const stepOne = `${changeEvent.target.value}`;
      this.setState({stepTwoScore: stepOne});
    }

    onChangeStepThree(changeEvent) {
      const stepOne = `${changeEvent.target.value}`;
      this.setState({stepThreeScore: stepOne});
    }

    onChangeStepFour(changeEvent) {
      const stepOne = `${changeEvent.target.value}`;
      this.setState({stepFourScore: stepOne});

    }

    onChangeStepFive(changeEvent) {
      const stepOne = `${changeEvent.target.value}`;
      this.setState({stepFiveScore: stepOne});
      console.log(this.state.stepTwoScore);
      console.log(stepOne);
    }
    onChangeStepSix(changeEvent) {
      const stepOne = `${changeEvent.target.value}`;
      this.setState({stepSixScore: stepOne});
      console.log(this.state.stepTwoScore);
      console.log(stepOne);
    }
    onChangeStepSeven(changeEvent) {
      const stepOne = `${changeEvent.target.value}`;
      this.setState({stepSevenScore: stepOne});
      console.log(this.state.stepTwoScore);
      console.log(stepOne);
    }
    onChangeStepEight(changeEvent) {
      const stepOne = `${changeEvent.target.value}`;
      this.setState({stepEightScore: stepOne});
      console.log(this.state.stepTwoScore);
      console.log(stepOne);
    }
    onChangeStepNine(changeEvent) {
      const stepOne = `${changeEvent.target.value}`;
      this.setState({stepNineScore: stepOne});
      console.log(this.state.stepTwoScore);
      console.log(stepOne);
    }

  calculateTotalScore() {
    const results = localStorage.getItem('user');
    let user = JSON.parse(results);
    const total = parseInt(this.state.stepOneScore || 0 ) + parseInt(this.state.stepTwoScore  || 0) + parseInt(this.state.stepThreeScore  ||0)
    + parseInt(this.state.stepFourScore || 0 ) +  parseInt(this.state.stepFiveScore  || 0) +  parseInt(this.state.stepSixScore ||0 )
    + parseInt(this.state.stepSevenScore ||0 ) + parseInt(this.state.stepEightScore ||0) + parseInt(this.state.stepNineScore ||0 );
    user.points = total;
    localStorage.setItem('user', JSON.stringify(user));
    updateUser(user.id);
    console.log(user);
      browserHistory.push('/');
  }

  getStepContent(stepIndex) {
    console.log(this.state.stepOne);
    switch (stepIndex) {
      case 0:
        return <div>
          <Card>
            <div id="spotit-image-container" class="center-cropped" style={{
                backgroundImage: `url("https://d3h6k4kfl8m9p0.cloudfront.net/stories/R-Xi2f6AivTtzLcpYxVIIg-small.jpg")`
              }}></div>
              <div id="gameText">
            <TextField floatingLabelText="Number" type="number"  value={this.state.stepOneScore} onChange={this.onChangeStepOne}/><br/>
            </div>
          </Card>
        </div>;
      case 1:
        return <div>
          <Card>
            <div >
              <div id="spotit-image-container" class="center-cropped" style={{
                  backgroundImage: `url("http://www.thehindubusinessline.com/multimedia/dynamic/02424/BL02-MANGO__2424419e.jpg")`
                }}></div>
                <div id="gameText">
              <TextField floatingLabelText="Number" type="number"  value={this.state.stepTwoScore} onChange={this.onChangeStepTwo}/><br/>
              </div>
            </div>
          </Card>
        </div>;
      case 2:
        return <div>
          <Card>
            <div>
              <div id="spotit-image-container" class="center-cropped" style={{
                  backgroundImage: `url("http://www.simplehealthykitchen.com/wp-content/uploads/2015/01/7-Healthy-Smoothies-SimpleHealthyKitchen.com-1.jpg")`
                }}></div>
                <div id="gameText">
              <TextField floatingLabelText="Number" type="number"  value={this.state.stepThreeScore} onChange={this.onChangeStepThree}/><br/>
              </div>
            </div>
          </Card>

        </div>;
      case 3:
        return <div>
          <Card>
            <div>
              <div id="spotit-image-container" class="center-cropped" style={{
                  backgroundImage: `url("http://wansan.com.br/upload_categoria/2015.08.25-14.05.04.jpg")`
                }}></div>
                <div id="gameText">
              <TextField floatingLabelText="Number" type="number"  value={this.state.stepFourScore} onChange={this.onChangeStepFour}/><br/>
              </div>
            </div>
          </Card>
        </div>;
      case 4:
        return <div>
          <Card>
            <div >
              <div id="spotit-image-container" class="center-cropped" style={{
                  backgroundImage: `url("https://www.harveysgroves.com/images/Products/11A_Answer_Box_294x339.jpg")`
                }}></div>
                <div id="gameText">
              <TextField floatingLabelText="Number"  type="number"  value={this.state.stepFiveScore} onChange={this.onChangeStepFive}/><br/>
              </div>
            </div>
          </Card>
        </div>;
      case 5:
        return <div>
          <Card>
            <div>
              <div id="spotit-image-container" class="center-cropped" style={{
                  backgroundImage: `url("http://power20method.com/wp-content/uploads/2015/04/smoothies.jpg")`
                }}></div>
                <div id="gameText">
              <TextField floatingLabelText="Number"  type="number"  value={this.state.stepSixScore} onChange={this.onChangeStepSix}/><br/>
              </div>
            </div>
          </Card>
        </div>;
      case 6:
        return <div>
          <Card>
            <div >
              <div id="spotit-image-container" class="center-cropped" style={{
                  backgroundImage: `url("https://www.harveysgroves.com/images/Products/Snack_Honeybelles_DP.jpg")`
                }}></div>
                <div id="gameText">
              <TextField floatingLabelText="Number"  type="number" value={this.state.stepSevenScore} onChange={this.onChangeStepSeven}/><br/>
            </div>
            </div>
          </Card>
        </div>;
      case 7:
        return <div>
          <Card>
            <div>

              <div id="spotit-image-container" class="center-cropped" style={{
                  backgroundImage: `url("http://www.cakeindustry.in/wp-content/uploads/2016/05/MANGO12.jpg")`
                }}></div>
                <div id="gameText">
              <TextField floatingLabelText="Number" type="number"  value={this.state.stepEightScore} onChange={this.onChangeStepEight}/><br/>
            </div>
            </div>
          </Card>
        </div>;
      case 8:
        return <div>
          <Card>
            <div>

              <div id="spotit-image-container" class="center-cropped" style={{
                  backgroundImage: `url("http://www.indiangiftscenter.com/images/alphonso-mangoes.jpg")`
                }}></div>
              <div id="gameText">
                  <TextField floatingLabelText="Number"  type="number"  value={this.state.stepNineScore} onChange={this.onChangeStepNine}/><br/>
              </div>

            </div>
          </Card>
        </div>;
      default:
        return 'Level incomplete';
    }
  }

  /**
* Describes the elements on the About Us page
* @return {String} HTML elements
*/
  render() {
    const contentStyle = {
      margin: '0 16px'
    };
    const getStepContent = this.getStepContent.bind(this, this.state.stepIndex);
    const handlePrev = this.handlePrev.bind(this);
    const handleNext = this.handleNext.bind(this);
    const calculateTotalScore = this.calculateTotalScore.bind(this);
    return (<div>
      <div >
        <div id="gameHidden">
        <center>How many you see?</center>
          </div>
        <Stepper activeStep={this.state.stepIndex}>

          <Step>
            <StepLabel></StepLabel>
          </Step>
          <Step>
            <StepLabel></StepLabel>
          </Step>
          <Step>
            <StepLabel></StepLabel>
          </Step>
          <Step>
            <StepLabel></StepLabel>
          </Step>
          <Step>
            <StepLabel></StepLabel>
          </Step>
          <Step>
            <StepLabel></StepLabel>
          </Step>
          <Step>
            <StepLabel></StepLabel>
          </Step>

        </Stepper>
        <div style={contentStyle}>
          {
            this.state.finished
              ? (
                <div>
                <div><center>You deserve smoothie!! </center></div>
                <card>
                  <CardMedia

    >
      <img src='https://i.pinimg.com/736x/0b/91/5b/0b915bbb11fe0ce55fbca02277b8839a--word-art-foodie.jpg' alt="" />
    </CardMedia>
                </card>

                 <center><RaisedButton label="Whoa Level Completed" onClick={calculateTotalScore} primary={true} style={{
                  marginRight: 12,
                  marginTop: 20,
                  marginBottom: 20
                }} /></center>
      </div>    )
              : (<div>
                {this.getStepContent(this.state.stepIndex)}
                <div style={{
                    marginTop: 12
                  }}>
                  <FlatButton label="Back" disabled={this.state.stepIndex === 0} onClick={handlePrev} style={{
                      marginRight: 12,
                      marginTop: 12,
                      marginBottom: 20
                    }}/>
                  <RaisedButton label={this.state.stepIndex === 10
                      ? 'Finish'
                      : 'Next'} primary={true} onClick={handleNext}/>
                </div>
              </div>)
          }
        </div>
      </div>
    </div>);
  }
}

export default SpotIt;
