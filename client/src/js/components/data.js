var React = require('react');
var ReactDOM = require('react-dom');
import instruments from '../constants/instruments.js';
import Cell from './cell.js';
// var _ = require('underscore');
// var $ = require('jquery');
// import { connect } from 'react-redux';
// import * as actionCreators from './actions/actions.js';
// import { CellActions } from './default.js';
// import { DataHistory } from './history.js';


// console.log('INSTRUMENTS', INSTRUMENTS);



export class DataCells extends React.Component {

  filter (event) {    
    var filterId = event.target.getAttribute('id');
    var filterName = filterId.slice(0,3);
    var filterNameState = filterName + 'Checked';
    CellActions.filterByName(filterName);
  }
  hideAllCurrencies() {
    // console.log('trying to hide currencies');
    // console.log(this.props);
    this.props.dispatch(actionCreators.hideAllCurrencies());
  }
  render () {
    console.log('CELL PROPS ', this.props);
    var bidList = this.props.bidList;
    var askList = this.props.bidList;
    var spreadList = this.props.spreadList;
    var createCells = this.props.nameList.map(function (eachInstrument, i) {
      var eachCell =  React.createElement(cell, {
        name: eachInstrument.displayName,
        // bid: bidList[i],
        // ask: askList[i],
        spread: spreadList[i],
      });
      return (    
        React.createElement('div', {
        className: 'cell',
        key: i,
        'data-filter': eachInstrument.displayName.slice(0,3).toLowerCase()
        }, eachCell) 
      ); 
    });
    return (
      <div id="cell-list">
        <div id="filters">
          <label>
            <input type="checkbox" id="eurChecked" onChange={this.filter} defaultChecked={() => this.state.eurChecked} />
            <span>EUR</span>
          </label>
          <label>
            <input type="checkbox" id="usdChecked" onChange={this.filter} defaultChecked={() => this.state.usdChecked} />
            <span>USD</span>
          </label>
          <label>
            <input type="checkbox" id="gbpChecked" onChange={this.filter} defaultChecked={() => this.state.gbpChecked} />
            <span>GBP</span>
          </label>
          <label>
            <input type="checkbox" id="chfChecked" onChange={this.filter} defaultChecked={() => this.state.chfChecked} />
            <span>CHF</span>
          </label>
          <label>
            <input type="checkbox" id="audChecked" onChange={this.filter} defaultChecked={() => this.state.audChecked} />
            <span>AUD</span>
          </label>
          <label>
            <input type="checkbox" id="cadChecked" onChange={this.filter} defaultChecked={() => this.state.cadChecked} />
            <span>CAD</span>
          </label>
          <label>
            <input type="checkbox" i8="nzdChecked" onChange={this.filter} defaultChecked={() => this.state.nzdChecked} />
            <span>NZD</span>
          </label>
          <button onClick={() => this.hideAllCurrencies()}>HIDE ALL</button>
        </div>
        {/* Instantiation of all the child cells */}
        {createCells}
      </div>    
    );        
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

// // setInterval(, 2000);
// var instruments = gatherInstruments();
// console.log(instruments);