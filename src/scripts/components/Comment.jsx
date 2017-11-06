import React, {Component} from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import TextField from 'material-ui/TextField';

/**
* Represents the  logic of adding new comments functionality
*/
class Comment extends Component {
/**
* Class constructor
* @param {Object} props User define component
*/
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editingComment: '',
    };
  }
/**
* Sends the comment to be deleted to the delete function on the comment form
*/
  onDelete() {
    this.props.onDelete(this.props.comment);
  }
/**
* Updates the state with the editingComment
* @param  {String} comment The editing comment
*/
  onEdit(comment) {
    this.setState({
      editMode: true,
      editingComment: comment.comment,
    });
  }
/**
* Sends the comment to be edited to the edit comment function on the comment form
* @param  {String} comment The editing comment
*/
  onSave(comment) {
    this.props.onEdit(comment, this.state.editingComment);

    this.setState({
      editMode: false,
      editingComment: '',
    });
  }
/**
* Updates the state if the user does not edit the comment
*/
  onCancel() {
    this.setState({
      editMode: false,
      editingComment: '',
    });
  }
/**
* Updates the state with the editing comment
* @param  {Event} event Change event of the editing comment
*/
  onChange(event) {
    this.setState({
      editingComment: event.target.value,
    });
  }
/**
* Describes the elements on the Add new post page
* @return {String} HTML elements
*/
  render() {
    const deleteComment = this.onDelete.bind(this);
    const onEdit = this.onEdit.bind(this, this.props.comment);
    const onSave = this.onSave.bind(this, this.props.comment);
    const onCancel = this.onCancel.bind(this);
    const onChange = this.onChange.bind(this);

    const label = {
      minWidth: '90%',
    };
    let body = null;

    if (this.state.editMode) {
      body = (
        <div>
          <TextField
            floatingLabelText="Edit your response"
            value={this.state.editingComment}
            onChange={onChange}
             style={{width: '90%'}}
          />
          <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
          >
            <MenuItem primaryText="Save" onClick={onSave} />
            <MenuItem primaryText="Cancel" onClick={onCancel} />
          </IconMenu>
        </div>
      );
    } else {
      body = (
        <div>
          <label className= "commentLabel" htmlFor="commment">{this.props.comment.comment}</label>
          <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            <MenuItem primaryText="Delete" onClick={deleteComment} />
            <MenuItem primaryText="Edit" onClick={onEdit} />
          </IconMenu>
        </div>
      );
    }
    return body;
  }
}

Comment.propTypes = {
  comment: React.PropTypes.object.isRequired,
  onDelete: React.PropTypes.func.isRequired,
  onEdit: React.PropTypes.func.isRequired,
};

export default Comment;
