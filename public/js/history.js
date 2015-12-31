//-------------History Graph Section-------------//

var historyData = React.createClass({  
  propTypes: {
    displayName: React.PropTypes.string
  },
  render: function (){
    var firstInsturment = (this.props.displayName).slice(0,3);
    var secondInstrument = (this.props.displayName).slice(4,8);
    return(
      React.DOM.div({id: 'history-info'},    
      React.DOM.h3({className: 'history-instrument'}, this.props.displayName),
      React.DOM.div({className:'graph-flag'},
        React.DOM.div({className: firstInsturment.toLowerCase()}),
        React.DOM.div({className: secondInstrument.toLowerCase()})
      ),
      React.DOM.div({id: 'graph'})
      )
    )
  }
});

function getHistory (fullName, instrumentName) {
  var xhr = new XMLHttpRequest;
  xhr.open('POST', '/instruments/history')
  xhr.send(fullName);
  var historyInfo = React.createElement(historyData, {displayName: instrumentName});
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
    legend:'none',
    'height': 500,
    backgroundColor: {fill: 'none'},
    'width': 1550
  };
  var chart = new google.visualization.CandlestickChart(document.getElementById('graph'));
  chart.draw(data, options);
}










