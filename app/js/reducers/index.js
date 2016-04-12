import { combineReducers } from 'redux'
//import nyTimesNewsArticles from './nyTimesNewsArticles';
import sourceFilters from './sourceFilters';
import users from './users';

const rootReducer = combineReducers({
  //nyTimesNewsArticles, TODO
  sourceFilters,
  users,
});

export default rootReducer;
