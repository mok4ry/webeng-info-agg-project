import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';

const INITIAL_STATE = {
  sourceFilters: {
    US_NEWS: true,
    WORLD_NEWS: false,
    SPORTS: false,
    WEATHER: false,
    TECH: false,
  },
};

const store = createStore(
  reducer,
  INITIAL_STATE,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

export default store;
