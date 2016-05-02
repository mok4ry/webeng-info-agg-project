import React from 'react';
import { connect } from 'react-redux';
import { selectSource, deselectSource } from '../actions/sourceFilters';
import { fetchArticles, loadMore } from '../actions/articles';
import SourceFilterButton from '../components/SourceFilterButton';

function mapStateToProps(state) {
  return {
    sources : state.sourceFilters,
    auth: state.auth,
  };
}

class SourceFilter extends React.Component {
  constructor () {
    super();

    this.toggleSource = this.toggleSource.bind(this);
  }

  componentWillMount() {
    const dispatch = this.props.dispatch;
    window.onscroll = function(ev) {
      if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight + 16)) {
        dispatch(loadMore());
      }
    };
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
    const sources = [ ...Object.keys(this.props.sources) ];
    if (this.props.auth.user) sources.push('FAVORITES');

    const sourceButtons = sources.map(s => {
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