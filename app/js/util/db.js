import moment from 'moment';

const local = window.localStorage._infoAgg ?
  JSON.parse(window.localStorage._infoAgg) : {
    users: {},
  };

let loggedIn = null;

function save() {
  window.localStorage._infoAgg = JSON.stringify(local);
}

// initial save
save();

function userExists(user) {
  return !!local.users[user];
}

function addNewUser(username, password) {
  local.users[username] = {
    pass: password,
  };
  save();
}

function setUserLogin(user) {
  loggedIn = user;
  local.users[user].lastLogin = local.users[user].currentLogin;
  local.users[user].currentLogin = moment().format();
  save();
}

function logOut() {
  loggedIn = null;
}

function getUserLastLogin(user) {
  return local.users[user].lastLogin;
}

function addFavoriteArticle(user, article) {
  if (!local.users[user].faves) {
    local.users[user].faves = [];
  }
  local.users[user].faves.push(article);
  save();
}

function getFaveArticles() {
  if (!loggedIn || !local.users[loggedIn].faves)
    return [];
  else
    return local.users[loggedIn].faves;
}

export {
  userExists,
  addNewUser,
  setUserLogin,
  logOut,
  getUserLastLogin,
  addFavoriteArticle,
  getFaveArticles,
};