import React from 'react';
import {modelURL} from '../services/urlFactory';
import BaseContainer from './BaseContainer';
import {browserHistory} from 'react-router';

import {grey700} from 'material-ui/styles/colors';
import LinearProgress from 'material-ui/LinearProgress';
import Subheader from 'material-ui/Subheader';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {List} from 'material-ui/List';
import {Card, CardActions, CardHeader, CardTitle} from 'material-ui/Card';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

/**
* Represents the view logic of all blogs functionality
*/
class AllBlogs extends BaseContainer {
/**
* Navigates to the relevent blog page
* @param  {Integer} blogId Id of the selected blog
*/
  static onBlogClick(blogId) {
    browserHistory.push(`/blogs/${blogId}`);
  }
/**
* Class constructor
* @param {Object} props User define component
*/
  constructor(props) {
    super(props);

    this.state = {
      blogsData: [],
      open: false,
      message: '',
      completed: 5000,
      loading: false,
    };
  }
/**
* Navigates to the Add blogs page
*/
  addNewBlog() {
    browserHistory.push('blogs/new');
  }
/**
 * Called after the component is mounted
 */
  componentDidMount() {
    this.requestData();
  }
/**
 * Request all data from the API
 */
  requestData() {
    const url = modelURL('blog');
    this.fetchData(url, true);
  }
  /**
  * Abstract function to fetch data from the API
  * @param  {String} url           The URL to GET from
  * @param  {String} isCollection  Indicates whether the returning data set is a collection
  * @param  {Object} params        The params to be passed with the request
  */
  fetchData(url, isCollection, params) {
    this.setState({
      loading: true,
    });

    this.makeGETRequest(url)
    .then((response) => {
      this.setState({
        loading: false,
        blogsData: response.results,
      });
    })
    .catch((error) => {
      this.setState({
        loading: false,
        open: false,
        message: 'Oops something went wrong!',
      });
    });
  }
/**
 * Hides the snack bar
 */
  handleRequestClose() {
    this.setState({
      open: false,
      message: '',
    });
  }
/**
* Describes the elements on the Add new post page
* @return {String} HTML elements
*/
  render() {
    const handleRequestClose = this.handleRequestClose.bind(this);
    const addNewBlog = this.addNewBlog.bind(this);
    const buttonStyle = {
      position: 'fixed',
      bottom: '16px',
      right: '16px',
      marginBottom: '10px',
      zIndex: 99999,
    };
    const styles = {
      underlineStyle: {
        borderColor: grey700,
      },
      floatingLabelStyle: {
        color: grey700,
      },
    };
    const blogName = [];
    this.state.blogsData.map((blog) =>
      blogName.push(blog.name)
    );
    const blogs = this.state.blogsData.map((blog) => {
      const onBlogClick = AllBlogs.onBlogClick.bind(this, blog.id);
      const noOfPosts = blog.Posts.length;
      const blogger = [];
      if(blog.User) {
        blogger.push(blog.User.username);
      }
      return (
        <div key={blog.id}>
          <Card>
            <CardHeader
              title="No of posts"
              subtitle={noOfPosts}
            />
            <CardTitle title={blog.name} subtitle= {blogger} />
            <CardActions>
              <RaisedButton label="Click here for posts" onClick={onBlogClick} />
            </CardActions>
          </Card>
        </div>
      );
    });
    let content =null;
    const loading = this.state.loading;
    if(loading) {
      content=(
        <LinearProgress mode="indeterminate"/>
      );
    } else {
      content =(
        <div>
          <div>
            <AutoComplete
             floatingLabelText="Search Blogs"
             floatingLabelStyle = {styles.floatingLabelStyle}
             underlineFocusStyle={styles.underlineStyle}
              filter={AutoComplete.caseInsensitiveFilter}
              dataSource={blogName}
              onNewRequest={this.addNewBlog}
              fullWidth
            />
          </div>
          <List>
            <Subheader>Blogs</Subheader>
            {blogs}
          </List>
          <FloatingActionButton onClick={addNewBlog} style={buttonStyle}>
            <ContentAdd />
          </FloatingActionButton>
        </div>
      );
    }
    return(
      <div>
        <div className =".app.blogList">
          <Snackbar
           open={this.state.open}
           message={this.state.message}
           autoHideDuration={4000}
           onRequestClose={handleRequestClose} />

          <div>{content}</div>
        </div>
      </div>
    );
  }
}
export default AllBlogs;
