import React from 'react';
import { connect } from 'react-redux';
//import UserHeaderInfo from '../components/UserHeaderInfo';
import LogInHeader from './LogInHeader';

function mapStateToProps(state) {
  return {
    user : state.user
  };
}

class Header extends React.Component {

  render () {
    return (
      <div className='info-agg-header'>
        <div className='header-logo'>Information Aggregator</div>
        {this.props.user ?
          <UserHeaderInfo user={this.props.user}/> :
          <LogInHeader onLogIn={this.logIn} onRegister={this.register}/>}
      </div>
    );
  }

}

export default connect(mapStateToProps)(Header);