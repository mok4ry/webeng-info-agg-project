import { getArticles } from '../providers/articles';

export const ADD_ARTICLES = 'GET_ARTICLES';

function addArticles(source, results) {
  return {
    type: ADD_ARTICLES,
    source,
    results,
  };
}

export function fetchArticles(source) {
  return dispatch => {
    getArticles(source, (results) => {
      window.articles[source] = results;
      dispatch(addArticles(source, results));
    });
  };
}