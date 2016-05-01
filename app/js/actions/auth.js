import { setUserLogin } from '../util/db';

export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

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
