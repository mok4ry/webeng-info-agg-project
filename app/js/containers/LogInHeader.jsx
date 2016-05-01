import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { addUser } from '../actions/users';
import { logIn, logOut } from '../actions/auth';
import { userExists, getUserLastLogin } from '../util/db';

function mapStateToProps(state) {
  return {
    users : state.users,
    auth: state.auth,
  };
}

const ERRORS = {
  USER_ERROR: 'User does not exist',
  NAME_ERROR: 'Username already taken',
  PASS_ERROR: 'Password is incorrect',
  EMPTY_ERROR: 'Field is required',
};

const INITIAL_ERROR_STATE = {
  userError: false,
  nameError: false,
  passError: false,
  userEmptyError: false,
  passEmptyError: false,
};

const INITIAL_STATE = {
  registered: false,
};

class LogInHeader extends React.Component {

  constructor () {
    super();

    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.register = this.register.bind(this);
    this.errorMsg = this.errorMsg.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
    this.passCorrect = this.passCorrect.bind(this);

    this.renderLogin = this.renderLogin.bind(this);

    this.state = Object.assign({}, INITIAL_ERROR_STATE, INITIAL_STATE);
  }

  passCorrect (username, password) {
    const pass = this.props.users[username];
    return pass && pass === password;
  }

  clearErrors () {
    this.setState(INITIAL_ERROR_STATE);
  }

  logIn (e) {
    e.preventDefault();
    this.clearErrors();

    if (!this.refs.name.value)
      this.setState({userEmptyError: true});
    else if (!userExists(this.refs.name.value))
      this.setState({userError: true});
    else if (!this.passCorrect(this.refs.name.value, this.refs.pass.value))
      this.setState({passError: true});
    else
      this.props.dispatch(logIn(this.refs.name.value));
  }

  logOut (e) {
    e.preventDefault();
    this.setState({ registered: false });
    this.props.dispatch(logOut());
  }

  register (e) {
    e.preventDefault();
    this.clearErrors();
    
    if (!this.refs.name.value)
      this.setState({userEmptyError: true});
    else if (!this.refs.pass.value)
      this.setState({passEmptyError: true});
    else if (userExists(this.refs.name.value))
      this.setState({nameError: true});
    else {
      this.setState({ registered: true });
      this.props.dispatch(addUser({
        name: this.refs.name.value,
        pass: this.refs.pass.value,
      }));
    }
  }

  errorMsg (error, classes) {
    return (
      <div className={"tooltip " + classes}><span>{error}</span></div>
    );
  }

  renderLogin() {
    const nameFieldClass =
      (this.state.nameError ||
       this.state.userError ||
       this.state.userEmptyError) ? 'input-error' : '';

    const passFieldClass =
      (this.state.passError ||
       this.state.passEmptyError) ? 'input-error' : '';

    return (
      <form className="pure-form">
        <fieldset>
          <input className={nameFieldClass}
            type="text" placeholder="username" ref="name"/>
          {this.state.nameError ? this.errorMsg(ERRORS.NAME_ERROR) : ''}
          {this.state.userError ? this.errorMsg(ERRORS.USER_ERROR) : ''}
          {this.state.userEmptyError ? this.errorMsg(ERRORS.EMPTY_ERROR) : ''}

          <input className={passFieldClass}
            type="password" placeholder="password" ref="pass"/>
          {this.state.passEmptyError ?
            this.errorMsg(ERRORS.EMPTY_ERROR, 'pass-tooltip') : ''}
          {this.state.passError ?
            this.errorMsg(ERRORS.PASS_ERROR, 'pass-tooltip') : ''}

          <button className="pure-button pure-button-primary"
              onClick={this.logIn}>
            Log In
          </button>

          {this.state.registered ?
            <button className="pure-button pure-button-secondary" disabled>
              Registered!
            </button> :
            <button className="pure-button pure-button-secondary"
                onClick={this.register}>
              Register
            </button>}
        </fieldset>
      </form>
    );
  }

  renderLoggedIn() {
    const user = this.props.auth.user;
    const dateFormat = 'dddd, MMMM Do YYYY, h:mm:ss a';
    const lastLogin = getUserLastLogin(user);

    return (
      <div className="header-logged-in">
        <span>Welcome, {user}!</span>
        <span>
          {lastLogin ?
            `Last log in: ${moment(lastLogin).format(dateFormat)}` :
            'This is your first log in!'}
        </span>
        <button className="pure-button pure-button-secondary"
            onClick={this.logOut}>
          Log Out
        </button>
      </div>
    );
  }

  render () {
    return (
      <div className="header-log-in">
        {this.props.auth.user ? this.renderLoggedIn() : this.renderLogin()}
      </div>
    )
  }

}

export default connect(mapStateToProps)(LogInHeader);
