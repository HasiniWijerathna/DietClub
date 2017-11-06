import React, {Component} from 'react';
import {Card} from 'material-ui/Card';

/**
* Represents the view logic of adding new blogs functionality
*/
class Help extends Component {

/**
* Class constructor
* @param {Object} props User define component
*/
  constructor(props) {
    super(props);

    this.state = {
      files: [],
    };
  }

  /**
  * Describes the elements on the About Us page
  * @return {String} HTML elements
  */
  render() {
    return (
      <div>
        <Card>
          <section id="global-header">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="block">
                    <h1>It’s time to get more from what you read.</h1>
                    <p>Find and share real perspectives about topics that matter today</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Card>
        <Card>
          <section id="intro">
            <div className="container">
              <div className="row">
                <div className="col-md-7 col-sm-12">
                  <div className="section-title">
                    <h2>Writing</h2>
                    <h3>How can I write a story?</h3>
                  </div>
                  <div className="content">
                    <p>To write a story on Bloggger, you'll need to set up a user account and sign in to Bloggger.
                    Once you're logged in, you can click on your user icon in the bottom
                    right corner.After adding a blog title you will see the Bloggger editor, which looks like this:</p>
                    <img className="textboxImg" alt="Img"/>
                  </div>
                  <div className="content">
                    <p>
                      Anyway, let's not get hung up on content for right now. To publish your story on Bloggger,
                       click on the "Publish" button in the bpttom right corner.
                       In its most basic form, a blog on Bloggger consists of a title and a body text.
                       (And, of course, it can get quite a lot more complex than that.)
                       You do have to include a bit of text before you'll be allowed to publish
                       (i.e., you cannot publish an empty story).For now, we'll keep things simple

                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-5 col-sm-12">
              </div>
            </div>
          </section>
        </Card>
      </div>
    );
  }
}

export default Help;
