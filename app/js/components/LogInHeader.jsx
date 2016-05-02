import React from 'react';

class LogInHeader extends React.Component {

  render () {
    return (
      <div className="header-log-in">
        <form className="pure-form">
          <fieldset>
            <input type="username" placeholder="username">
            <input type="password" placeholder="password">
            <button className="pure-button pure-button-primary">Log In</button>
          </fieldset>
        </form>
      </div>
    )
  }

}

export default LogInHeader;
