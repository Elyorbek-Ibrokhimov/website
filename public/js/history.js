//-------------History Graph Section-------------//

var historyData = React.createClass({
  render: function (){
    return( 
      React.DOM.div({className: 'history-data'}, 'here is the history')
    )
  }
})



// Gets initial chart setting with days since last year as a filter
function getHistory (fullName) {
  // var xhr = new XMLHttpRequest;
  // xhr.open('POST', '/instruments/history')
  // xhr.send(fullName);
  // xhr.onload = function() {
  //   responseObject = JSON.parse(xhr.responseText);
  //   dateList = responseObject.candles
 
  // }
  drawChart();
}

// getHistory();
// google.setOnLoadCallback(drawChart);  
function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Mon', 20, 28, 38, 45],
    ['Tue', 31, 38, 55, 66],
    ['Wed', 50, 55, 77, 80],
    ['Thu', 77, 77, 66, 50],
    ['Fri', 68, 66, 22, 15]
    // Treat first row as data as well.
  ], true);

  var options = {
    legend:'none'
  };

  var chart = new google.visualization.CandlestickChart(document.getElementById('history-table'));
  chart.draw(data, options);
}

//CLEARED //Add onclick event to cell class. 
//CLEARED //When a cell is clicked, itll execute a ReactDOM render for a react class
//That react class will contain the info specific to the clicked event. 
// Create a graph with the data 



// var displayHistory = React.createElement(historyGraph, {})
//     ReactDOM.render(displayHistory, document.getElementById('history-table'))