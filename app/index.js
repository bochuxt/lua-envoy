var express = require('express');
var app = express();

var path = require('path');

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});
// app.use(function(req, res, next) {

//     console.log(req.originalUrl);
//     next();
// }, express.static('public'));


app.listen(80);
console.log('Listening on port 80');
