import React from 'react';
import { connect } from 'react-redux';
import SourceFilter from './SourceFilter';
import Articles from './Articles';

function mapStateToProps(state) {
  return {
    sources: state.sourceFilters
  };
}

class NewsFeed extends React.Component {

  render () {
    return (
      <div className='news-feed-container'>
        <h2>News Feed</h2>
        <SourceFilter />
        <Articles />
      </div>
    )
  }

}

export default connect(mapStateToProps)(NewsFeed);