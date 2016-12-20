'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
import { connect } from 'react-redux';
import Cell from './cell.js';
import * as actionCreators from '../actions/actions.js';

/** Class representing the table that contains all the currency pairs */
class DataCells extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.getCurrencyList();
  }

  /**
   * Sets the interval for the cells to retreve updated pricing
   */
  getCurrencyList () {
    this.store.dispatch(actionCreators.setSpreadTimer());
  }

  /**
   * filters out pairs based on one currency type
   */
  filter (event) {    
    var filterId = event.target.getAttribute('id');
    var filterName = filterId.slice(0,3);
    var filterNameState = filterName + 'Checked';
    CellActions.filterByName(filterName);
  }

  /**
   * Hides all the currencies
   */
  hideAllCurrencies() {
    this.props.dispatch(actionCreators.hideAllCurrencies());
  }

  /**
   * Creates each individual cell based on the current master list
   * @param {list} - represents all the currency pairs that are being used
   */
  createCells(list) {
    console.log('HERE IT IS', list)
    return list.map(function (eachInstrument, i) {
      var eachCell =  React.createElement(Cell, {
        name: eachInstrument.instrument,
        bid: eachInstrument.bid,
        ask: eachInstrument.ask,
        spread: eachInstrument.spread
      });
      return (    
        React.createElement('div', {
        className: 'cell',
        key: i,
        'data-filter': eachInstrument.instrument.slice(0,3).toLowerCase()
        }, eachCell) 
      ); 
    });
  }

  render () {
    return (
      <div id="cell-list">
        <div></div>
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
            <input type="checkbox" id="nzdChecked" onChange={this.filter} defaultChecked={() => this.state.nzdChecked} />
            <span>NZD</span>
          </label>
          <button onClick={() => this.hideAllCurrencies()}>HIDE ALL</button>
        </div>
        {/* Instantiation of all the child cells */}
        {this.props.updatedSpread ? this.createCells(this.props.updatedSpread) : []}
      </div>    
    );        
  }
};

const mapStateToProps = (state) => {
  return {
    // currencyList: state.spread.currencyList,
    updatedSpread: state.spread.updatedSpread
  }
}


export default connect(mapStateToProps, actionCreators)(DataCells);
