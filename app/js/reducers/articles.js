import { ADD_ARTICLES, LOAD_MORE } from '../actions/articles';

const loaded = {
  US_NEWS: 0,
  WORLD_NEWS: 0,
  SPORTS: 0,
  TECH: 0,
}

function pickSourceForMore(state) {
  let min = 9999;
  let source = '';
  Object.keys(loaded).forEach(s => {
    if (s !== 'FAVORITE' && loaded[s] !== 0 && loaded[s] < min) source = s;
  });
  return source;
} 

export default function articles(state = [], action) {
  switch(action.type) {
    case ADD_ARTICLES:
      loaded[action.source] = 6;
      return [
        action.source + '.0',
        action.source + '.1',
        action.source + '.2',
        action.source + '.3',
        action.source + '.4',
        action.source + '.5',
        ...state,
      ];
    case LOAD_MORE:
      const src = pickSourceForMore(state);
      const newState = [
        ...state,
        src + '.' + (loaded[src] + 1),
        src + '.' + (loaded[src] + 2),
        src + '.' + (loaded[src] + 3),
        src + '.' + (loaded[src] + 4),
        src + '.' + (loaded[src] + 5),
      ];
      loaded[src] += 5;
      return newState;
    default:
      return state;
  }
}
