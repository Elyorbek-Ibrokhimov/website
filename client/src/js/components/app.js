import React from 'react';

var mainApp = 
  <div id="shadow-container" class="main-app">
    <div class="container-fluid">
      <div id="hero">
        <img class="hero-img img-responsive" src="app/assets/images/background2.jpg" />
        <div>              
          <h1 class="hero-title">For<span>€</span>xSpress</h1>
          <p class= "sub-title">Receive live spread and historical data for currency trading</p>
        </div>
      </div>        
      <div id="info-section">
        <h4 id="info-section-title">Built and powered with</h4>
        <div class="technologies">
          <img src="app/assets/images/technologies/mongodb.png" class="tech-img img-responsive" />
          <img src="app/assets/images/technologies/node.png" class="tech-img img-responsive" />
          <img src="app/assets/images/technologies/react.png" class="tech-img img-responsive" />
          <img src="app/assets/images/technologies/oanda.png" class="tech-img img-responsive" />
        </div>
      </div>
    </div>  
    {/* Data Section */}
      <div id="history-table">
        <div class="row" id="history-help">
        </div>
      </div>
    <div id="data-table">
      <div>
        <img src="app/assets/images/loading.gif" id="data-load-icon" />
      </div>
    </div>    
  </div>;

export default mainApp;

  