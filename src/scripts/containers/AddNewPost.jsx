import React, {Component} from 'react';
import RichTextEditor from 'react-rte';

import {browserHistory} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import {post} from '../services/Requests';
import {modelURL} from '../services/urlFactory';
import Snackbar from 'material-ui/Snackbar';
import BaseContainer from './BaseContainer';
/**
 * Representing the logic of adding new posts functionality
 */
class AddNewPost extends BaseContainer {
/**
* Class constructor
* @param {Object} props User define component
*/
  constructor(props) {
    super(props);

    this.state = {
      post: {
        title: '',
        content: '',
        rteContent: RichTextEditor.createEmptyValue(),
      },
      alertOpen: false,
      open: false,
      errorMessage: '',
    };
  }

/**
* Adds new posts
*/
  onAddPost() {
    if(this.state.post.title && this.state.post.rteContent) {
      const url = modelURL('post');
      const data = {
        blogId: this.props.routeParams.blogId,
        title: this.state.post.title,
        content: this.state.post.rteContent.toString('markdown'),
      };
      this.makePOSTrequest(url, data)
        .then(() => {
          browserHistory.push(`/blogs/${data.blogId}`);
        })
        .catch((error) => {
          this.setState({
            post,
            open: true,
            errorMessage: 'Oops something went wrong',
          });
        });
    } else {
      this.setState({
        open: true,
        errorMessage: 'Post title and content can not be empty',
      });
    }
  }
/**
* Updates the state according to the change event of new title of the post
* @param  {Event} changeEvent The change event of the post title
*/
  onChangeTitle(changeEvent) {
    const newTitle = changeEvent.target.value;
    const post = this.state.post;

    post.title = newTitle;

    this.setState({
      post,
    });
  }
/**
 * [contentOnChange description]
 * @param  {[type]} value [description]
 */
  contentOnChange(value) {
    const post = this.state.post;
    post.rteContent = value;
    this.setState({
      post,
    });
  };
  /**
   * Alert handle alert
   */
  handleOpen() {
    this.setState({
      alertOpen: true,
    });
  };
  /**
   * Alert handle alert
   */
  handleClose() {
    this.setState({
      alertOpen: false,
    });
  };
  /**
   * Hides the snackbar when the user clicks it
   */
  handleRequestClose() {
    this.setState({
      open: false,
      errorMessage: '',
    });
  }
/**
* Describes the elements on the Add new post page
* @return {String} HTML elements
*/
  render() {
    const onAddPost = this.onAddPost.bind(this);
    const onChangeTitle = this.onChangeTitle.bind(this);
    const contentOnChange =this.contentOnChange.bind(this);
    const handleClose = this.handleClose.bind(this);
    const handleOpen =this.handleOpen.bind(this);
    const handleRequestClose = this.handleRequestClose.bind(this);
    const buttonStyle = {
      marginBottom: '250px',
      marginTop: '70px',
      float: 'right',
    };
    const actions = [
      <FlatButton
      label="Add post"
      primary={true}
      onTouchTap={onAddPost}
      />,
      <FlatButton
      label="Change"
      primary={true}
      onTouchTap={handleClose}
      />,
    ];

    return (
      <div className="col-md-12">
        <div className= "textArea">
          <div className="floatingLabelText">
            <TextField floatingLabelText="Title" value={this.state.post.title} onChange={onChangeTitle} fullWidth/>
          </div>
          <div>
            <RichTextEditor value={this.state.post.rteContent} onChange={contentOnChange}/>
            <div>
            </div>
            <RaisedButton
              label="Publish"
              primary
              onClick={handleOpen}
              style={buttonStyle} />
            <Dialog actions={actions}
              title="Ready to publish?"
              modal={false}
              open={this.state.alertOpen}
              onRequestClose={handleClose}>
              Add or change content so your story reaches more people
              </Dialog>
          </div>
        </div>
        <Snackbar
         open={this.state.open}
         message={this.state.errorMessage}
         autoHideDuration={4000}
         onRequestClose={handleRequestClose}
       />
      </div>
    );
  }
}

AddNewPost.propTypes = {
  routeParams: React.PropTypes.object.isRequired,
  params: React.PropTypes.object.isRequired,
};

export default AddNewPost;
