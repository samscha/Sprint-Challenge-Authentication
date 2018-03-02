import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getJokes } from '../actions';

class Jokes extends Component {
  componentDidMount() {
    // this.props.getJokes();
  }

  render() {
    return <div className="Jokes">jokes</div>;
  }
}

export default Jokes;
