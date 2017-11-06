import {browserHistory} from 'react-router';

/**
 * Returns current session
* @return {object}  Currernt session object
 */
const getSession = () => {
  const session = localStorage.session ? JSON.parse(localStorage.session) : {authenticated: false};
  if (session) {
    return session;
  } else {
    browserHistory.push('login');
  }
};
/**
 * Update session
 * @param  {object} session Updated session
 */
const setSession = (session) => {
  localStorage.session = JSON.stringify(session);
};

/**
 * Checks if the current sesion is authenticated
 * @return {Boolean}  true if current session is authenticated
 */
const isAuthenticated = () => `${getSession().authenticated}` === 'true';

/**
 * Reset current session
 */
const resetSession = () => {
  const session = {
    authenticated: false,
  };
  setSession(session);
};

export {getSession, setSession, isAuthenticated, resetSession};
