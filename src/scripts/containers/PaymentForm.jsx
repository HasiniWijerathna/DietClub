import React from 'react';
import BaseContainer from './BaseContainer';
import axios from 'axios';
import {purchase} from '../services/urlFactory';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

/**
* Represents the view logic
*/
class PaymentForm extends BaseContainer {

  constructor(props) {
    super(props);

    this.state = {
      stripeLoading: false,
      stripeLoadingError: false,
      submitDisabled: false,
      paymentError: null,
      paymentComplete: false,
      token: null,
      responseMessage: null,
      open: false
  };

   this.onScriptLoaded = this.onScriptLoaded.bind(this);
   this.makePayment = this.makePayment.bind(this);
   this.onScriptLoaded();

  }

  makePayment() {
    axios.post(purchase(), {
        tokenId: this.state.token,
        description: 'Favorite List',
        amount: 90
      })
      .then((response) => {
          this.setState({ responseMessage: response.data.message, open: true });
      })
      .catch(function (error) {
        console.log(error);
      });

      console.log(this.state.open);
  }

  handleOpen() {
    this.setState({open: true});
  };

  handleClose () {
    this.setState({open: false});
  };


  onScriptLoaded() {
    if (!PaymentForm.getStripeToken) {
      // Put your publishable key here
      Stripe.setPublishableKey('pk_test_3y2UmK7GzoYeB0aFbuMsHQZu');

      this.setState({ stripeLoading: false, stripeLoadingError: false });
    }
  }

  onScriptError() {
    this.setState({ stripeLoading: false, stripeLoadingError: true });
  }

  onSubmit (event) {
    let self = this;
    event.preventDefault();
    this.setState({ submitDisabled: true, paymentError: null });


    Stripe.createToken(event.target,(status, response) => {
      if (response.error) {
        self.setState({ paymentError: response.error.message, submitDisabled: false });
      }
      else {
        self.setState({ paymentComplete: true, submitDisabled: false, token: response.id });
       this.makePayment();
           console.log(this.state.responseMessage );
        // make request to your server here!
      }
    });
  }


/**
* Describes the elements on the About Us page
* @return {String} HTML elements
*/
  render() {
    const onSubmit = this.onSubmit.bind(this);
    const handleOpen = this.handleOpen.bind(this);
    const handleClose = this.handleClose.bind(this);
    let content = null;

    console.log(this.state.open);
    console.log(this.state.responseMessage)

    const actions = [
    <FlatButton
      label="Cancel"
      primary={true}
      onClick={handleClose}
    />,
    <FlatButton
      label="Submit"
      primary={true}
      keyboardFocused={true}
      onClick={handleClose}
    />,
  ];

        if(this.state.stripeLoading) {
          content = (
            <div>Loading</div>
          );
        } else if (this.state.stripeLoadingError) {
          content = (
            <div>Error</div>
          );
        } else {
          content = (
            <div>
              <form onSubmit={onSubmit} >
                <span>{ this.state.paymentError }</span><br />
                <input type='text' data-stripe='number' placeholder='credit card number' /><br />
                <input type='text' data-stripe='exp-month' placeholder='expiration month' /><br />
                <input type='text' data-stripe='exp-year' placeholder='expiration year' /><br />
                <input type='text' data-stripe='cvc' placeholder='cvc' /><br />
                <input disabled={this.state.submitDisabled} type='submit' value='Purchase' /><br />
              </form>

              <div>
                <Dialog
                  title="Thank you for shopping with us!"
                  actions={actions}
                  modal={false}
                  open={this.state.open}
                  onRequestClose={this.handleClose}
                >
                  Your payment was successfully processed
                </Dialog>
              </div>
                    </div>
          );
        }



    return (
      <div>
      {content}
      </div>
    );
  }
}

export default PaymentForm;
