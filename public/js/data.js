var cell = React.createClass({
  openHistory: function () {
    var instrumentName = this.props.name;
    var firstInsturment = instrumentName.slice(0, 3);
    var secondInstrument = instrumentName.slice(4, 8);
    var fullName = firstInsturment + '_' + secondInstrument;
    getHistory(fullName, instrumentName);
  },
  highlight: function (event) {
    var historyDisplay = document.getElementById('history-table').getAttribute('style');   
    var cells = document.getElementsByClassName('select-box');
    _.each(cells, function (eachCell) {
      eachCell.classList.remove('highlight')
    });
    this.selectedCell.classList.add('highlight');
    if (historyDisplay !== 'display: block;') {highlightToggle()};
    this.openHistory(); 
  },
    componentWillReceiveProps: function (nextProps) {
    var nextSpread = nextProps.spread;
    var currentSpread = this.props.spread;
    var spread = this.spreadCell;
    if (currentSpread !== nextSpread && currentSpread > nextSpread) {
      spread.classList.remove('show-decrease');
      spread.classList.add('show-increase');
      spread.classList.remove('show-no-change');
    } 
    else if (currentSpread !== nextSpread && currentSpread < nextSpread) {
      spread.classList.remove('shßow-increase');
      spread.classList.add('show-decrease');
      spread.classList.remove('show-no-change');
    } 
    else {
      spread.classList.add('show-no-change');
      spread.classList.remove('show-increase');
      spread.classList.remove('show-decrease');
    }
  },
  propTypes: {
    displayName: React.PropTypes.string,
    bid: React.PropTypes.number,
    ask: React.PropTypes.number,
    spread: React.PropTypes.number
  },
  render: function () {
    var firstInsturment = (this.props.name).slice(0,3);
    var secondInstrument = (this.props.name).slice(4,8);
    return (
      React.DOM.div({
        className: 'select-box',
        ref: (cellCont) => this.selectedCell = cellCont,
        onClick: this.openHistory,
        onClick: this.highlight
        },
        React.DOM.div({className: 'flags'},
          React.DOM.div({className: firstInsturment.toLowerCase()}),
          React.DOM.div({className: secondInstrument.toLowerCase()})
        ),    
        React.DOM.div({className: 'display-name'}, this.props.name
        ),
        React.DOM.div({className: 'bid-ask-prices'},
          React.DOM.div({className: 'bid-price'}, 'bid: ' + this.props.bid),
          React.DOM.div({className: 'ask-price'}, 'ask: ' + this.props.ask)
        ),
        React.DOM.div({
          className: 'spread', 
          ref: (spreadCont) => this.spreadCell = spreadCont
          }, 
          this.props.spread
        )
      )
    )
  }    
})

var dataCells = React.createClass({
  getInitialState: function () {
    return ({
      filterStates: {      
        eurChecked: true,
        usdChecked: true,
        gbpChecked: true, 
        chfChecked: true,
        audChecked: true,
        cadChecked: true,
        nzdChecked: true,
        stateChange: function (instrument) {
          this[instrument] = !(this[instrument]);
          console.log(this[instrument]);
        }
      }
    })
  },
  filter: function (event) {    
    var filterId = event.target.getAttribute('id');
    var filterName = filterId.slice(0,3);
    var filterNameState = filterName + 'Checked';
    this.state.filterStates.stateChange(filterNameState)
    if (this.state.filterStates[filterNameState] = false) {
      this.state.filterStates[filterNameState] = true
    }
    else {this.state.filterStates.stateChange(filterNameState)}
    
    filterByName(filterName);
  },
  deselect: function (event) {
    // if (this.state.isChecked = true) {
    //   this.setState({
    //     isChecked: !(this.state.isChecked)
    //   })
    // }
    // filterByName('hideAll')
  },
  render: function () {
    var bidList = this.props.bidList;
    var askList = this.props.bidList;
    var spreadList = this.props.spreadList;
    var createCells = this.props.nameList.map(function (eachInstrument, i) {
      var eachCell =  React.createElement(cell, {
        name: eachInstrument.displayName,
        bid: bidList[i],
        ask: askList[i],
        spread: spreadList[i],
      })
      return (    
        React.createElement('div', {
        className: 'cell',
        key: i,
        'data-filter': eachInstrument.displayName.slice(0,3).toLowerCase()
        }, eachCell) 
      ) 
    })

    return (
      React.createElement('div', {id: 'cell-list'}, 
        React.DOM.div({id: 'filters'}, 
          React.DOM.label({}, 
            React.DOM.input({type: 'checkbox', id:'eur-filter', onChange: this.filter, checked: this.state.filterStates.eurChecked}),
            React.DOM.span({}, 'EUR')
          ), 
          React.DOM.label({}, 
            React.DOM.input({type: 'checkbox', id:'usd-filter', onChange: this.filter, defaultChecked: this.state.filterStates}),
            React.DOM.span({}, 'USD')
          ),
          React.DOM.label({}, 
            React.DOM.input({type: 'checkbox', id:'gbp-filter', onChange: this.filter, defaultChecked: this.state.filterStates}),
            React.DOM.span({}, 'GBP')
          ),
          React.DOM.label({}, 
            React.DOM.input({type: 'checkbox', id:'chf-filter', onChange: this.filter, defaultChecked: this.state.filterStates}),
            React.DOM.span({}, 'CHF')
          ),
          React.DOM.label({}, 
            React.DOM.input({type: 'checkbox', id:'aud-filter', onChange: this.filter, defaultChecked: this.state.filterStates}),
            React.DOM.span({}, 'AUD')
          ),
          React.DOM.label({}, 
            React.DOM.input({type: 'checkbox', id:'cad-filter', onChange: this.filter, defaultChecked: this.state.filterStates}),
            React.DOM.span({}, 'CAD')
          ),
          React.DOM.label({}, 
            React.DOM.input({type: 'checkbox', id:'nzd-filter', onChange: this.filter, defaultChecked: this.state.filterStates}),
            React.DOM.span({}, 'NZD')
          ),
          React.DOM.input({id: 'deselect', type: 'button', value: 'Deselect All', onClick: this.deselect})
        ),
      createCells)    
    )        
  }
})

function dataProperties (data, property) {
  var list = [];
  for (var x=0; x<data.length; x++) {    
    list.push((data[x][property]));
  }
  return list;
}

function postData (instrument, dataJSON) {
  // console.log(currencyData) 
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
    }; //onload end
  };
};

function gatherInstruments () {
  var xhr = new XMLHttpRequest;
  xhr.onerror = function () {
    console.log('gather error')
  }
  xhr.onload = function () {
    var currencyList = JSON.parse(xhr.responseText);
    var allInstruments = currencyList[0].instrument
    var instrumentString = (function () {       
      for (var i=1; i<currencyList.length; i++){           
        allInstruments += '%2C' + currencyList[i].instrument;      
      };     
    }());
    postData(allInstruments,currencyList)
  };

  xhr.open('GET', '/instruments', true);
  xhr.send();  
};

setInterval(gatherInstruments, 2000);
// gatherInstruments();


















