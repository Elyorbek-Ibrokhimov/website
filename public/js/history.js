//-------------History Graph Section-------------//

var historyData = React.createClass({
  render: function (){
    return(
      React.DOM.div({id: 'history-info'}, 
      React.DOM.h3({className: 'history-info'}, this.props.name),
      React.DOM.div({id: 'graph'})
      )
    )
  }
});

// Gets initial chart setting with days since last year as a filter
function getHistory (fullName, instrumentName) {
  var xhr = new XMLHttpRequest;
  xhr.open('POST', '/instruments/history')
  xhr.send(fullName);
  var historyInfo = React.createElement(historyData, {name: instrumentName});
  ReactDOM.render(historyInfo, document.getElementById('history-table'))
  xhr.onload = function() {
    responseObject = JSON.parse(xhr.responseText);
    dateList = responseObject.candles;
    drawChart(dateList);
  } //onload end

}
 
function drawChart(dateList) {
  var chartValues = (function () {
      var data = []
      for (var i=0; i<dateList.length; i++) {
        data.push([
          (dateList[i].time).slice(0,10), 
          dateList[i].lowBid, 
          dateList[i].openBid, 
          dateList[i].closeBid, 
          dateList[i].highBid
        ])
      }
      return data;
    }());  
  var data = google.visualization.arrayToDataTable(chartValues, true);
  var options = {
    legend:'none'
  };
  var chart = new google.visualization.CandlestickChart(document.getElementById('graph'));
  chart.draw(data, options);
}










