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

var firstCell = React.createElement(dataCells, {
    displayName:'EUR USD', 
    spread: 50,
    bid: 10,
    ask:5
})

ReactDOM.render(firstCell, document.getElementById('data-table'))