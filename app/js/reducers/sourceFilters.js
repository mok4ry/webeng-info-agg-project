import { SELECT_SOURCE, DESELECT_SOURCE } from '../actions/sourceFilters';

export default function sourceFilters(state = {}, action) {
  switch (action.type) {
    case SELECT_SOURCE:
      return Object.assign({}, state, { [action.source]: true });

    case DESELECT_SOURCE:
      return Object.assign({}, state, { [action.source]: false });

    default:
      return state;
  }
};