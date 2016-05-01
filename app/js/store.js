import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';
import parse from 'xml-parser';

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

const xmlHttp = new XMLHttpRequest();
xmlHttp.onreadystatechange = () => {
  if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
    const items = xmlHttp.responseXML.querySelectorAll('item');
    console.log(Object.keys(items).map(i => {
      return {
        title: items[i].querySelector('title').innerHTML,
        link: items[i].querySelector('link').innerHTML,
        description: items[i].querySelector('description').innerHTML,
        pubDate: items[i].querySelector('pubDate').innerHTML,
      };
    }));
  }
};
xmlHttp.open('GET', './rss.php?url=http://www.wired.com/feed', true);
xmlHttp.overrideMimeType('text/xml');
xmlHttp.send(null);

const store = createStore(
  reducer,
  INITIAL_STATE,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

export default store;
