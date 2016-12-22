import React from 'react'
import TestUtils from 'react-addons-test-utils';
import {Cell} from './Cell.js';

const data = {
  instrument: "EUR_AUD",
  bid: 1.44685,
  ask: 1.44718,
  spread: 3.3,
}

describe('Cell Component', () => {
  it('should return a component representing a currency', () => {
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <Cell name={data.instrument} 
            bid={data.bid} 
            ask={data.ask} 
            spread={data.spread}
            filterName={data.instrument.slice(0,3)}/>)
    const output = renderer.getRenderOutput();
    console.log(output);
  }) 
})