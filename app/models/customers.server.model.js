var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CustomerSchema = new Schema({
    usrname: String,
    usrsdt: String
}, {strict: false});
CustomerSchema.index({usrsdt : 1},{unique: true});
mongoose.model('Customer', CustomerSchema);
console.log("create Customer mode Done");

var CustomerOrderSchema = new Schema({
    usrname : String,
    usrsdt : String,
    orderinfo : {},
    isprocessed : Boolean
}, {strict: false});
CustomerOrderSchema.index({usrsdt : 1}, {unique: true});
mongoose.model('CustomerOrder', CustomerOrderSchema);
console.log("create CustomerOrder mode Done");
//test



