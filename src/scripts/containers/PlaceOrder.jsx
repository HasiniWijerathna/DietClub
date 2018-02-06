import React from 'react';
import BaseContainer from './BaseContainer';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {Step, Stepper, StepLabel} from 'material-ui/Stepper';
import {sendMail} from '../services/urlFactory';
import {browserHistory} from 'react-router';

import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import TextField from 'material-ui/TextField';
import {orange500, blue500} from 'material-ui/styles/colors';
import {Form, Text} from 'react-form';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import IconButton from 'material-ui/IconButton';
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card';
import {purchase} from '../services/urlFactory';
import Payment from '../components/Payment';
import Dialog from 'material-ui/Dialog';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Close from 'material-ui/svg-icons/navigation/close';

const stylesTextField = {
  errorStyle: {
    color: orange500
  },
  underlineStyle: {
    borderColor: orange500
  },
  floatingLabelStyle: {
    color: orange500
  },
  floatingLabelFocusStyle: {
    color: blue500
  }
};

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

const STRIPE_PUBLISHABLE = 'http://myapidomain.com';
const PAYMENT_SERVER_URL = 'pk_live_MY_PUBLISHABLE_KEY';
const CURRENCY = 'EUR';

const fromEuroToCent = amount => amount * 100;

// const stepTwo = ( <div id="listItem">Billing Details
//    <List>
//      <div id="textForm">
//     <TextField floatingLabelText="First name"/><br />
//     <TextField floatingLabelText="Last name"/><br />
//     <TextField floatingLabelText="Phone number"/><br />
//     <TextField floatingLabelText="Address line 1"/><br />
//     <TextField floatingLabelText="Address line 2"/>
//     </div>
//   </List>
// </div>);
// const stepThree = ( <div id="listItem">Payment Method
//    <List>
//   <TextField floatingLabelText="Name (As appears on your card)"/><br />
//   <TextField floatingLabelText="Card Number"/><br />
//   <TextField floatingLabelText="Security Code"/>
//   <div>
//     <RadioButtonGroup name="notRight" labelPosition="left" >
//        <RadioButton
//          value="1"
//          label="Paypal"
//        />
//
//      <RadioButton
//        value="2"
//        label="Cash on delivery"
//      />
//    </RadioButtonGroup>
//   </div>
//
//   </List>
// </div>);
const stepFour = (<div>Payment Method

</div>);

/**
* Represents the view logic
*/
class PlaceOrder extends BaseContainer {

  /**
* Class constructor
* @param {Object} props User define component
*/
  constructor(props) {
    const results = localStorage.getItem('user');

    super(props);

    this.state = {
      finished: false,
      stepIndex: 0,
      user: JSON.parse(results),
      stripeLoading: false,
      stripeLoadingError: false,
      submitDisabled: false,
      paymentError: null,
      paymentComplete: false,
      token: null,
      responseMessage: null,
      open: false,
      feedback: '',
      emailSuccess: false,
      totalBill: 0
    };


    let user = JSON.parse(results);
    console.log(this.state.user);
    let content = null;
  //  this.refreshPage = this.refreshPage(this);

     //this.removeItem = this.removeItem.bind(this);

  }

  /**
    * Handle the newsletter click event
    */
  sendFeedback() {
    this.setState({emailSuccess: true});
    const results = localStorage.getItem('user');
    let user = JSON.parse(results);
    axios.post(sendMail(), {
        email: 'wijerathna.hasini@gmail.com',
        text: `Feedback of customer : ${user.name}`,
        description: this.state.feedback
      })
      .then(function (response) {

        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      setTimeout(function () {
    browserHistory.push('/');
  }, 2500);

  }

  componentDidMount() {
    console.log('componentDidMount');
    console.log($('effect'));
    $(document).ready(function(){
      $('effect').tooltip();
    });
  }


  makePayment() {
    axios.post(purchase(), {
      tokenId: this.state.token,
      description: 'PlaceOrder',
      amount: this.state.totalBill
    }).then((response) => {
      this.setState({responseMessage: response.data.message, open: true});
    }).catch(function(error) {
      console.log(error);
    });

    console.log(this.state.open);
  }

  handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
  };

  handleCloseEmail() {
    this.setState({emailSuccess: false});
  }

  onScriptLoaded() {
    if (!PaymentForm.getStripeToken) {
      // Put your publishable key here
      Stripe.setPublishableKey('pk_test_3y2UmK7GzoYeB0aFbuMsHQZu');

      this.setState({stripeLoading: false, stripeLoadingError: false});
    }
  }

  onScriptError() {
    this.setState({stripeLoading: false, stripeLoadingError: true});
  }

  onSubmit(event) {
    let self = this;
    event.preventDefault();
    this.setState({submitDisabled: true, paymentError: null});

    Stripe.createToken(event.target, (status, response) => {
      if (response.error) {
        self.setState({paymentError: response.error.message, submitDisabled: false});
      } else {
        self.setState({paymentComplete: true, submitDisabled: false, token: response.id});
        this.makePayment();
        console.log(this.state.responseMessage);
        // make request to your server here!
      }
    });
  }

  handleNext() {
    console.log(this.state.stepIndex);
    this.setState({
      stepIndex: this.state.stepIndex + 1,
      finished: this.state.stepIndex >= 2
    });

  }

  successPayment() {
    console.log('successPayment');
  }

  errorPayment() {
    console.log('error');

  }

  handlePrev() {
    if (this.state.stepIndex > 0) {
      this.setState({
        stepIndex: this.state.stepIndex - 1
      });
    }
  }

  removeItem(name) {
      console.log('sdfsdfsfsdds');
    console.log(name);
    this.state.user.cartItems.map((selecteditem) => {
      if(selecteditem.name === name) {
        let id = this.state.user.cartItems.indexOf(selecteditem);
          console.log('yeah babe');
          this.state.user.cartItems.splice(id, 1);
            console.log(this.state.user.cartItems);
      }


    //console.log(name);
    });

    const results = localStorage.getItem('user');
    let user = JSON.parse(results);
    user.cartItems = this.state.user.cartItems;
    localStorage.setItem('user', JSON.stringify(user));
      const resultsrrrr = localStorage.getItem('user');
      let userrrrr = JSON.parse(resultsrrrr);

      const updatedUser = localStorage.getItem('user');
      let itemUpdatedUser = JSON.parse(updatedUser);
      console.log('8888user88888');
      console.log(userrrrr);
      // this.setState({
      //   user: JSON.parse(itemUpdatedUser)
      // });
    window.location.reload();
    history.pushState(null, '/placeOrder');
    componentDidMount();
    this.forceUpdate();
    this.refreshPage = this.refreshPage(this);
    this.refreshPage();

  }

  refreshPage(){
    console.log('bleh');
    window.location.reload();
}

  getStepContent(stepIndex) {
    let content = null;
   const gunnarStyle       = { height: "10px", padding: "10px"};

    const stepOne = this.state.user.cartItems.map((item) => {
    //  const removeItem = this.removeItem.bind(this,item.name);

      return (

      //   <div id="listItem">
      //   <ListItem value={3} primaryText={`${item.name} - ${item.price} LKR `} leftAvatar={<Avatar src = {item.image} />}/>
      // </div>

      <div>
        <Table  displayRowCheckbox={false} displaySelectAll={false} adjustForCheckbox={false} selectable={false} >
          <TableBody displayRowCheckbox={false} displaySelectAll={false} adjustForCheckbox={false}  selectable={false} >
            <TableRow  style={gunnarStyle} displayRowCheckbox={false} displaySelectAll={false} adjustForCheckbox={false}  selectable={false} >
              <TableRowColumn style={gunnarStyle} width={50} >{<Avatar src = {item.image} />}</TableRowColumn>
              <TableRowColumn  style={gunnarStyle} width={150}>{item.name}</TableRowColumn>
              <TableRowColumn width={10} >{item.price}</TableRowColumn>
              <TableRowColumn width={95}>   <IconButton   onClick={this.removeItem.bind(this,item.name)} > <Close /> </IconButton></TableRowColumn>
  <TableRowColumn>
  </TableRowColumn>

            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
    });

    const stepThree = (<div id="listItem">
      <div>
        <center>
          <Payment/>
        </center>
      </div>
    </div>);

    const stepTwo = (<div id="listItem">
      <center>
        <form>
          <TextField type='text' placeholder='Contanct name'/><br/>
          <TextField type='text' placeholder='Street Address'/><br/>
          <TextField type='text' placeholder='City'/><br/>
          <TextField type='text' placeholder='State/Province/Region'/><br/>
          <TextField type='text' placeholder='Contanct number'/><br/>
            <input id="age" placeholder='Add health quoate' title="Nothing taste as good as healthy feels!"/>
        </form>
      </center>
    </div>);

    switch (stepIndex) {
      case 0:
        return stepOne;
      case 1:
        return stepTwo;
      case 2:
        return stepThree;
      case 4:
        return stepFour;
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  onChangeFeedback(changeEvent) {
    const userFeedback = `${changeEvent.target.value}`;
    this.setState({ feedback: userFeedback});
  }

  /**
* Describes the elements on the About Us page
* @return {String} HTML elements
*/
  render() {
    const onSubmit = this.onSubmit.bind(this);
    const handleOpen = this.handleOpen.bind(this);
    const handleClose = this.handleClose.bind(this);
    const sendFeedback = this.sendFeedback.bind(this);
    const onChangeFeedback = this.onChangeFeedback.bind(this);
    const handleCloseEmail = this.handleCloseEmail.bind(this);


    const actions = [
      <FlatButton
        label="Okay"
        primary={true}
        keyboardFocused={true}
        onClick={handleCloseEmail}
      />,
    ];

    let content = (<div>
      <center>
        <a href="#" onClick={(event) => {
            event.preventDefault();
            this.setState({stepIndex: 0, finished: false});
          }}>
          Click here to go back
        </a>
      </center>
      <br/>
      <br/>
      <br/>
      <center>
        Ready! set!! Juice!!!
      </center>
      <br/>
      <br/>

      <center>
        <img src="https://t4.ftcdn.net/jpg/01/21/33/37/240_F_121333770_XrY2jlNboVGncS96os4cUUIc4sAE8BJW.jpg" alt="Mountain View" height="72" width="342"/>
      </center>

      <br/>
      <br/>
      How is the payment process? We value your feedback and welcome any comments.
      <br/>

      <TextField floatingLabelText="Feedback" value={this.state.feedback}   onChange={onChangeFeedback}/>
      <div id="cardButtonSecond">
        <center>
          <RaisedButton buttonStyle={{
              borderRadius: 25
            }} style={{
              borderRadius: 25
            }} labelColor={'#FFFFFF'} backgroundColor={'#00BF9A'} type='submit' onClick={sendFeedback} label='Submit your feedback'/>
        </center>
      </div>
    </div>);
    const contentStyle = {
      margin: '0 16px'
    };
    const handleNext = this.handleNext.bind(this, this.state.stepIndex);
    const handlePrev = this.handlePrev.bind(this);
    const getStepContent = this.getStepContent.bind(this, this.state.stepIndex);
    const stepIndex = this.state.stepIndex;
    const finished = this.state.finished;
    return (<div style={{
        width: '100%',
        maxWidth: 700,
        margin: 'auto'
      }}>

      <Dialog
         title="Thank you for you feedback!!"
         actions={actions}
         modal={false}
         open={this.state.emailSuccess}
         onRequestClose={handleCloseEmail}
       >
         your feedback is much appreciated
       </Dialog>

      <Stepper activeStep={stepIndex}>
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
          finished
            ? (content)
            : (<div>
              <center>
                <p>{this.getStepContent(stepIndex)}</p>
                <div style={{
                    marginTop: 22,
                    marginBottom: 20
                  }}>
                  <FlatButton label="Back" disabled={stepIndex === 0} onClick={handlePrev} style={{
                      marginRight: 12
                    }}/>
                  <RaisedButton label={stepIndex === 2
                      ? 'Finish'
                      : 'Next'} primary={true} onClick={handleNext} />
                </div>
              </center>
            </div>)
        }
      </div>
    </div>);
  }
}

export default PlaceOrder;
