var React = require('react');
var ReactDOM = require('react-dom');
// var _ = require('underscore');
// var $ = require('jquery');
// import { connect } from 'react-redux';
// import * as actionCreators from './actions/actions.js';
// import { CellActions } from './default.js';
// import { DataHistory } from './history.js';

class cell extends React.Component {
  
  openHistory () {
    var historyDisplay = document.getElementById('history-table').getAttribute('style');
    var instrumentName = this.props.name;
    var firstInsturment = instrumentName.slice(0, 3);
    var secondInstrument = instrumentName.slice(4, 8);
    var fullName = firstInsturment + '_' + secondInstrument;
    CellActions.historyToggle();
    DataHistory.getHistory(fullName, instrumentName);
  }
  highlight (event) {
    var historyDisplay = document.getElementById('history-table').getAttribute('style');   
    var cells = document.getElementsByClassName('select-box');
    _.each(cells, function (eachCell) {
      eachCell.classList.remove('highlight')
    });
    if (historyDisplay !== 'display: block;') {highlightToggle()};
    this.openHistory(); 
  }
  componentWillReceiveProps (nextProps) {
    var nextSpread = nextProps.spread;
    var currentSpread = this.props.spread;
    var spread = this.spreadCell;
    if (currentSpread !== nextSpread && currentSpread > nextSpread) {
      spread.classList.remove('show-decrease');
      spread.classList.add('show-increase');
      spread.classList.remove('show-no-change');
    } 
    else if (currentSpread !== nextSpread && currentSpread < nextSpread) {
      spread.classList.remove('show-increase');
      spread.classList.add('show-decrease');
      spread.classList.remove('show-no-change');
    } 
    else {
      spread.classList.add('show-no-change');
      spread.classList.remove('show-increase');
      spread.classList.remove('show-decrease');
    }
  }
  render () {
    var firstInstrument = (this.props.name).slice(0,3).toLowerCase();
    var secondInstrument = (this.props.name).slice(4,8).toLowerCase();
    return (
      <div>
        <div className= "flags">
          <div className={firstInstrument}></div>
          <div className={secondInstrument}></div>
        </div>
        <div className='display-name'>{this.props.name}</div>
        <div className="bid-ask-prices">
          <div className="bid-price">bid: {this.props.bid}</div>
          <div className="ask-price">ask: {this.props.ask}</div>
        </div>
        <div className="spread" ref={(spreadCont) => this.spreadCell = spreadCont}>
          Spread: {this.props.spread}
        </div>
        <input value="History" type="button" className="open-history btn btn-default" onClick={() => this.openHistory()} />
      </div>
    )
  }    
}

export class DataCells extends React.Component {

  filter (event) {    
    var filterId = event.target.getAttribute('id');
    var filterName = filterId.slice(0,3);
    var filterNameState = filterName + 'Checked';
    CellActions.filterByName(filterName);
  }
  hideAllCurrencies() {
    console.log('trying to hide currencies');
    console.log(this.props);
    this.props.dispatch(actionCreators.hideAllCurrencies());
  }
  render () {
    console.log(this.props);
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

// const mapStateToProps = function (state) {
//   const boundActionCreators = bindActionCreators({}, dispatch);
//   const allActionProps = {...boundActionCreators, dispatch}
//   return allActionProps;
//   // return {
//   //   hide: state._filters.hide
//   // }
// }

// const ConnectedFilters = connect(dataCells)
// console.log(ConnectedFilters);

// function dataProperties (data, property) {
//   var list = [];
//   for (var x=0; x<data.length; x++) {    
//     list.push((data[x][property]));
//   }
//   return list;
// }

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

// function gatherInstruments () {
//   var xhr = new XMLHttpRequest;
//   xhr.onerror = function () {
//     console.log('gather error')
//   }
//   xhr.onload = function () {
//     var currencyList = JSON.parse(xhr.responseText);
//     var allInstruments = currencyList[0].instrument
//     var instrumentString = (function () {       
//       for (var i=1; i<currencyList.length; i++){           
//         allInstruments += '%2C' + currencyList[i].instrument;      
//       };     
//     }());
//     postData(allInstruments,currencyList)
//   };
//   xhr.open('GET', '/currencies', true);
//   xhr.send();  
// };

// // setInterval(, 2000);
// var instruments = gatherInstruments();
// console.log(instruments);