//-------------History Graph Section-------------//

var historyGraph = React.createClass({
  render: function (){
    return( 
      React.DOM.div({className: 'history-data'}, 'here is the history')
    )
  }
})



// Gets initial chart setting with days since last year as a filter
function getHistory () {
  var xhr = new XMLHttpRequest;
  xhr.open('GET', '/instruments/history')
  xhr.send();
  xhr.onload = function() {
    responseObject = JSON.parse(xhr.responseText);
    dateList = responseObject.candles
    console.log(dateList);
  }
}

// getHistory();



//Add onclick event to cell class. 
//When a cell is clicked, itll execute a ReactDOM render for a react class
//That react class will contain the info specific to the clicked event. 