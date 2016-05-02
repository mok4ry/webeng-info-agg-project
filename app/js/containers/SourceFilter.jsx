import React from 'react';
import { connect } from 'react-redux';
import { selectSource, deselectSource } from '../actions/sourceFilters';
import { fetchArticles } from '../actions/articles';
import SourceFilterButton from '../components/SourceFilterButton';

function mapStateToProps(state) {
  return {
    sources : state.sourceFilters
  };
}

class SourceFilter extends React.Component {
  constructor () {
    super();

    this.toggleSource = this.toggleSource.bind(this);
  }

  toggleSource (source) {
    if (this.props.sources[source])
      this.props.dispatch(deselectSource(source));
    else {
      if (!window.articles[source])
        this.props.dispatch(fetchArticles(source));
      this.props.dispatch(selectSource(source));
    }
  }

  render () {
    const sourceButtons = Object.keys(this.props.sources).map(s => {
      return <SourceFilterButton
                key={s}
                source={s}
                selected={this.props.sources[s]}
                onClick={this.toggleSource.bind(this, s)}/>
    });

    return (
      <div className='source-select-btn-group'>
        {sourceButtons}
      </div>
    );
  }
}

export default connect(mapStateToProps)(SourceFilter);