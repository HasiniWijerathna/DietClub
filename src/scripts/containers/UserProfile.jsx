import React from 'react';
import BaseContainer from './BaseContainer';
import {getSession} from '../services/SessionService';
import {browserHistory} from 'react-router';
import {get} from '../services/Requests';
import {modelURL, getPosts, getBlogs, getFavouriteBlogs} from '../services/urlFactory';

import {Card, CardActions, CardHeader, CardMedia, CardTitle} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/action/class';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/create';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
/**
 * viewTypes of the content
 */
const viewTypes = {
  blogs: 'blogs',
  posts: 'posts',
  favourites: 'favourites',
};

/**
* Represents the view logic of User Profile functionality
*/
class UserProfile extends BaseContainer {
/**
 * Navigates to the relevent post of the selected blog
 * @param  {Integer} blogId The blog ID
 * @param  {Integer} postId The post ID
 */
  static onPostClick(blogId, postId) {
    browserHistory.push(`/blogs/${blogId}/posts/${postId}`);
  }
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
      favouriteBlogs: [],
      allBlogs: [],
      blogs: [],
      posts: [],
      viewType: 'blogs',
      open: false,
      message: '',
    };
    this.fetchUserPosts = this.fetchUserPosts.bind(this);
    this.fetchUserBlogs = this.fetchUserBlogs.bind(this);
    this.fetchBlogs = this.fetchBlogs.bind(this);
    this.fetchFavouriteBlogs = this.fetchFavouriteBlogs.bind(this);
  }
/**
 * Called after the component is mounted
 */
  componentDidMount() {
    this.fetchUserPosts();
    this.fetchUserBlogs();
    this.fetchBlogs();
    this.fetchFavouriteBlogs();
  }
/**
 * Navigate to the edit profile page
 */
  navigateEditProfile() {
    browserHistory.push('/editProfile');
  }
  /**
   * Fetches all the blogs and posts belongs to a user
   */
  fetchUserPosts() {
    const userId = getSession().user.id;
    const url = getPosts(userId);

    this.makeGETRequest(url)
    .then((response) => {
      this.setState({
        posts: response,
      });
    })
    .catch((error) => {
      this.setState({
        open: true,
        message: 'Oops something went wrong!',
      });
    });
  }
  /**
   * Fetches all the blogs and posts belongs to a user
   */
  fetchUserBlogs() {
    const userId = getSession().user.id;
    const url = getBlogs(userId);
    this.makeGETRequest(url)
    .then((response) => {
      this.setState({
        blogs: response,
      });
    })
    .catch((error) => {
      this.setState({
        open: true,
        message: 'Oops something went wrong!',
      });
    });
  }
  /**
   * Fetches all the blogs
   * @return {Event}          Sends a GET request
   */
  fetchBlogs() {
    const url = modelURL('blog');
    return get(url)
      .then((response) => {
        this.setState({
          allBlogs: response.data.results,
        });
      })
      .catch((error) => {
        this.setState({
          open: true,
          message: 'Oops something went wrong!',
        });
      });
  }
  /**
   * Fetches all user favourite blogs
   * @return {Event}          Sends a GET request
   */
  fetchFavouriteBlogs() {
    const userId = getSession().user.id;
    const url = getFavouriteBlogs(userId);
    return get(url)
      .then((response) => {
        const favouriteBlogs = [];
        response.data.map((favouriteBlog) => {
          if(favouriteBlog.Blog) {
            favouriteBlogs.push(favouriteBlog.Blog);
          }
        });
        this.setState({
          favouriteBlogs: favouriteBlogs,
        });
      })
      .catch((error) => {
        this.setState({
          open: true,
          message: 'Oops something went wrong!',
        });
      });
  }
/**
 * Sets the state according to the each value
* @param {String} type The view type
 */
  viewType(type) {
    this.setState({
      viewType: type,
    });
  }
/**
 * Navigate to the editProfile page
 */
  navigateEditProfile() {
    browserHistory.push('/editProfile');
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
/** Describes the elements on the About Us page
* @return {String} HTML elements
*/
  render() {
    const navigateEditProfile = this.navigateEditProfile.bind(this);
    const blogViewType = this.viewType.bind(this, viewTypes.blogs);
    const postViewType = this.viewType.bind(this, viewTypes.posts);
    const favouriteViewType = this.viewType.bind(this, viewTypes.favourites);
    const handleRequestClose = this.handleRequestClose.bind(this);
    const imageStyle = {
      height: '400px',
    };
    const overlayStyle = {
      height: '90px',
    };

    const posts = this.state.posts.map((post) => {
      const onPostClick = UserProfile.onPostClick.bind(this, post.BlogId, post.id);
      return(
        <div key={post.id}>
          <Card>
            <CardTitle title={post.title} />
            <CardActions>
              <RaisedButton label="Click here for posts" onClick={onPostClick}/>
            </CardActions>
          </Card>
        </div>
      );
    });
    const blogs = this.state.blogs.map((blog) => {
      const onBlogClick = UserProfile.onBlogClick.bind(this, blog.id);
      return(
        <div key={blog.id}>
          <Card>
            <CardTitle title={blog.name} />
            <CardActions>
              <RaisedButton label="View blogs" onClick={onBlogClick}/>
            </CardActions>
          </Card>
        </div>
      );
    });
    const favouriteBlogs = this.state.favouriteBlogs.map((favouriteBlog, index) => {
      if(favouriteBlog) {
        const onBlogClick = UserProfile.onBlogClick.bind(this, favouriteBlog.id);
        return(
          <div key={index}>
            <Card>
              <CardTitle title={favouriteBlog.name} />
              <CardActions>
                <RaisedButton label="View blogs" onClick={onBlogClick}/>
              </CardActions>
            </Card>
          </div>
        );
      }
    });
    const bloggerName = getSession().user.name;
    const list = getSession().user.createdAt.split(':');
    const createdAt = list[0];
    const date = createdAt.split('-');
    const year = date[0];
    const month = date[1];
    const memberSince = `Member since : ${month}-${year}`;
    const postedBy = `Posted by : ${bloggerName}`;
    let content = (<div>
      {posts}
    </div>);
    switch(this.state.viewType) {
    case viewTypes.blogs:
      content = (<div>
        <CardTitle title="Blogs" subtitle={postedBy}/>
        {blogs}
      </div>);
      break;
    case viewTypes.posts:
      content = (<div>
        <CardTitle title="Posts" subtitle={postedBy} />
        {posts}
      </div>);
      break;
    case viewTypes.favourites:
      content = (<div>
        <CardTitle title="Favourites" subtitle="Your favourites" />
        {favouriteBlogs}
      </div>);
      break;
    default:
      content = (<div>
        {posts}
      </div>);
    }
    return(
      <div>
        <Snackbar
         open={this.state.open}
         message={this.state.message}
         autoHideDuration={4000}
         onRequestClose={handleRequestClose}
       />
        <div id="profileCard">
          <Card>
            <CardMedia
             overlay={
               <CardHeader
                 id="cardHeader"
                 style={overlayStyle}
                 title={bloggerName}
                 subtitle={memberSince}
                 avatar="https://cdn2.iconfinder.com/data/icons/rcons-user/32/female-shadow-fill-circle-256.png "
              />
            }>
              <img src="https://atiinc.org/wp-content/uploads/2017/01/cover-default.jpg" style={imageStyle} />
            </CardMedia>
          </Card>
        </div>
        <div className="profileGrid">
          <List className="col-sm-5 col-md-3">
            <Subheader>Start reading your Stories</Subheader>
            <ListItem primaryText="Blogs" leftIcon={<ContentDrafts />} onClick={blogViewType}/>
            <ListItem primaryText="Posts" leftIcon={<ContentInbox />} onClick={postViewType}/>
            <ListItem primaryText="Favourites" leftIcon={<ActionGrade />} onClick={favouriteViewType}/>
            <ListItem primaryText="Edit Profile" leftIcon={<ContentSend />} onClick={navigateEditProfile}/>
          </List>
          <div className="profileGrid col-sm-7 col-md-9">
            <card>
              {content}
            </card>
          </div>
        </div>
      </div>
    );
  }
}
export default UserProfile;
