import React from 'react';
import BaseContainer from './BaseContainer';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
const QRCode = require('qrcode.react');

/**
* Represents the view logic
*/
class QRCodeGenerator extends BaseContainer {
/**
* Describes the elements on the About Us page
* @return {String} HTML elements
*/
  render() {
    return (
      <div id="QRcode">
        <QRCode
          value="http://facebook.github.io/react/"
          size = '300'
        />
        <div id="QRcodeContent">
          Produce this QR code to the cashier to get discounts for your orders by claiming rewards
        </div>
        <div id="cardButtonSecond">
          <center>
            <RaisedButton
              label="Claim Rewards"
              buttonStyle={{ borderRadius: 25 }}
              style={{ borderRadius: 25 }}
              labelColor={'#FFFFFF'}
              backgroundColor={'#00BF9A'}
            />
          </center>
        </div>
      </div>
    );
  }
}

export default QRCodeGenerator;
