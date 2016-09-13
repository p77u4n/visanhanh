process.env.NODE_ENV = process.env.NODE_ENV || 'development';
express = require('./config/express');
mongoose = require('./config/mongoose');


var dbInfo = mongoose();
var db = dbInfo.database;

var app = express(dbInfo.mongooseIns);

app.listen(80);

console.log('Server running at http://ip:80/');
