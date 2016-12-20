'use strict';

import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actions.js';

class Test extends React.Component {
  constructor (props) {
    super(props)
  }

  testClick () {
    const { store } = this.props;
    console.log('STORE', store.getState());
    let newNumber = store.getState().mainApp.test + 1;
    store.dispatch(actionCreators.test());
  }

  render () {
    const { store, counter } = this.props;
    return (
      <div>
        <button onClick={() => this.testClick()} >TEEEEEEEEST</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currencyList: state.spread.currencyList,
    counter: state.mainApp.test
  }
}

export default connect(mapStateToProps, actionCreators)(Test);