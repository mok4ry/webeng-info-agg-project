import { ADD_NYT_NEWS_SUCCESS } from '../actions/nyTimesNews';

export default function nyTimesNewsArticles(state = [], action) {
  switch (action.type) {
    case ADD_NYT_NEWS_SUCCESS:
      // TODO
      return state;
    default:
      return state;
  }
};
