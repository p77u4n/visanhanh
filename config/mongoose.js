var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
    console.log("connect to Database in process ...");
    var db = mongoose.connect(config.db);
    var dbconnection = mongoose.connection;
    dbconnection.on('error', console.error.bind(console, 'connection to db error'));
    dbconnection.once('open', function() {
        console.log("DB are connected");
    })
    require('../app/models/customers.server.model');
    return db;
};
