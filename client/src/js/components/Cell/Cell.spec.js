import React from 'react'
import TestUtils from 'react-addons-test-utils';
import chai from 'chai'
import {Cell} from './Cell.js';

const expect = chai.expect;

const data = {
  instrument: "EUR_AUD",
  bid: 1.44685,
  ask: 1.44718,
  spread: 3.3,
}

data.firstInstrument = data.instrument.slice(0,3).toLowerCase(),
data.secondInstrument = data.instrument.slice(4,8).toLowerCase(),

describe('Cell Component', () => {
  it('should return a component representing a currency', () => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<Cell 
      name={data.instrument}
      bid={data.bid} 
      ask={data.ask} 
      spread={data.spread}
      filterName={data.instrument.slice(0,3)}/>);
    const output = renderer.getRenderOutput();

    expect(output.type).to.equal('div');

    expect(output.children).toEqual([
      <div className= "flags">,
          <div className={data.firstInstrument}></div>
          <div className={data.secondInstrument}></div>
      </div>,
      <div className='display-name'>{data.instrument}</div>,
      <div className="bid-ask-prices">
        <div className="bid-price">bid: {data.bid}</div>
        <div className="ask-price">ask: {data.ask}</div>
      </div>,
      <div className="spread" ref={(spreadCont) => this.spreadCell = spreadCont}>
          Spread: {data.spread}
      </div>,
      <input value="History" type="button" className="open-history btn btn-default" onClick={() => this.openHistory()} />
    ]);

    console.log(output);
  }) 
})


 