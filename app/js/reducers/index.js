import { combineReducers } from 'redux'
//import nyTimesNewsArticles from './nyTimesNewsArticles';
import sourceFilters from './sourceFilters';
import users from './users';
import auth from './auth';
import articles from './articles';

const rootReducer = combineReducers({
  sourceFilters,
  users,
  auth,
  articles,
});

export default rootReducer;
