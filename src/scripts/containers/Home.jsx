import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {isAuthenticated, resetSession} from '../services/SessionService';

import {Card} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

/**
* Representing the login sign up functionalities
*/
class Home extends Component {

/**
* Navigates to the login page
*/
  static login() {
    browserHistory.push('/login');
  }
/**
* Navigates to the sign up page
*/
  static signUp() {
    browserHistory.push('/registration');
  }
/**
* Class constructor
* @param {Object} props User define component
*/
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: isAuthenticated(),
      blogsOfCategory: [],
    };
  }
/**
* Sets the session if the authenticaion false
*/
  logout() {
    resetSession();
    this.setState({
      isAuthenticated: false,
    });
  }
/**
 * Navigate to the blogs page
 */
  navaigateBlogs() {
    browserHistory.push('blogs');
  }
/**
* Describes the elements on the Post page
* @return {String} HTML elements
*/
  render() {
    const navaigateBlogs = this.navaigateBlogs.bind(this);
    return (
      <div className="home-container">
        <Card>
          <div>
            <Card>
              <section id="slider">
                <div className="container">
                  <div className="row">
                    <div className="col-md-10 col-md-offset-1">
                      <div className="block">
                        <h1 className="animated fadeInUp">Publish</h1>
                        <p className="animated fadeInUp">Create a unique and beautiful blog. It’s easy and free</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </Card>
          </div>
          <Card></Card>
          <Card>
            <section id="feature">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <h2>Choose the perfect design</h2>
                    <p>Create a beautiful blog that fits your style. Choose from a</p>
                    <p>selection of easy-to-use templates – all with flexible layouts and </p>
                    <p>hundreds of background images – or design something new.</p>
                  </div>
                </div>
              </div>
            </section>
          </Card>
          <Card></Card>
          <Card>
            <section id="call-to-action">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="block">
                      <h2>We design delightful digital experiences.</h2>
                      <p>Read more about what we do and our philosophy of design.</p>
                      <p>Judge for yourself The work and results we’ve achieved for other clients,</p>
                      <p> and meet our highly experienced Team who just love to design.</p>
                      <RaisedButton label="Create your blog" onClick={navaigateBlogs} />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </Card>
        </Card>
      </div>
    );
  }

}
export default Home;
