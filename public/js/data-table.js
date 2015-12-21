//Creates React class for currency cells 
var dataCells = React.createClass({
  propTypes: {
    displayName: React.PropTypes.string,
    bid: React.PropTypes.number,
    ask: React.PropTypes.number,
    spread: React.PropTypes.number
  },
  render: function () {
    return (
      React.DOM.div({className: 'cell'}, 
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

//Gets the currencies JSON and instaniates the class per instrument
function getCurrencies () {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/instruments');
  xhr.send();
  xhr.onload = function () {
    currencies = JSON.parse(xhr.responseText);
    
    var cells = currencies.map(function (cell) {
      return (React.createElement(dataCells, {key : currencies.indexOf(cell)}
      )
    )
  })

    for (var i=0; i<cells.length; i++) {
      cells[i].key = i+1;
    }

    console.log(cells)
    var cellContainers = React.createElement('div', {className: 'cell-list'}, cells)
    ReactDOM.render(cellContainers, document.getElementById('data-table'))
  }
}
getCurrencies();










