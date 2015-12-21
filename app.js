var express = require('express');
    app = express();
    router = express.Router();
    instruments = require('./instruments.js');
    sass = require('node-sass');
    path = require('path');
    sassMiddleware = require('node-sass-middleware')

// console.log(client);

app.use(
   sassMiddleware({
       src: __dirname + '/sass', 
       dest: __dirname + '/public/stylesheets',
       prefix:  '/stylesheets',
       debug: true        
   })
); 

app.use(express.static('public'));
app.use('/instruments', instruments);


app.get('/', function(req,res){
  res.sendFile(__dirname + '/index.html');
})



app.listen(3000);
console.log('ForEx server is up on 3000');