import {
  findIndex,
} from 'lodash';

/**
 * Sample data array
 * @type {Array}
 */
const blogs = [{
  id: 1,
  name: 'Hasini\'s ReactJS Adventures',
  author: 'Hasini Wijerathne',
  posts: [{
    id: 1,
    title: 'Post 1',
    content: 'Post 1 content',
    comments: [{
      id: 1,
      comment: 'comment 1',
    }, {
      id: 2,
      comment: 'comment 2',
    }],
  }, {
    id: 2,
    title: 'Post 2',
    content: 'Post 2 content',
    comments: [{
      id: 1,
      comment: 'comment 3',
    }, {
      id: 2,
      comment: 'comment 4',
    }],
  }],
}, {
  id: 2,
  name: 'Pasange Wikara',
  author: 'Pasan Eranga',
  posts: [{
    id: 1,
    title: 'Post 3',
    content: 'Post 3 content',
    comments: [{
      id: 1,
      comment: 'comment 4',
    }],
  }],
}];

/**
 * Returns all blog objects
 * @return {Array} The blogs array
 */
const getAllBlogs = () => blogs;

/**
 * Returns blog object of id
 * @param  {number} id The id of the required blog
 * @return {object}    Blog object of id
 */
/* (id) */

const getBlogById = (id) => {
  const allBlogs = getAllBlogs();
  const index = findIndex(allBlogs, (blog) => blog.id === id);

  return allBlogs[index];
};

/**
 * Returns post object of id
 * @param  {number} blogId The id of the required blog
 * @param  {number} postId The id of the required post
 * @return {object}        Post object of id
 */
const getPostById = (blogId, postId) => {
  const blog = getBlogById(blogId);
  const index = findIndex(blog.posts, (post) => post.id === postId);

  return blog.posts[index];
};

/**
 * Adding a new post
 * @param  {number} blogId The id of the required blog
 * @param  {object} post   post object
 */
const addPost = (blogId, post) => {
  const blog = getBlogById(blogId);
  let postId = 1;

  if (blog.posts && blog.posts.length) {
    postId = blog.posts[blog.posts.length - 1].id + 1;
  }

  post.id = postId;
  post.comments = [];

  blog.posts.push(post);
};

/**
 * Adding a new blog
 * @param  {object} blog blog object
 */
const addBlog = (blog) => {
  const allBlogs = getAllBlogs();
  const lastBlogId = allBlogs[allBlogs.length - 1].id;

  blog.id = lastBlogId + 1;
  blog.posts = [];
  blog.posts.comments = [];

  allBlogs.push(blog);
};

export {getAllBlogs, getBlogById, getPostById, addPost, addBlog};
