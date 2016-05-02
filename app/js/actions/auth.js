import { setUserLogin } from '../util/db';

export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const ADD_FAVE = 'ADD_FAVE';

export function logIn(user) {
  setUserLogin(user);

  return dispatch => dispatch({
    type: LOG_IN,
    user,
  });
}

export function logOut() {
  return dispatch => dispatch({
    type: LOG_OUT,
  });
}

export function addFave(article) {
  return dispatch => dispatch({
    type: ADD_FAVE,
    article,
  });
}
