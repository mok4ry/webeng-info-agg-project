import React from 'react';

class SourceFilterButton extends React.Component {

  render () {
    const baseClassName = 'pure-button source-button ';
    const btnClassName = baseClassName + (this.props.selected ?
      'source-button-selected' : 'source-button-unselected');

    return (
      <button className={btnClassName}
              type="button"
              style={{'outline':'none'}}
              onClick={this.props.onClick}>
        {this.props.source}
      </button>
    )
  }

}

export default SourceFilterButton;
