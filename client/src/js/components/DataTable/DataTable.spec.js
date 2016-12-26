import React from 'react'
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import {DataTable} from './DataTable.js';

const spreadData = [
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
renderer.render(<DataTable spread={spreadData} />);
const output = renderer.getRenderOutput();
const component = new DataTable();

describe('Data Table component', () => {
  it('should be able to create a list of cell components given a list of currencies', () => {
    const cells = component.createCells(spreadData);
    expect(output.props.children[1]).toEqual(cells)
  })
})