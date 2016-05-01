import { addNewUser } from '../util/db';

export const ADD_USER = 'ADD_USER';

export function addUser(user) {
  addNewUser(user.name, user.pass);

  return dispatch => dispatch({
    type: ADD_USER,
    user
  });
};