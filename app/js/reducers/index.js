import { combineReducers } from 'redux'
//import nyTimesNewsArticles from './nyTimesNewsArticles';
import sourceFilters from './sourceFilters';
import users from './users';
import auth from './auth';

const rootReducer = combineReducers({
  //nyTimesNewsArticles, TODO
  sourceFilters,
  users,
  auth,
});

export default rootReducer;
