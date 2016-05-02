import { LOG_IN, LOG_OUT, ADD_FAVE } from '../actions/auth';
import { addFavoriteArticle, getFaveArticles } from '../util/db';

export default function auth(state = {}, action) {
  switch(action.type) {
    case LOG_IN:
      return {
        user: action.user,
        faves: getFaveArticles(),
      };
    case LOG_OUT:
      return {};
    case ADD_FAVE:
      addFavoriteArticle(action.article);
      return {
        user: state.user,
        faves: getFaveArticles(),
      };
    default:
      return state;
  }
};
