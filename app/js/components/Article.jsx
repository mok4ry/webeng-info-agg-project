import React from 'react';

class Article extends React.Component {

  constructor() {
    super();

    this.fave = this.fave.bind(this);
  }

  fave() {
    this.props.onFave(this.props.article);
  }

  render() {
    const article = this.props.article;
    const faveButtonClass = `pure-button article-favorite-btn ${this.props.favorited ? 'article-fave-selected' : 'article-fave-unselected'}`;
    const faveButton = this.props.showFave ?
      <button
        className={faveButtonClass}
        onClick={this.fave}
      >
        Favorite
      </button> : <div></div>;


    return (
      <li>
        <div className="article">
          <h1>
            <a className="article-title-link"
              href={article.link}
              target="_blank"
            >
              {article.title}
            </a>
          </h1>
          <div className="article-link">{article.link}</div>
          {article.description}
          <div className="article-date">{article.pubDate}</div>
          {faveButton}
        </div>
      </li>
    );
  }

}

export default Article;
