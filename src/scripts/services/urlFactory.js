import url from 'url-join';

const API = process.env.api;
const BASE = url(`${API.protocol + API.baseURL}`, API.prefix, API.version);

/* URL for login page */
const loginURL = () => url(BASE, 'auth/login');

/* URL for Registration page */
const registerURL = () => url(BASE, 'auth/register');

/**
* Returns the modelURL
* @param  {String} modelName   The model name
* @param  {Integer} resourceId The resourceId
* @return {String}             The model url
*/
const modelURL = (modelName, resourceId) => {
  let modelURL = url(BASE, modelName);

  if (resourceId) {
    modelURL = url(modelURL, `${resourceId}`);
  }

  return modelURL;
};

/**
 * Returns the modelLikeURL
* @param  {String} modelURL   The model url
 * @return {String}           The modelLikeURL
 */
const modelLikeURL = (modelURL) => {
  const modelLikeURL = url(modelURL, 'like');

  return modelLikeURL;
};

/**
 * Returns get Posts URL
 * @param  {String} userId The userId
 * @return {String}        The getPostURL
 */
const getPosts = (userId) => {
  const getPosts = modelURL('user', userId);
  const getPostsURL = url(getPosts, 'posts');

  return getPostsURL;
};
/**
 * Returns get Blogs URL
 * @param  {String} userId The userId
 * @return {String}        The getPostURL
 */
const getBlogs = (userId) => {
  const getBlogs = modelURL('user', userId);
  const getBlogsURL = url(getBlogs, 'blogs');

  return getBlogsURL;
};
/**
 * Returns get user favourite Blog URL
 * @param  {String} userId The userId
 * @return {String}        The getPostURL
 */
const getFavouriteBlogs = (userId) => {
  const favouriteBlogs = modelURL('user', userId);
  const getFavouriteBlogs = url(favouriteBlogs, 'blogs', 'favourites');

  return getFavouriteBlogs;
};
export {loginURL, registerURL, modelURL, modelLikeURL, getPosts, getBlogs, getFavouriteBlogs};
