import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';
import parse from 'xml-parser';
import { fetchArticles } from './actions/articles';

const users = {};
const local = window.localStorage._infoAgg ?
  JSON.parse(window.localStorage._infoAgg) : {};

if (local.users) {
  Object.keys(local.users).forEach(u => {
    users[u] = local.users[u].pass;
  });
}

const INITIAL_STATE = {
  sourceFilters: {
    US_NEWS: true,
    WORLD_NEWS: false,
    SPORTS: false,
    WEATHER: false,
    TECH: false,
  },
  users: users,
};

window.articles = {};

const store = createStore(
  reducer,
  INITIAL_STATE,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

store.dispatch(fetchArticles('US_NEWS'));

export default store;
