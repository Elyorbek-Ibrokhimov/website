import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actions.js'

class Test extends React.Component {

  testClick () {
    const { store } = this.props;
    
    let newNumber = store.getState().mainApp.test+1;
    // console.log('THIS IS THE NUMBER ', newNumber);
    console.log('DISPATCH');
    console.log('THE STORE ', store);
    store.dispatch(actionCreators.test());
    // console.log('STTTATE ', store.getState());
  }

  render () {
    const { store, counter } = this.props;
    // let counter = store.getState().mainApp.test;
    // console.log('STTTATE ', store.getState());
    // console.log(`APP PROPS `, this.props);

    return (
      <div>
        <h1>{counter}</h1>
        <button onClick={() => this.testClick()} >TEEEEEEEEST</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    counter: state.mainApp.test
  }
}

export default connect(mapStateToProps, actionCreators)(Test);