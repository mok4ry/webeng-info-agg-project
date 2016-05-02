import React from 'react';

class Article extends React.Component {

  render() {
    return (
      <div className="article">
        <span>{this.props.article.title}</span>
      </div>
    );
  }

}

export default Article;
