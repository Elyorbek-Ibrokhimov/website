import React from 'react'
import TestUtils from 'react-addons-test-utils';
import chai from 'chai'
import {Cell} from './Cell.js';

const data = {
  instrument: "EUR_AUD",
  bid: 1.44685,
  ask: 1.44718,
  spread: 3.3,
}

describe('Cell Component', () => {
  it('should return a component representing a currency', () => {
    console.log('CEEL ', Cell);
    const renderer = TestUtils.createRenderer();
    renderer.render(<Cell />);
    const output = renderer.getRenderOutput();
    console.log(output);
  }) 
})


// name={data.instrument}
//             bid={data.bid} 
//             ask={data.ask} 
//             spread={data.spread}
//             filterName={data.instrument.slice(0,3)} 