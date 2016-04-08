import { combineReducers } from 'redux'
//import nyTimesNewsArticles from './nyTimesNewsArticles';
import sourceFilters from './sourceFilters';

const rootReducer = combineReducers({
  //nyTimesNewsArticles, TODO
  sourceFilters,
});

export default rootReducer;
