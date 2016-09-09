var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CustomerSchema = new Schema({
    usrname: String,
    usrsdt: String
}, {strict: false});

mongoose.model('Customer', CustomerSchema);

//test

console.log("create Customer mode Done");


