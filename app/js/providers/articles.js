import { getFaveArticles } from '../util/db';

function usNews(callback) {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = () => {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      const items = xmlHttp.responseXML.querySelectorAll('item')
      callback(Object.keys(items).map(i => {
        return {
          title: items[i].querySelector('title').innerHTML,
          link: items[i].querySelector('link').innerHTML,
          description: items[i].querySelector('description').innerHTML,
          pubDate: items[i].querySelector('pubDate').innerHTML,
        };
      }));
    }
  }
  xmlHttp.open('GET', './rss.php?url=http://www.usnews.com/rss/news', true);
  xmlHttp.overrideMimeType('text/xml');
  xmlHttp.send(null);
}

function worldNews(callback) {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = () => {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      const items = xmlHttp.responseXML.querySelectorAll('item')
      callback(Object.keys(items).map(i => {
        return {
          title: items[i].querySelector('title').innerHTML,
          link: items[i].querySelector('link').innerHTML,
          description: items[i].querySelector('description').innerHTML,
          pubDate: items[i].querySelector('pubDate').innerHTML,
        };
      }));
    }
  }
  xmlHttp.open('GET', './rss.php?url=http://feeds.bbci.co.uk/news/rss.xml', true);
  xmlHttp.overrideMimeType('text/xml');
  xmlHttp.send(null);
}

function sports(callback) {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = () => {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      const items = xmlHttp.responseXML.querySelectorAll('item');
      callback(Object.keys(items).map(i => {
        return {
          title: items[i].querySelector('title').innerHTML.replace(/<!\[CDATA\[/, '').replace('\]\]>', ''),
          link: items[i].querySelector('link').innerHTML,
          description: items[i].querySelector('description').innerHTML.replace(/<!\[CDATA\[/, '').replace('\]\]>', ''),
          pubDate: items[i].querySelector('pubDate').innerHTML,
        };
      }));
    }
  };
  xmlHttp.open('GET', './rss.php?url=http://espn.go.com/espn/rss/news', true);
  xmlHttp.overrideMimeType('text/xml');
  xmlHttp.send(null);
}

function tech(callback) {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = () => {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      const items = xmlHttp.responseXML.querySelectorAll('item');
      callback(Object.keys(items).map(i => {
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
}

function faves(callback) {
  callback(getFaveArticles());
}

const QUERIES = {
  US_NEWS: usNews,
  WORLD_NEWS: worldNews,
  SPORTS: sports,
  TECH: tech,
  FAVORITES: faves,
};

function getArticles(source, callback) {
  QUERIES[source](callback);
}

export { getArticles };
