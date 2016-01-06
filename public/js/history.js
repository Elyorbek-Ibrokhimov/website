//-------------History Graph Section-------------//

var historyData = React.createClass({  
  propTypes: {
    displayName: React.PropTypes.string
  },
  render: function () {
    console.log(this.spreadCell)
    var firstInsturment = (this.props.displayName).slice(0,3);
    var secondInstrument = (this.props.displayName).slice(4,8);
    return (
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
  var historyHelp = document.getElementById('history-help');
  var loadingImage = document.createElement('img');
  var historyTable= document.getElementById('history-table');
  loadingImage.setAttribute('id', 'history-load-icon');
  loadingImage.setAttribute('src', '../images/loading.gif');  
  function loading () {    
    if (historyHelp) {historyHelp.textContent = ''};
    if (!document.getElementById('graph')) {historyTable.appendChild(loadingImage)};
  }
  
  xhr.addEventListener('loadstart', loading)
  xhr.open('POST', '/instruments/history')
  xhr.send(fullName); 
  xhr.onload = function() {
    var historyInfo = React.createElement(historyData, {displayName: instrumentName});
    responseObject = JSON.parse(xhr.responseText);
    dateList = responseObject.candles;    
    ReactDOM.render(historyInfo, document.getElementById('history-table'))
    drawChart(dateList);
  } 
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
    'width': 2200,
    fallingColor: { strokeWidth: 0, color: '#a52714' },
    risingColor: { strokeWidth: 0, color: '#0f9d58' }
  };
 
  var chart = new google.visualization.CandlestickChart(document.getElementById('graph'));
  chart.draw(data, options);
}







