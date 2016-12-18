'use strict';

import React from 'react';
import { Provider } from 'react-redux';
import Jumbotron from './jumbotron.js';
import DataCells from './data.js';
import Test from './test.js';

var test = {
  nameList: [{
    instrument : "EUR_AUD",
    displayName : "EUR\/AUD",
    pip : "0.0001",
    maxTradeUnits : 10000000
  }],
  askList: 2.00000,
  bidList: 1.00000,
  spreadList: [1.00000]
}

class mainApp extends React.Component {
  // setInstruments () {
  //   let list;
  //   instruments.then((result) => {
  //     console.log('THE RESULT ', result);
  //     list = result
  //   })
  //   .catch((error) => {
  //     console.log('instruments failed to load: ', error);
  //   })
  //   return list;
  // }

  render() {
    // console.log(`APP PROPS `, this.props);
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
            <DataCells store={this.props.store} spreadList={test.spreadList} currencyList={[]}/>
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

  