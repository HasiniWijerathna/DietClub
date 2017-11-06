import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import {browserHistory} from 'react-router';
import {getSession} from '../services/SessionService';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import FlatButton from 'material-ui/FlatButton';
/**
* Represents the comment form functionality
*/
class CommentForm extends Component {
/**
* Class constructor
* @param {Object} props User define component
*/
  constructor(props) {
    super(props);

    this.state = {
      comment: '',
      dataLoading: true,
      errorMessage: {
        open: false,
        message: '',
      },
    };
  }
/**
 * Allows to add comments on the selected post
 */
  onAddComment() {
    const comment = this.state.comment;
    if(comment) {
      const authenticated = getSession().authenticated;
      if (authenticated) {
        const blogId = this.props.post.BlogId;
        const postId = this.props.post.id;
        const comment = this.state.comment;
        this.props.onAdd(comment);
        browserHistory.push(`/blogs/${blogId}/posts/${postId}`);
        this.setState({
          comment: '',
          dataLoading: true,
        });
      } else {
        browserHistory.push('/login');
      }
    } else {
      this.setState({
        errorMessage: {
          open: true,
          message: 'Empty Responses',
        },
      });
    }
  }
/**
* Updates the state with the new value
* @param  {Event} changeEvent Change event
*/
  onChange(changeEvent) {
    const comment = changeEvent.target.value;
    this.setState({
      comment: comment,
    });
  }
/**
 * Navigates to the login page
 */
  login() {
    browserHistory.push('/login');
  }
/**
 * Hides the snackbar
 */
  handleRequestClose() {
    this.setState({
      errorMessage: {
        open: false,
        message: '',
      },
    });
  }
/**
* Render all blogs and autoComplete field
* @return {String} Blog list
*/
  render() {
    const snackBarStyleMap = {
      success: {
        bodyStyle: {
          'backgroundColor': '#66BB6A',
        },
        contentStyle: {
          color: 'black',
        },
      },
      error: {
        bodyStyle: {
          'backgroundColor': '#C62828',
        },
        contentStyle: {
          color: 'black',
        },
      },
      warning: {
        bodyStyle: {
          'backgroundColor': '#FFF176',
        },
        contentStyle: {
          color: 'black',
        },
      },
    };
    const snackBarStyle = {
      marginBottom: '20px',
      left: '20%',
    };

    const onAddComment = this.onAddComment.bind(this);
    const onChange = this.onChange.bind(this);
    const handleRequestClose = this.handleRequestClose.bind(this);
    let addAction = null;
    const authenticated = getSession().authenticated;
    if (authenticated) {
      addAction = <div>
        <TextField floatingLabelText="Write a response.."
          value={this.state.comment}
          onChange={onChange}
          style={{width: '85%'}}/>
        <FlatButton label="Save" onClick={onAddComment} />
      </div>;
    } else {
      addAction =<div>
        <hgroup>
          <formgroup>
            <h3>Please login to add responses</h3>
          </formgroup>
          <RaisedButton label="Login" onClick={this.login} />
        </hgroup>
      </div>;
    }
    return (
      <div>
        <Snackbar
         open={this.state.errorMessage.open}
         message={this.state.errorMessage.message}
         autoHideDuration={4000}
         onRequestClose={handleRequestClose}
         style={snackBarStyle}
         bodyStyle={snackBarStyleMap.error.bodyStyle}
         contentStyle={snackBarStyleMap.error.contentStyle}
       />
        <div>
          {addAction}
        </div>
      </div>
    );
  }
}

CommentForm.propTypes = {
  post: React.PropTypes.object.isRequired,
  onAdd: React.PropTypes.func.isRequired,
};

export default CommentForm;
