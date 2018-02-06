import React, {Component} from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import {purchase} from '../services/urlFactory';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

/**
 * Representing the header bar
 */
class Payment extends Component {

  /**
* Validate name
* @param  {String} name The username
* @return {String}      Relevent error of the incorrect username
*/
  static validateCardNo(cardNo) {
    let error = null;

    if (!cardNo || cardNo.length === 0) {
      error = 'Credit card number is required';
    } else if (cardNo.length  > 16  || cardNo.length  < 16 ) {
      error = 'Invalied credit card number';
    }

    return error;
  }

  /**
* Validate name
* @param  {String} name The username
* @return {String}      Relevent error of the incorrect username
*/
  static validateExpYear(expYear) {
    let error = null;

    if (!expYear || expYear.length === 0) {
      error = 'Expiration year is required';
    } else if (expYear.length > 2 || expYear.length < 2 ) {
      error = 'Invalied Expiration year';
    }

    return error;
  }

  /**
* Validate name
* @param  {String} name The username
* @return {String}      Relevent error of the incorrect username
*/
  static validateExpMonth(expMonth) {
    let error = null;

    if (!expMonth || expMonth.length === 0) {
      error = 'Expiration month is required';
    } else if (expMonth.length >2 || expMonth.length < 2) {
      error = 'Invalid Expiration month';
    }

    return error;
  }

  /**
* Validate name
* @param  {String} name The username
* @return {String}      Relevent error of the incorrect username
*/
  static validateCvc(cvc) {
    let error = null;

    if (!cvc || cvc.length === 0) {
      error = 'CVC is required';
    } else if (cvc.length < 3 || cvc.length > 3 ) {
      error = 'Invalid CVC';
    }

    return error;
  }

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
      open: false,
      totalBill: 0,
      error: {
        cardNo: '',
        expMonth: '',
        expYear: '',
        cvc: ''
      },
      focused: {
        cardNo: false,
        expMonth: false,
        expYear: false,
        cvc: false,
      },
      cardNo: '',
      expMonth: '',
      expYear: '',
      cvc: ''
    };

    this.onScriptLoaded = this.onScriptLoaded.bind(this);
    this.makePayment = this.makePayment.bind(this);
    this.calculateTotalAmount = this.calculateTotalAmount.bind(this);
    this.calculateTotalAmount();
    this.onScriptLoaded();

  }
  calculateTotalAmount() {
    let total = 0;
    let itemNames =[];
    const results = localStorage.getItem('user');
    let user = JSON.parse(results);
    user.cartItems.map((item) => {
       total += item.price
       itemNames.push(item.name);
    });
      this.setState({totalBill: total});
  }

  makePayment() {
    let itemNames =[];
    const results = localStorage.getItem('user');
    let user = JSON.parse(results);
    user.cartItems.map((item) => {
       itemNames.push(item.name);
    });


    this.calculateTotalAmount();
      console.log(this.state.totalBill);
    axios.post(purchase(), {
      tokenId: this.state.token,
      description: itemNames.toString(),
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

  onScriptLoaded() {
    if (!Payment.getStripeToken) {
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
  //  this.setState({submitDisabled: true, paymentError: null});

    Stripe.createToken(event.target, (status, response) => {
      if (response.error) {
        self.setState({paymentError: response.error.message, submitDisabled: true});
      } else {
        self.setState({paymentComplete: true, submitDisabled: false, token: response.id});
        this.makePayment();
        console.log(this.state.responseMessage);
        // make request to your server here!
      }
    });
  }

  /**
* Event changer for the password
* @param  {String} changeEvent Changer event of the password
*/
  onChangeCardNo(changeEvent) {
    const cardNo = changeEvent.target.value;
    const validationErrors = Payment.validateCardNo(cardNo);
    const error = this.state.error;

    error.cardNo = validationErrors;

    this.setState({
      cardNo: cardNo,
      error : error
    });
  }
  /**
* Event changer for the password
* @param  {String} changeEvent Changer event of the password
*/
  onChangeExpmonth(changeEvent) {
    const expMonth = changeEvent.target.value;
    const validationErrors = Payment.validateExpMonth(expMonth);
    const error = this.state.error;
    error.expMonth = validationErrors;


    this.setState({
      expMonth: expMonth,
      error : error
    });
  }

  onChangeExpYear(changeEvent) {
    const expYear = changeEvent.target.value;
    const validationErrors = Payment.validateExpYear(expYear);
    const error = this.state.error;
    error.expYear = validationErrors;


    this.setState({
      expYear: expYear,
      error : error
    });
  }

  onChangecvc(changeEvent) {
    const cvc = changeEvent.target.value;
    const validationErrors = Payment.validateCvc(cvc);
    const error = this.state.error;
    error.cvc = validationErrors;


    this.setState({
      cvc: cvc,
      error : error
    });
  }

  handleCloseDialog() {
    this.setState({
      submitDisabled: false
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
    const onChangeCardNo = this.onChangeCardNo.bind(this);
    const onChangeExpmonth = this.onChangeExpmonth.bind(this);
    const onChangeExpYear = this.onChangeExpYear.bind(this);
    const onChangecvc = this.onChangecvc.bind(this);
    const handleCloseDialog = this.handleCloseDialog.bind(this);

    let content = null;

    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={handleClose}/>,
      <FlatButton label="Submit" primary={true} keyboardFocused={true} onClick={handleClose}/>
    ];

    if (this.state.stripeLoading) {
      content = (<div>Loading</div>);
    } else if (this.state.stripeLoadingError) {
      content = (<div>Error</div>);
    } else {
      content = (<div>
        <Dialog
         modal={false}
         open={this.state.submitDisabled}
         onRequestClose={handleCloseDialog}
       >
        Invalied credentials
       </Dialog>

        <form onSubmit={onSubmit}>
          <span>{this.state.paymentError}</span><br/>
          <TextField type='text' data-stripe='number' placeholder='Credit card number'   type="number" onChange={onChangeCardNo} value={this.state.cardNo}  errorText={ this.state.error.cardNo}/><br/>
          <TextField type='text' data-stripe='exp-month' placeholder='Expiration month'   type="number"  onChange={onChangeExpmonth} value={this.state.expMonth}  errorText={this.state.error.expMonth}/><br/>
          <TextField type='text' data-stripe='exp-year' placeholder='Expiration year'  type="number" onChange={onChangeExpYear} value={this.state.expYear} errorText={ this.state.error.expYear} /><br/>
          <TextField type='text' data-stripe='cvc' placeholder='CVC' onChange={onChangecvc}  type="number" value={this.state.cvc} errorText={ this.state.error.cvc} /><br/>
          <div id="cardButtonSecond">
            <center>
              <RaisedButton buttonStyle={{
                  borderRadius: 25
                }} style={{
                  borderRadius: 25
                }} labelColor={'#FFFFFF'} backgroundColor={'#00BF9A'} type='submit' label='Purchase'/>
            </center>
          </div>

        </form>

        <div>
          <Dialog title="Thank you for shopping with us!" actions={actions} modal={false} open={this.state.open} onRequestClose={this.handleClose}>
            Your payment was successfully processed
          </Dialog>
        </div>
      </div>);
    }

    return (<div>
      {content}
    </div>);
  }
}
export default Payment;
