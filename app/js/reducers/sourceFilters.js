import { SELECT_SOURCE, DESELECT_SOURCE } from '../actions/sourceFilters';

function numSelected(state) {
  let count = 0;
  Object.keys(state).forEach(f => {
    if (state[f]) count++;
  });
  return count;
}

export default function sourceFilters(state = {}, action) {
  switch (action.type) {
    case SELECT_SOURCE:
      return Object.assign({}, state, { [action.source]: true });

    case DESELECT_SOURCE:
      if (numSelected(state) === 1)
        return state;
      return Object.assign({}, state, { [action.source]: false });

    default:
      return state;
  }
};