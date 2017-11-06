import React from 'react';
import {httDelete} from '../services/Requests';
import {modelURL, modelLikeURL} from '../services/urlFactory';
import {getSession} from '../services/SessionService';
import {post} from '../services/Requests';
import BaseContainer from './BaseContainer';
import {browserHistory} from 'react-router';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import {Card, CardActions, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import ReactMarkdown from 'react-markdown';
import Snackbar from 'material-ui/Snackbar';
import {SocialIcon} from 'react-social-icons';
import IconButton from 'material-ui/IconButton';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ActionStar from 'material-ui/svg-icons/toggle/star-border';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import LinearProgress from 'material-ui/LinearProgress';

/**
 * Checks if the user has already liked the blog
 * @param  {Object} user The user object
 * @param  {Object} blog The blog object
 * @return {[type]}      [description]
 */
const hasUserLiked = (user, blog) => {
  let userLiked = false;

  if (blog && blog.BlogCounts) {
    userLiked = blog.BlogCounts
      .filter((favourite) => {
        return favourite.UserId === user.id;
      })
      .length > 0;
  }

  return userLiked;
};

/**
 * Representing the logic of presenting existing posts belogs to the blog
 */
class BlogPage extends BaseContainer {

/**
 * Navigates to the relevent post of the selected blog
 * @param  {Integer} blogId The blog ID
 * @param  {Integer} postId The post ID
 */
  static onPostClick(blogId, postId) {
    browserHistory.push(`/blogs/${blogId}/posts/${postId}`);
  }
/**
 * Navigates to the edit opst page
 * @param  {Integer} blogId The blogId
 * @param  {Integer} postId The postId
 */
  static navigateEditPost(blogId, postId) {
    browserHistory.push(`/blogs/${blogId}/posts/${postId}/editPost`);
  }
/**
* Navigates to the new post of the selcted blog
* @param {Integer} blogId The blog ID
*/
  static addNewPost(blogId) {
    const authenticated = getSession().authenticated;
    if(authenticated) {
      const loggedUser = getSession().user.id;
      const blogAddedUser = this.state.blog.UserId;
      if (blogAddedUser == loggedUser) {
        browserHistory.push(`/blogs/${blogId}/posts/new`);
      } else {
        this.setState({
          open: true,
          errorMessage: 'Invalied user',
        });
      }
    } else {
      browserHistory.push('login');
    }
  }
/**
* Class constructor
* @param {Object} props User define component
*/
  constructor(props) {
    super(props);
    this.state = {
      blog: {},
      open: false,
      errorMessage: '',
      count: false,
      alertOpen: false,
      loading: false,
    };

    this.fetchBlog = this.fetchBlog.bind(this);
  }

  /**
   * Called after the component is mounted
   */
  componentDidMount() {
    this.fetchBlog(this.props.params.blogId);
  }

/**
 * Fetaches a blogId
 * @param  {Integer} blogId The blogId
 */
  fetchBlog(blogId) {
    const url = modelURL('blog', blogId);
    this.setState({
      loading: true,
    });
    this.makeGETRequest(url)
      .then((response) => {
        this.setState({
          blog: response,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          dataLoading: true,
          blog: {},
          open: true,
          errorMessage: 'Oops something went wrong',
          loading: false,
        });
      });
  }

/**
 * Delets a selected post
 */
  onDeleteBlog() {
    const blogId = this.state.blog.id;
    const url = modelURL('blog', blogId);
    this.makeDELETErequest(url)
      .then((response) => {
        this.setState({
          post: {},
          loading: true,
        });
        browserHistory.push('/blogs');
      })
      .catch((error) => {
        this.setState({
          blog: {},
          loading: true,
        });
        this.fetchBlog(this.props.params.blogId);
      });
  }
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
   * Gets the count of the likes
   */
  toggleFavourite() {
    const blogId = this.state.blog.id;
    const baseURL = modelURL('blog', blogId, 'like');
    const url = modelLikeURL(baseURL);

    const method = hasUserLiked(getSession().user, this.state.blog) ? httDelete: post;
    method(url)
    .then((response) => {
      this.setState({
        blog: response.data,
      });
      this.fetchBlog(blogId);
    })
    .catch((error) =>{
      this.fetchBlog(blogId);
    });
  }
  /**
   * Sends a POST request when the button get clicked
   */
  toggleUp() {
    const blogId = this.state.blog.id;
    const baseURL = modelURL('blog', blogId, 'like');
    const url = modelLikeURL(baseURL);
    this.makePOSTrequest(url)
    .then((response) => {
      this.setState({
        blog: response.data,
      });
      this.fetchBlog(blogId);
    })
    .catch((error) => {
      this.setState({
        open: false,
        errorMessage: 'Oops something went wrong!',
      });
    });
  }
  /**
   * Sends a DELETE request when the button get clicked
   */
  toggleDown() {
    const blogId = this.state.blog.id;
    const baseURL = modelURL('blog', blogId, 'likTe');
    const url = modelLikeURL(baseURL);

    this.makeDELETErequest(url)
      .then((response) => {
        this.setState({
          blog: response.data,
        });
        this.fetchBlog(blogId);
      })
      .catch((error) => {
        this.fetchBlog(blogId);
        this.setState({
          open: false,
          errorMessage: 'Oops something went wrong!',
        });
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
   * Navigates to the registration page
   */
  signUp() {
    browserHistory.push('registration');
  }
/**
* Describes the elements on the Blog page
* @return {String} HTML elements
*/
  render() {
    const blog = this.state.blog;
    const addNewPost = BlogPage.addNewPost.bind(this, blog.id);
    const onDeleteBlog = this.onDeleteBlog.bind(this);
    const handleRequestClose = this.handleRequestClose.bind(this);
    const toggleUp = this.toggleUp.bind(this);
    const toggleDown = this.toggleDown.bind(this);
    const handleOpen = this.handleOpen.bind(this);
    const handleClose = this.handleClose.bind(this);
    const signUp = this.signUp.bind(this);
    const iconButton = {
      marginLeft: '700px',
    };
    const actions = [
      <FlatButton
      label="Sign up"
      primary={true}
      onTouchTap={signUp}
      />,
      <FlatButton
      label="Cancel"
      primary={true}
      onTouchTap={handleClose}
      />,
    ];
    const actionDelete = [
      <FlatButton
      label="Delete"
      primary={true}
      onTouchTap={onDeleteBlog}
      />,
      <FlatButton
      label="Cancel"
      primary={true}
      onTouchTap={handleClose}
      />,
    ];
    const buttonStyle = {
      position: 'fixed',
      bottom: '16px',
      right: '16px',
      marginBottom: '10px',
      zIndex: 99999,
    };

    const deleteButtonStyle = {
      marginLeft: '100px',
    };
    let favouriteButton = null;
    const authenticated = getSession().authenticated;
    if(authenticated) {
      const userLikedBlog = hasUserLiked(getSession().user, blog);
      if (userLikedBlog) {
        favouriteButton = (
          <div>
            <IconButton
              tooltip={this.state.count}
              touch={true}
              style={iconButton}
              onClick={toggleDown} >
              <ActionGrade />
            </IconButton>
          </div>
        );
      } else {
        favouriteButton = (
          <div>
            <IconButton
              tooltip={this.state.count}
              touch={true}
              style={iconButton}
              onClick={toggleUp} >
              <ActionStar />
            </IconButton>
          </div>
        );
      }
    } else {
      favouriteButton = (
        <div>
          <div>
            <IconButton
              tooltip={this.state.count}
              touch={true}
              style={iconButton}
              onClick={handleOpen} >
              <ActionStar />
            </IconButton>
            <Dialog actions={actions}
              modal={false}
              open={this.state.alertOpen}
              onRequestClose={handleClose}>
              Sign up to Bloggger to connect with voices and perspectives that matter
            </Dialog>
          </div>
        </div>
      );
    }

    let posts = [];
    let editPost = null;
    if(getSession().user) {
      const userId = getSession().user.id;
      const bloggger = this.state.blog.UserId;
      if(userId == bloggger) {
        if(blog.Posts && blog.Posts.length) {
          posts = blog.Posts.map((post) => {
            const navigateEditPost = BlogPage.navigateEditPost.bind(this, blog.id, post.id);
            editPost = (
              <RaisedButton label="Edit Post" onClick={navigateEditPost} />
          );
          });
        }
      }
    }
    if(blog.Posts && blog.Posts.length) {
      posts = blog.Posts.map((post) => {
        const onPostClick = BlogPage.onPostClick.bind(this, blog.id, post.id);
        const postContent = <div> <ReactMarkdown source={post.content || ''} /></div>;
        return (
          <div key={`${blog.id}-${post.id}`}>
            <Card key={`${blog.id}-${post.id}`}>>
                <CardTitle>
                  {post.title}
                  {postContent}
                </CardTitle>
              <CardActions>
                <RaisedButton label="View Post" onClick={onPostClick} />
                {editPost}
              </CardActions>
            </Card>
          </div>
        );
      });
    } else {
      posts = (<div><formgroup>
        <h3>No posts yet!</h3>
      </formgroup></div>);
    }

    let deleteAction = null;
    const auth = getSession().authenticated;
    if (auth) {
      const loggedUser = getSession().user.id;
      const blogAddedUser = this.state.blog.UserId;
      if(!this.state.blog) {
        this.fetchBlog(this.props.params.blogId);
        deleteAction = <RaisedButton label="Delete Blog" onClick={onDeleteBlog} style={deleteButtonStyle}/>;
      } else if (loggedUser == blogAddedUser) {
        deleteAction = <div>
          <RaisedButton label="Delete Blog" onClick={handleOpen} style={deleteButtonStyle}/>
          <Dialog actions={actionDelete}
            title="Delete"
            modal={false}
            open={this.state.alertOpen}
            onRequestClose={handleClose}>
            Deleted blogs are gone forever. Are you sure?
            </Dialog>
        </div>;
      }
    }
    let blogger = '';
    if(this.state.blog.User) {
      blogger = blog.User.username;
    }

    let content =null;
    const loading = this.state.loading;
    if(loading) {
      content=(
        <LinearProgress mode="indeterminate"/>
      );
    } else {
      content=(
        <div>
          <List>
            <header>
              {this.state.blog.name}
              {deleteAction}
              <div>
                <div>
                  {favouriteButton}
                </div>
              </div>
            </header>
            <Subheader>Postes</Subheader>
            <div>Posted by : {blogger}</div>
            {posts}
          </List>
          <FloatingActionButton
            style={buttonStyle}
            onClick={addNewPost}
            >
            <ContentAdd />
          </FloatingActionButton>
          <div className= "socialIcon">
            <SocialIcon url="http://twitter.com/" />
          </div>
        </div>
      );
    }

    return (
      <div>
        <Snackbar
         open={this.state.open}
         message={this.state.errorMessage}
         autoHideDuration={4000}
         onRequestClose={handleRequestClose}
       />
        <div>{content}</div>
      </div>
    );
  }
}

BlogPage.propTypes = {
  params: React.PropTypes.object.isRequired,
};

export default BlogPage;
