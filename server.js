process.env.NODE_ENV = process.env.NODE_ENV || 'development';
express = require('./config/express');
mongoose = require('./config/mongoose');


var db = mongoose();
var app = express();

app.listen(80);

console.log('Server running at http://ip:80/');
var mongoose = require('./config/mongoose');
