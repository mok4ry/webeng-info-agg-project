import { ADD_ARTICLES } from '../actions/articles';

export default function articles(state = [], action) {
  switch(action.type) {
    case ADD_ARTICLES:
      return [
        ...state,
        action.source + '.0',
        action.source + '.1',
        action.source + '.2',
        action.source + '.3',
        action.source + '.4',
        action.source + '.5',
      ];
    default:
      return state;
  }
}
