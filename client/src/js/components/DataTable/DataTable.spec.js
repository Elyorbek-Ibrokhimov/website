import React from 'react'
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import {DataTable} from './DataTable.js';

const props = [
  {
    ask: 1.45816,
    bid: 1.45616,
    instrument: "EUR_AUD",
    spread: 20,
    status: "halted",
    time: "2016-12-23T21:59:58.619671Z"
  },
  {
    ask: 4.43125,
    bid: 4.38667,
    instrument: "EUR_PLN",
    spread: 445.8,
    status: "halted",
    time: "2016-12-23T21:59:58.620970Z"
  },
  {
    ask: 117.383,
    bid: 117.283,
    instrument: "USD_JPY",
    spread: 1000,
    status: "halted",
    time: "2016-12-23T21:59:58.621970Z"
  }
];

const renderer = TestUtils.createRenderer();
renderer.render(<DataTable spread={props} />);
const output = renderer.getRenderOutput();
const component = new DataTable();

describe('Data Table component', () => {
  it('should return a compoent with a list of cells for every currency pair', () => {
    const cells = component.createCells(props);

    expect(output.props.children).toEqual([
      <div id="filters">
          <label>
            <input type="checkbox" id="eurChecked" defaultChecked={() => component.props.eur} onChange={ () => component.hideCurrency('eur')} />
            <span>EUR</span>
          </label>
          <label>
            <input type="checkbox" id="usdChecked" onChange={component.filter} defaultChecked={() => component.state.usdChecked} />
            <span>USD</span>
          </label>
          <label>
            <input type="checkbox" id="gbpChecked" onChange={component.filter} defaultChecked={() => component.state.gbpChecked} />
            <span>GBP</span>
          </label>
          <label>
            <input type="checkbox" id="chfChecked" onChange={component.filter} defaultChecked={() => component.state.chfChecked} />
            <span>CHF</span>
          </label>
          <label>
            <input type="checkbox" id="audChecked" onChange={component.filter} defaultChecked={() => component.state.audChecked} />
            <span>AUD</span>
          </label>
          <label>
            <input type="checkbox" id="cadChecked" onChange={component.filter} defaultChecked={() => component.state.cadChecked} />
            <span>CAD</span>
          </label>
          <label>
            <input type="checkbox" id="nzdChecked" onChange={component.filter} defaultChecked={() => component.state.nzdChecked} />
            <span>NZD</span>
          </label>
          <button onClick={() => component.hideAllCurrencies()}>HIDE ALL</button>
        </div>,
        {cells}
    ])
  })
})