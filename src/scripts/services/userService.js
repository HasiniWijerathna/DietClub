import {getUsers} from './services/juiceBarService';
import {getProfile} from './juiceBarService';

const searchUser = (userName, password) => {
  let users = getUsers();
  let userProfile = getProfile();
  const error = 'error';
  users.forEach((profile) => {

    console.log(userName);
    if (profile.userName === userName && profile.password === password) {
      console.log('Login done');
      profile = userProfile;
      console.log(userProfile);
      return profile;
    } else {
      console.log('Invalid credentials');
      return error;
    }
  });

};

const getnewUserId = () => {
    console.log(JSON.stringify(getUsers()));
    // setter
    localStorage.setItem('users', JSON.stringify(getUsers()));

    const results = localStorage.getItem('users');
    const users = JSON.parse(results);
    const newUserId = users.length +1;
    return newUserId;
}

export {searchUser, getnewUserId};
