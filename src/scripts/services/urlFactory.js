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


export {loginURL, registerURL, modelURL, modelLikeURL};
