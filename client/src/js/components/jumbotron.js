'use strict';

import React from 'react';
import { render } from 'react-dom'

class Jumbotron extends React.Component {
  render () {
    return (
      <div id="hero">
        <img class="hero-img img-responsive" src="app/assets/images/background2.jpg" />
        <div>              
          <h1 class="hero-title">For<span>€</span>xSpress</h1>
          <p class= "sub-title">Receive live spread and historical data for currency trading</p>
        </div>
      </div>   
    ) 
  }
}

export default Jumbotron;