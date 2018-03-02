import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import { login } from '../actions';

class SignIn extends Component {
  submitFormHandler({ username, password }) {
    this.props.login(username, password, this.props.history);
  }

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.submitFormHandler.bind(this))}
      >
        <fieldset>
          <label>username:</label>
          <Field name="username" component="input" type="text" />
        </fieldset>

        <fieldset>
          <label>password:</label>
          <Field name="password" component="input" type="password" />
        </fieldset>

        <button action="submit">sign in</button>

        {this.props.error || null}
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth.error,
  };
};

SignIn = connect(mapStateToProps, { login })(SignIn);

export default reduxForm({
  form: 'signin',
  fields: ['username', 'password'],
})(SignIn);
