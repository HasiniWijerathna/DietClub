import axios from 'axios';

import {getSession} from './SessionService';

/**
 * Generates headers if the session is authenticated
 * @return {String} The headers
 */
const generateHeaders = () => {
  const session = getSession();
  const headers = {};

  if (session.authenticated) {
    headers['Authorization'] = `Bearer: ${session.token}`;
  }

  return headers;
};

/**
 * Sends a GET requests
 * @param  {Stirng} url    The URL of the current request
 * @param  {String} params [description]
 * @return {Request}       The GET request
 */
const get = (url, params) => {
  const headers = generateHeaders();

  return axios.get(url, {
    headers,
    params,
  });
};

/**
 * Sends a POST request
 * @param  {String} url  The URL of the currrent request
 * @param  {Object} data The data object of the request
 * @return {Request}     The POST request
 */
const post = (url, data) => {
  const headers = generateHeaders();

  return axios.post(url, data, {headers});
};

/**
 * Sends a PUT request
 * @param  {String} url  The URL of the current request
 * @param  {Object} data The data object of the request
 * @return {Request}     The PUT request
 */
const put = (url, data) => {
  const headers = generateHeaders();

  return axios.put(url, data, {headers});
};

/**
 * Sends a DELETE request
 * @param  {String} url    The URL of the current request
 * @param  {[type]} params [description]
 * @return {Request}       The DELETE request
 */
const httDelete = (url, params) => {
  const headers = generateHeaders();
  return axios.delete(url, {
    headers,
    params,
  });
};

export {get, post, put, httDelete};
