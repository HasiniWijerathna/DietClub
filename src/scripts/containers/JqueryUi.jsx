// And here's how to use the <Sortable /> component:
import React, {Component} from 'react';
import Sortable from '../components/Sortable';
import  $ from 'jquery-ui';
//import * as jQuery from "jquery";
class JqueryUi extends React.Component {
  constructor(props) {
    super(props);

    // Use this flag to disable/enable the <Sortable />
    this.state = {
      isEnabled: true
    };

    this.toggleEnableability = this.toggleEnableability.bind(this);


  }
  componentDidMount() {
    console.log('componentDidMount');
    console.log($('effect'));
    $(document).ready(function(){
      $('effect').tooltip();
    });
  }

  toggleEnableability() {
    this.setState({
      isEnabled: !this.state.isEnabled
    });
  }

  handleOnChange(event, ui) {
    // Attach any custom behavior here
    console.log('DOM changed!', event, ui);
  }

show() {
  $('button1').click(function(event){
      $('effect').show();
  });

}

hide() {
  $('button2').click(function(event){
        $('effect').hide();
  });
}



// $('button1').click(function(event){
//     $('effect').show();
// });
//
// $('button2').click(function(event){
//       $('effect').hide();
// });

// Set effect from select menu value


  render() {
  //   const show = this.show.bind(this);
  //   const hide =this.hide.bind(this);
  // show();
  // hide();
    const list = ['ReactJS', 'JSX', 'JavaScript', 'jQuery', 'jQuery UI'];

    return (<div>


        <div id="effect" class="ui-widget-content ui-corner-all" title="TOOOOOLTIP">
          <h3 class="ui-widget-header ui-corner-all">Show</h3>

            Etiam libero neque, luctus a, eleifend nec, semper at, lorem. Sed pede. Nulla lorem metus, adipiscing ut, luctus sed, hendrerit vitae, mi.

        </div>


      <input id="age" title="We ask for ywrwreour age only for statistical purposes."/>

<button id="button1" class="ui-state-default ui-corner-all" onClic>show</button>
<button id="button2" class="ui-state-default ui-corner-all">Hide</button>

    </div>);
  }
}

export default JqueryUi;
