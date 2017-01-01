'use strict';

import React from 'react';

/* TODO: migrate to modern react */

/** Class representing each individual currency cells */
export class Cell extends React.Component {  
  constructor (props) {
    super(props)

    this.state = {
      spreadChange: 'show-no-change'
    }

    this.firstInstrument = this.props.name.slice(0,3).toLowerCase();
    this.secondInstrument = this.props.name.slice(4,8).toLowerCase();
  }

  /**
   * Opens the history graph for the currency pair
   */
  openHistory () {
    // var historyDisplay = document.getElementById('history-table').getAttribute('style');
    // var instrumentName = this.props.name;
    // var firstInsturment = instrumentName.slice(0, 3);
    // var secondInstrument = instrumentName.slice(4, 8);
    // var fullName = firstInsturment + '_' + secondInstrument;
    // CellActions.historyToggle();
    // DataHistory.getHistory(fullName, instrumentName);
  }

  /**
   * Highlights increases or decreases in spread
   */
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
      this.setState({spreadChange: 'show-increase'});
    } else if (currentSpread !== nextSpread && currentSpread < nextSpread) {
      this.setState({spreadChange: 'show-decrease'});
    } else {
      this.setState({spreadChange: 'show-no-change'});
    }
  }

  render () {
    return (
      <div>
        <div className= "flags">
          <div className={this.firstInstrument}></div>
          <div className={this.secondInstrument}></div>
        </div>
        <div className='display-name'>{this.props.name}</div>
        <div className="bid-ask-prices">
          <div className="bid-price">bid: {this.props.bid}</div>
          <div className="ask-price">ask: {this.props.ask}</div>
        </div>
        <div className={this.state.spreadChange}>
          <p className="spread">Spread: {this.props.spread}</p>       
        </div>
        <input value="History" type="button" className="open-history btn btn-default" />
      </div>
    )
  }    
}

export default Cell;

