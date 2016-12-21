'use strict';

import React from 'react';
import { Provider } from 'react-redux';
import Jumbotron from './jumbotron.js';
import DataTable from './DataTable/DataTable.js';
import Test from './test.js';

/** Class representing main application */
class mainApp extends React.Component {

  render() {
    return (
      <Provider store={ this.props.store }>
        <div id="shadow-container" class="main-app">
          <div class="container-fluid">
            <Jumbotron />        
            <div id="info-section">
              <h4 id="info-section-title">Built and powered with</h4>
              <div class="technologies">
                <img src="app/assets/images/technologies/mongodb.png" class="tech-img img-responsive" />
                <img src="app/assets/images/technologies/node.png" class="tech-img img-responsive" />
                <img src="app/assets/images/technologies/react.png" class="tech-img img-responsive" />
                <img src="app/assets/images/technologies/oanda.png" class="tech-img img-responsive" />
              </div>
            </div>
          </div>  
          {/* Data Section */}
            <div id="history-table">
              <div class="row" id="history-help">
              </div>
            </div>
          <div id="data-table">
            <Test store={this.props.store} />
            <DataTable store={this.props.store} />
            <div>
              <img src="app/assets/images/loading.gif" id="data-load-icon" />
            </div>
          </div>    
        </div>
      </Provider>
    )
  }
}
  
export default mainApp;

  