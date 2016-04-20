import React from 'react';
import { connect } from 'react-redux';
import { addUser } from '../actions/users';

function mapStateToProps(state) {
  return {
    users : state.users
  };
}

const ERRORS = {
  USER_ERROR: 'User does not exist',
  NAME_ERROR: 'Username already taken',
  PASS_ERROR: 'Password is incorrect',
  EMPTY_ERROR: 'Field is required',
};

const INITIAL_STATE = {
  userError: false,
  nameError: false,
  passError: false,
  userEmptyError: false,
  passEmptyError: false,
  registered: false,
};

class LogInHeader extends React.Component {

  constructor () {
    super();

    this.logIn = this.logIn.bind(this);
    this.register = this.register.bind(this);
    this.userExists = this.userExists.bind(this);
    this.errorMsg = this.errorMsg.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
    this.passCorrect = this.passCorrect.bind(this);

    this.state = INITIAL_STATE;
  }

  userExists (username) {
    return !!this.props.users[username];
  }

  passCorrect (username, password) {
    const pass = this.props.users[username];

    if (!pass)
      return false
    else
      return pass === password;
  }

  clearErrors () {
    this.setState(INITIAL_STATE);
  }

  logIn (e) {
    e.preventDefault();
    this.clearErrors();

    const userExists = this.userExists(this.refs.name.value);

    if (!this.refs.name.value)
      this.setState({userEmptyError: true});
    else if (!userExists)
      this.setState({userError: true});
    else if (!this.passCorrect(this.refs.name.value, this.refs.pass.value))
      this.setState({passError: true});
  }

  register (e) {
    e.preventDefault();
    this.clearErrors();

    const userExists = this.userExists(this.refs.name.value);
    
    if (userExists)
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

  render () {
    const nameFieldClass =
      (this.state.nameError ||
       this.state.userError ||
       this.state.userEmptyError) ? 'input-error' : '';

    const passFieldClass =
      (this.state.passError ||
       this.state.passEmptyError) ? 'input-error' : '';

    return (
      <div className="header-log-in">
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
      </div>
    )
  }

}

export default connect(mapStateToProps)(LogInHeader);
