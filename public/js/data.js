var dataCells = React.createClass({
  getInitialState: function() {
    return {
      usdChecked: false,
      eurChecked: false 
    }
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
  highlight: function (event) {
    var historyDisplay = document.getElementById('history-table').getAttribute('style');   
    var cells = document.getElementsByClassName('cell');
    _.each(cells, function (eachCell) {
      eachCell.classList.remove('highlight')
    });
    this.selectedCell.classList.add('highlight');
    if (historyDisplay !== 'display: block;') {highlightToggle()};
    this.openHistory(); 
  },
  openHistory: function () {
    var instrumentName = this.props.displayName;
    var firstInsturment = instrumentName.slice(0, 3);
    var secondInstrument = instrumentName.slice(4, 8);
    var fullName = firstInsturment + '_' + secondInstrument;
    getHistory(fullName, instrumentName);
  },
  propTypes: {
    displayName: React.PropTypes.string,
    bid: React.PropTypes.number,
    ask: React.PropTypes.number,
    spread: React.PropTypes.number
  },
  render: function () {
    var firstInsturment = (this.props.displayName).slice(0,3);
    var secondInstrument = (this.props.displayName).slice(4,8);
    return (
      React.DOM.div({className: 'cell ',
        ref: (cellCont) => this.selectedCell = cellCont, 
        onClick: this.highlight,
        data: firstInsturment.toLowerCase()           
      },        
        React.DOM.div({className: 'flags'},
          React.DOM.div({className: firstInsturment.toLowerCase()}),
          React.DOM.div({className: secondInstrument.toLowerCase()})
        ),
        React.DOM.div({className: 'display-name'}, this.props.displayName),
        React.DOM.div({className: 'bid-ask-prices'},
          React.DOM.div({className: 'bid-price'}, 'bid: ' + this.props.bid),
          React.DOM.div({className: 'ask-price'}, 'ask: ' + this.props.ask)
        ),
        React.DOM.div({className: 'spread', ref: (spreadCont) => this.spreadCell = spreadCont}, this.props.spread) 
      )       
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
    if (xhr.status === 404) {
      console.log('404 error')
    }
    else if (xhr.status === 200) {
      var responseObject = JSON.parse(xhr.responseText);
      var data = (JSON.parse(responseObject.body)).prices; 
      var instrumentNames = dataJSON
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
      var cellUpdates =
        spread.map(function(spreadData, i) {
          return (
            React.createElement(dataCells, {
              key: i,            
              displayName: instrumentNames[i].displayName,
              bid: bidPrices[i],
              ask: askPrices[i],
              spread: spreadData,                     
              })        
          ) 
        })    
      var cellContainers = React.createElement('div', {id: 'cell-list'}, cellUpdates);
      ReactDOM.render(cellContainers, document.getElementById('data-table'));
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



















