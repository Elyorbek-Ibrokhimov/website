// var Promise = require("bluebird");

// const gatherInstruments = new Promise ((resolve, reject) => {
//     const xhr = new XMLHttpRequest;
//     // xhr.addEventListener('error', reject);
//     xhr.onload = function () {
//       var currencyList = JSON.parse(xhr.responseText);
//       var allInstruments = currencyList[0].instrument
//       var instrumentString = (function () {       
//         for (var i=1; i<currencyList.length; i++){           
//           allInstruments += '%2C' + currencyList[i].instrument;      
//         };     
//       }());
//       console.log('RESPONSE TEXT', currencyList);
//       resolve(currencyList);
//     }
    
//     xhr.open('GET', '/currencies', true);
//     xhr.send(null);
    
//   })

// export default gatherInstruments;