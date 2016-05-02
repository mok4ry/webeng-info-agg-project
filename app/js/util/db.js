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

function addFavoriteArticle(article) {
  if (!local.users[loggedIn].faves) {
    local.users[loggedIn].faves = {};
  }
  local.users[loggedIn].faves[article].title = article;
  save();
}

function getFaveArticles() {
  if (!loggedIn || !local.users[loggedIn].faves)
    return [];
  else {
    window.articles.FAVORITES = Object.keys(local.users[loggedIn].faves).map(t => local.users[loggedIn].faves[t]);
    return window.articles.FAVORITES;
  }
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