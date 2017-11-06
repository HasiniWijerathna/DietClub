import React from 'react';
import {browserHistory} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';

import {modelURL} from '../services/urlFactory';
import Snackbar from 'material-ui/Snackbar';
import {getSession} from '../services/SessionService';
import BaseContainer from './BaseContainer';
/**
* Represents the view logic of adding new blogs functionality
*/
class AddNewBlog extends BaseContainer {
  /**
  * Class constructor
  * @param {Object} props User define component
  */
  constructor(props) {
    super(props);
    this.state = {
      blog: {
        name: '',
        category: '',
      },
      open: false,
      message: '',
      value: 8,
      category: [],
    };
    this.getCategory = this.getCategory.bind(this);
  }

  /**
   * Called after the component is mounted
   */
  componentDidMount() {
    this.getCategory();
  }
  /**
   * Allows logged users to add blogs
   */
  addNewBlog() {
    const loggedUser = getSession().user.id;
    if(!this.state.blog.name && !this.state.blog.category) {
      this.setState({
        blog: {
          name: '',
          category: '',
        },
        open: true,
        message: 'Blog name and category can not be empty',
      });
    } else if (loggedUser) {
      const url = modelURL('blog');
      const data = {
        name: this.state.blog.name,
        category: this.state.value,
      };
      this.makePOSTrequest(url, data)
        .then(() => {
          browserHistory.goBack();
        })
      .catch((error) => {
        this.setState({
          blog: {
            name: '',
            category: '',
          },
          open: true,
          message: 'Plese login to add blogs',
        });
      });
    }
  }
/**
* Updates the state according to the change event of the blog name
* @param  {Event} changeEvent  Change event of the blog name
*/
  onChangeName(changeEvent) {
    const newName = changeEvent.target.value;
    const blog = this.state.blog;

    blog.name = newName;
    this.setState({blog});
  }
/**
* Updates the state according to the change event of the category
* @param  {Event} event  Change event of the blog name
* @param  {Integer} index  Change event of the category index
* @param  {String} value  Change event of the category
*/
  handleChangeList(event, index, value) {
    this.setState({value});
  }
/**
 * Hides the snackbar when the user clicks it
 */
  handleRequestClose() {
    this.setState({
      open: false,
      message: '',
    });
  }
/**
* Gets all the blog categories
*/
  getCategory() {
    const url = modelURL('blogCategory');
    this.makeGETRequest(url)
      .then((response) => {
        this.setState({
          value: '1',
          category: response.results,
        });
      })
      .catch((error) => {
        this.setState({
          open: true,
          message: 'Oops something went wrong',
        });
      });
  }
/**
* Describes the elements on the Add new post page
* @return {String} HTML elements
*/
  render() {
    const onAddBlog = this.addNewBlog.bind(this);
    const onChangeName = this.onChangeName.bind(this);
    const handleRequestClose = this.handleRequestClose.bind(this);
    const handleChangeList = this.handleChangeList.bind(this);
    const styles = {
      customWidth: {
        width: 200,
        paddingTop: '6px',
      },
    };
    const buttonStyle = {
      marginLeft: '20px',
      marginTop: '20px',
      float: 'left',
    };
    const textBarStyle = {
      paddingLeft: '22px',
      marginBottom: '35px',
    };

    let dropDown = null;
    if(this.state.category) {
      const blogCategory = this.state.category;
      let categories = [];

      if (blogCategory && blogCategory.length) {
        categories = blogCategory.map((item) => {
          return <MenuItem key={`${item.id}`} value={`${item.id}`} primaryText={item.name}/>;
        });
      }

      dropDown =(
        <DropDownMenu
          value={this.state.value}
          style={styles.customWidth}
          onChange={handleChangeList}>
          {categories}
        </DropDownMenu >
      );
    }
    return (
      <div>
        <Snackbar
         open={this.state.open}
         message={this.state.message}
         autoHideDuration={4000}
         onRequestClose={handleRequestClose}
       />
        <div>
          <div className="addBlog">
            <p>New blog</p>
          </div>
          <TextField floatingLabelText="Name" value={this.state.blog.name} onChange={onChangeName} fullWidth
            style={textBarStyle}/>
        </div>
        <div>
          <div className ="addBlog">
            <p>Select a blog category</p>
          </div>
          {dropDown}
        </div>
        <RaisedButton label="Save" primary onClick={onAddBlog} style={buttonStyle} />
      </div>
    );
  }

}
AddNewBlog.propTypes = {
  params: React.PropTypes.object.isRequired,
};

export default AddNewBlog;
