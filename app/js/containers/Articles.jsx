import React from 'react';
import { connect } from 'react-redux';
import Article from '../components/Article';
import { addFave } from '../actions/auth';

function mapStateToProps(state) {
  return {
    articles: state.articles,
    sourceFilters: state.sourceFilters,
    auth: state.auth,
  };
}

class Articles extends React.Component {

  constructor() {
    super();

    this.favorite = this.favorite.bind(this);
  }

  favorite(article) {
    this.props.dispatch(addFave(this.props.auth.user, article));
  }

  render() {
    const articles = [];
    this.props.articles.forEach(a => {
      const split = a.split('.');
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
                showFave={!!this.props.auth.user}
                favorited={false}
                onFave={this.favorite}
              />
            );
          })}
        </ul>
      </div>
    );
  }

}

export default connect(mapStateToProps)(Articles);