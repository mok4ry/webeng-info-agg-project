import { ADD_USER } from '../actions/users';

export default function users(state = {}, action) {
  switch(action.type) {
    case ADD_USER:
      return Object.assign({}, state, {
        [action.user.name]: action.user.pass
      });
    default:
      return state;
  }
}