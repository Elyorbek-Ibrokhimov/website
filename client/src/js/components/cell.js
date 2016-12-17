'use strict';

import React from 'react';

class Cell extends React.Component {  
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

export default Cell;