var dataCells = React.createClass({
  getInitialState: function() {
    return {draggableCells: this.draggableCells};
  },
  componentWillReceiveProps: function (nextProps) {
    var nextSpread = nextProps.spread;
    var currentSpread = this.props.spread;
    if (currentSpread !== nextSpread && currentSpread > nextSpread) {
    this.spreadCell.classList.add('show-increase');
    } else if (currentSpread !== nextSpread && currentSpread < nextSpread) {
      this.spreadCell.classList.add('show-decrease')
    } else {
      this.spreadCell.classList.remove('show-increase')
      this.spreadCell.classList.remove('show-decrease')
    }
  },
  componentDidMount: function () {
    var allCells = document.getElementsByClassName('cell');    
    _.each(allCells, function (eachCell, i) {
      eachCell.setAttribute('data-dragId', i);
    });
    
  },
  dragStart: function (event) {
    this.dragged = event.currentTarget;
    event.DataTransfer.effectAllowed = 'move';
  },
  dragEnd: function (event) {
    this.dragged.style.display = 'block';
    var draggedCells = this.state.draggableCells;
    var from = Number(this.dragged.dataset.dragId);
    var to = Number(this.over.dataset.dragId);
    if (from < to) to --;
    draggedCells.splice(to, 0, draggedCells.splice(from, 1)[0]);
    this.setState({draggableCells: draggedCells});
  },
  highlight: function (event) {    
    var cells = document.getElementsByClassName('cell');
    _.each(cells, function (eachCell) {
      eachCell.classList.remove('highlight')
    });
    this.selectedCell.classList.add('highlight');
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
      React.DOM.div({className: 'cell', ref: (cellCont) => this.selectedCell = cellCont, onClick: this.highlight, onDragOver: this.dragOver}, 
        React.DOM.div({className: 'display-name'}, this.props.displayName),
        React.DOM.div({className: 'flags'},
          React.DOM.div({className: firstInsturment.toLowerCase()}),
          React.DOM.div({className: secondInstrument.toLowerCase()})
          ),
        React.DOM.div({className: 'spread', ref: (spreadCont) => this.spreadCell = spreadCont}, 'spread: ' + this.props.spread),
        React.DOM.div({className: 'bid-ask-prices'},
          React.DOM.div({className: 'bid-price'}, 'bid: ' + this.props.bid),
          React.DOM.div({className: 'ask-price'}, 'ask: ' + this.props.ask)
        )
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
            draggable: true,
            onDragEnd: this.dragEnd,
            onDragStart: this.dragStart      
            })        
        ) 
      })
    
    var cellContainers = React.createElement('div', {id: 'cell-list', ref: (cellList) => this.draggableCells = cellList}, cellUpdates);
    // console.log(cellUpdates)
    ReactDOM.render(cellContainers, document.getElementById('data-table'));
  } //onload end
};

// Gathers all the insturment names to put in the url
function gatherInstruments () {
  var xhr = new XMLHttpRequest;
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

// setInterval(gatherInstruments, 2000);
gatherInstruments();



















