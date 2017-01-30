'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
import { connect } from 'react-redux';
import Cell from '../Cell/Cell.js';
import LoadIcon from '../LoadIcon/LoadIcon.js';
import * as actionCreators from '../../actions/actions.js';

/** Class representing the table that contains all the currency pairs */
export class DataTable extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      eur: true,
      usd: true,
      gbp: true,
      chf: true,
      aud: true,
      cad: true,
      nzd: true,
    }

    this.hideCurrency.bind(this);

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

  hideAllCurrencies() {
    console.log('hiding');
    this.setState({
      eur: false,
      usd: false,
      gbp: false,
      chf: false,
      aud: false,
      cad: false,
      nzd: false,
    })
  }

  hideCurrency(name) {
    const filterName = {};
    filterName[name] = !this.state[name]
    this.setState(filterName);
  }

  /**
   * Creates each individual cell based on the current master list
   * @param {list} - represents all the currency pairs that are being used
   */
  createCells(list) {
    if (!list) {
      return [];
    } else {
      return list.map((eachInstrument, i) => {
        let currencyName = eachInstrument.instrument.slice(0,3).toLowerCase();
        if (this.state[currencyName]) {
          let eachCell = 
            <Cell name={eachInstrument.instrument} 
              bid={eachInstrument.bid} 
              ask={eachInstrument.ask} 
              spread={eachInstrument.spread}
            />
          return (
            <div className="cell" key={i}> 
              {eachCell}
            </div>    
          );
        }

      })
    }   
  }

  render () {
    return (
      <div id="cell-list">
        <div id="filters">
          <label>
            <input type="checkbox" id="eurChecked" defaultChecked={() => this.state.eur} onChange={ () => this.hideCurrency('eur') } />
            <span>EUR</span>
          </label>
          <label>
            <input type="checkbox" id="usdChecked" defaultChecked={() => this.state.usd} onChange={ () => this.hideCurrency('usd') } />
            <span>USD</span>
          </label>
          <label>
            <input type="checkbox" id="gbpChecked" defaultChecked={ () => this.state.gbp } 
              onChange={ () => { this.hideCurrency('gbp') } } />
            <span>GBP</span>
          </label>
          <label>
            <input type="checkbox" id="chfChecked" defaultChecked={() => this.state.chf} onChange={ () => this.hideCurrency('chf') } />
            <span>CHF</span>
          </label>
          <label>
            <input type="checkbox" id="audChecked" defaultChecked={() => this.state.aud} onChange={ () => this.hideCurrency('aud')} />
            <span>AUD</span>
          </label>
          <label>
            <input type="checkbox" id="cadChecked" defaultChecked={() => this.state.cad} onChange={ () => this.hideCurrency('cad')}/>
            <span>CAD</span>
          </label>
          <label>
            <input type="checkbox" id="nzdChecked" defaultChecked={() => this.state.nzd} onChange={ () => this.hideCurrency('nzd')} />
            <span>NZD</span>
          </label>
          <button onClick={() => this.hideAllCurrencies()}>HIDE ALL</button>
        </div>
        {/* Instantiation of all the child cells */}
        {this.props.spread ? this.createCells(this.props.spread) : <LoadIcon />}
      </div>    
    );        
  }
};

const mapStateToProps = (state) => {
  return {}
}


export default connect(mapStateToProps, actionCreators)(DataTable);
