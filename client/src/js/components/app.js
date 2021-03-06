'use strict';

import React from 'react';
import { Provider } from 'react-redux';
import Jumbotron from './jumbotron.js';
import DataTable from './DataTable/DataTable.js';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actions.js';

/** Class representing main application */
class MainApp extends React.Component {
  constructor (props) {
    super(props);
    this.store = this.props.store;
    this.getCurrencyList();
  }

  /**
   * Sets the interval for the cells to retreve updated pricing
   */
  getCurrencyList () {
    this.store.dispatch(actionCreators.setSpreadTimer());
  }

  render() {
    return (
      <Provider store={ this.props.store }>
        <div id="shadow-container" class="main-app">
          <div class="container-fluid">
            <Jumbotron />        
            <div id="info-section">
              <h4 id="info-section-title">Built and powered with</h4>
              <div class="technologies">
                <img src="/assets/images/technologies/mongodb.png" class="tech-img img-responsive" />
                <img src="/assets/images/technologies/node.png" class="tech-img img-responsive" />
                <img src="/assets/images/technologies/react.png" class="tech-img img-responsive" />
                <img src="/assets/images/technologies/oanda.png" class="tech-img img-responsive" />
              </div>
            </div>
          </div>  
          {/* Data Section */}
            <div id="history-table">
              <div class="row" id="history-help">
              </div>
            </div>
          <div id="data-table">
            <DataTable store={this.props.store} spread={this.props.spread} />
          </div>    
        </div>
      </Provider>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    spread: state.spread.updatedSpread
  }
  
}
  
export default connect(mapStateToProps, actionCreators)(MainApp);

  