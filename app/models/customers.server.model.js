var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CustomerSchema = new Schema({
    name: String,
    sdt: String,
    nTrade: Number
});

mongoose.model('Customer', CustomerSchema);


