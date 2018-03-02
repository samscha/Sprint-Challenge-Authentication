import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appKey } from '../../config';

export default ComposedComponent => {
  class CheckAuthentication extends Component {
    componentWillMount() {
      if (!localStorage.getItem(appKey) && !this.props.authenticated)
        this.props.history.push('/signin');
    }

    render() {
      return (
        <div className="CheckAuthentication">
          {localStorage.getItem(appKey) || this.props.authenticated ? (
            <ComposedComponent />
          ) : null}
        </div>
      );
    }
  }

  const mapStateToProps = state => {
    return {
      authenticated: state.auth.authenticated,
    };
  };

  return connect(mapStateToProps)(CheckAuthentication);
};
