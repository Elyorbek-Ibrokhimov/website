//Component for each currency cell 
var dataCells = React.createClass({

  highlight: function (event) {
    var cells = document.getElementsByClassName('cell');
    _.each(cells, function (eachCell){
      eachCell.classList.remove('highlight')
    })
    event.target.classList.add('highlight');
    this.openHistory(event);
  },

  openHistory: function (event) {
    var instrumentName = event.target.childNodes[0].innerText;
    var firstInsturment = instrumentName.slice(0, 3);
    var secondInstrument = instrumentName.slice(4, 8);
    var fullName = firstInsturment + '_' + secondInstrument;
    getHistory(fullName);

  },

  propTypes: {
    displayName: React.PropTypes.string,
    bid: React.PropTypes.number,
    ask: React.PropTypes.number,
    spread: React.PropTypes.number
  },

  render: function () {
    return (
      React.DOM.div({className: 'cell',  onClick: this.highlight}, 
        React.DOM.div({className: 'display-name'}, this.props.displayName),
        React.DOM.div({className: 'spread'}, 'spread: ' + this.props.spread),
        React.DOM.div({className: 'bid-ask-prices'},
          React.DOM.div({className: 'bid-price'}, 'bid: ' + this.props.bid),
          React.DOM.div({className: 'ask-price'}, 'ask: ' + this.props.ask)
        )
      )
    )
  }
})

// Fetches prices for given instrument.

var postData = function (instrument, dataJSON) {
  // console.log(currencyData) 
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/instruments/prices');
  xhr.send(instrument);
  xhr.onload = function () {
    var responseObject = JSON.parse(xhr.responseText);
    var data = (JSON.parse(responseObject.body)).prices; //Array of instrument objects
    var instrumentNames = dataJSON
    var askPrices = dataProperties(data, 'ask'); // Array of ask prices
    var bidPrices = dataProperties(data, 'bid');
    var spread = makeSpread();

    // console.log(instrumentNames)
    // console.log(spread)

    function makeSpread () {
      var spreadArray =[];
      function spreadRound (calculation) {
        spreadArray.push(Math.round(calculation*1000)/1000)
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

    //Data update components
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

    var cellContainers = React.createElement('div', {id: 'cell-list'}, cellUpdates)
    ReactDOM.render(cellContainers, document.getElementById('data-table'));
  } //onload end
};

// Gathers all the insturment names to put in the url
function gatherInstruments () {
  var xhr = new XMLHttpRequest;
  xhr.onload = function () {
    var currencyList = JSON.parse(xhr.responseText);
    // console.log(currencyList);
    var allInstruments = currencyList[0].instrument
    var instrumentString = (function () {       
      for (var i=1; i<currencyList.length; i++){           
        allInstruments += '%2C' + currencyList[i].instrument;      
      };     
    }());
    // console.log(allInstruments);
    // postData(allInstruments, currencyList);
    postData(allInstruments,currencyList)
  };

  xhr.open('GET', '/instruments', true);
  xhr.send();  
};

// setInterval(gatherInstruments, 2000);
gatherInstruments();

//Gets each instrument propertiey in one list per instrument
// function dataProperties (data, property) {
//   var list = [];
//   for (var x=0; x<data.length; x++) {    
//     list.push((Math.round(data[x][property]*100))/100);
//   }
//   return list;
// }


function dataProperties (data, property) {
  var list = [];
  for (var x=0; x<data.length; x++) {    
    list.push((data[x][property]));
  }
  return list;
}
















