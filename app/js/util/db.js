import moment from 'moment';

const local = window.localStorage._infoAgg ?
  JSON.parse(window.localStorage._infoAgg) : {
    users: {},
  };

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
  local.users[user].lastLogin = local.users[user].currentLogin;
  local.users[user].currentLogin = moment().format();
  save();
}

function getUserLastLogin(user) {
  return local.users[user].lastLogin;
}

export {
  userExists,
  addNewUser,
  setUserLogin,
  getUserLastLogin,
};