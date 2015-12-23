//-------------History Graph Section-------------//

var historyGraph = React.createClass({
  render: function (){
    return( 
      React.DOM.div({className: 'history-data'}, 'here is the history')
    )
  }
})



// Gets initial chart setting with days since last year as a filter
function getHistory (fullName) {
  var xhr = new XMLHttpRequest;
  xhr.open('POST', '/instruments/history')
  xhr.send(fullName);
  xhr.onload = function() {
    responseObject = JSON.parse(xhr.responseText);
    dateList = responseObject.candles
    console.log(dateList);
  }
}

// getHistory();



//CLEARED //Add onclick event to cell class. 
//CLEARED //When a cell is clicked, itll execute a ReactDOM render for a react class
//That react class will contain the info specific to the clicked event. 
// Create a graph with the data 



// var displayHistory = React.createElement(historyGraph, {})
//     ReactDOM.render(displayHistory, document.getElementById('history-table'))