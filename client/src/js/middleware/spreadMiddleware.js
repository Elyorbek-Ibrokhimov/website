import {applyMiddleware} from 'redux';
import store from '../lib/store.js';
import * as actionCreators from '../actions/actions.js'
const Promise = require("bluebird");

const spreadMiddleware = (store) => (next) => (action) => {
  if (action.type === 'SET_SPREAD_TIMER') {
    
    gatherInstruments.then((result) => {
      let spreadAction = actionCreators.getSpreadInfo(result)

      action.interval = setInterval(() => {
        console.log('INTERVAL');
        store.dispatch(spreadAction);
      }, 2000)
      // let action = {type: 'GET_SPREAD'};
      // console.log('WTF ', setInterval(() => {
      //   console.log('INTERVAL');
      //   store.dispatch(() => action);
      // }, 2000));
      // action.interval = setInterval(() => {
        
      // }, 2000);
      next(action);
    });
    
  } else {
    next(action);
  }

  
};

function postData (instrument, dataJSON) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/instruments/prices');
  xhr.send(instrument);  
  xhr.onload = function () {
    if (xhr.status !== 200) {
      console.log('error')
    }
    else if (xhr.status === 200) {
      var responseObject = JSON.parse(xhr.responseText);
      var data = (JSON.parse(responseObject.body)).prices; 
      var instrumentNames = dataJSON;
      var askPrices = dataProperties(data, 'ask'); 
      var bidPrices = dataProperties(data, 'bid');
      var spread = makeSpread();
      function makeSpread () {
        var spreadArray =[];
        function spreadRound (calculation) {
          spreadArray.push(Math.round(calculation*100)/100)
        };
        function spreadCalculation () {
          return Math.pow(10,4)*(askPrices[i] - bidPrices[i])
        };
        for (var i=0; i<instrumentNames.length; i++) {
          var calculation = spreadCalculation()        
          spreadRound(calculation);
        };
        return spreadArray;
      };          
      var cellTable = React.createElement(dataCells, {
        nameList: instrumentNames,
        askList: askPrices,
        bidList: bidPrices,
        spreadList: spread
      });
      ReactDOM.render(cellTable, document.getElementById('data-table'));      
    };
  };
};

const gatherInstruments = new Promise ((resolve, reject) => {
  const xhr = new XMLHttpRequest;
  // xhr.addEventListener('error', reject);
  xhr.onload = function () {
    var currencyList = JSON.parse(xhr.responseText);
    var allInstruments = currencyList[0].instrument
    var instrumentString = (function () {       
      for (var i=1; i<currencyList.length; i++){           
        allInstruments += '%2C' + currencyList[i].instrument;      
        };     
      }());
      resolve(currencyList);
    }  
  xhr.open('GET', '/currencies', true);
  xhr.send(null);    
  // }).then((result) => {
  //   instruments = result;
  // })
  //   .catch((error) => {
  //     console.log('error loading instruments: ', error);
  //   })
})

const middleware = applyMiddleware(spreadMiddleware);

export default middleware;
