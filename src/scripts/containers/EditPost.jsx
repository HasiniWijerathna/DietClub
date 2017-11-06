import React from 'react';
import RichTextEditor from 'react-rte';
import {post} from '../services/Requests';
import {modelURL} from '../services/urlFactory';
import {browserHistory} from 'react-router';
import BaseContainer from './BaseContainer';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
/**
 * Representing the logic of adding new posts functionality
 */
class EditPost extends BaseContainer {
  /**
  * Class constructor
  * @param {Object} props User define component
  */
  constructor(props) {
    super(props);
    this.state = {
      post: {
        title: '',
        rteContent: RichTextEditor.createEmptyValue(),
        open: false,
        errorMessage: '',
        // rteContent: RichTextEditor.createValueFromString( '', 'markdown'),
      },
      alertOpen: false,
      open: false,
      errorMessage: '',
    };
    this.getPostContent = this.getPostContent.bind(this);
  }
  /**
   * Called after the component is mounted
   */
  componentDidMount() {
    this.getPostContent();
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
   * Updated the rteContent
   * @param  {String} value rteContent
   */
  contentOnChange(value) {
    const post = this.state.post;
    post.rteContent = value;
    this.setState({
      post,
    });
  };
  /**
  * Adds new posts
  */
  onAddPost() {
    const postId = this.props.routeParams.postId;
    const url = modelURL('post', postId);
    const blogId = this.props.routeParams.blogId;
    const data = {
      title: this.state.post.title,
      content: this.state.post.rteContent.toString('markdown'),
    };
    this.makePUTrequest(url, data)
    .then(() => {
      browserHistory.push(`/blogs/${blogId}`);
    })
    .catch((error) => {
      this.setState({
        post,
      });
    });
  }
/**
 * Sends a GET request to get the editing post content
 */
  getPostContent() {
    const postId = this.props.routeParams.postId;
    const url = modelURL('post', postId);
    this.makeGETRequest(url)
    .then((response) => {
      response.map((data) => {
        this.setState({
          post: {
            title: data.title,
            rteContent: RichTextEditor.createValueFromString( data.content, 'markdown'),
          },
        });
      });
    })
    .catch((error) => {
      browserHistory.push(`/blogs/${this.props.params.blogId}`);
    });
  }
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
    const contentOnChange = this.contentOnChange.bind(this);
    const onChangeTitle = this.onChangeTitle.bind(this);
    const onAddPost = this.onAddPost.bind(this);
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
    return(
      <div>
        <div className="col-md-12">
          <div className="floatingLabelText">
            <TextField floatingLabelText="Title" value={this.state.post.title} onChange={onChangeTitle} fullWidth/>
          </div>
          <RichTextEditor value={this.state.post.rteContent} onChange={contentOnChange}/>
          <div></div>
          <div>
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
EditPost.propTypes = {
  post: React.PropTypes.object,
  routeParams: React.PropTypes.object.isRequired,
};
export default EditPost;
