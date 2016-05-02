import React from 'react';
import { connect } from 'react-redux';
import Article from '../components/Article';

function mapStateToProps(state) {
  return {
    articles: state.articles,
    sourceFilters: state.sourceFilters,
  };
}

class Articles extends React.Component {

  render() {
    const articles = [];
    this.props.articles.forEach(a => {
      const split = a.split('.');
      console.log(split);
      if (this.props.sourceFilters[split[0]]) {
        articles.push(window.articles[split[0]][split[1]]);
      }
    });

    return (
      <div className="articles-list">
        <ul>
          {articles.map(a => {
            return (
              <Article
                key={a.title}
                article={a}
              />
            );
          })}
        </ul>
      </div>
    );
  }

}

export default connect(mapStateToProps)(Articles);