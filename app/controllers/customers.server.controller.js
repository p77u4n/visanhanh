var Customer = require('mongoose').model('Customer');
var CustomerOrder = require('mongoose').model('CustomerOrder');
exports.create = function(req, res ) {

    var customer = new Customer(req.body);
    console.log("create Customer ", req.body);
    customer.save(function(err, customer) {
        if (err) {
            console.log("err");
            throw err;
        } else {
            res.send({status : 'OK'});
            req.session.customerInfo = new Object();
            req.session.customerInfo.usrname = customer.usrname;
            req.session.customerInfo.usrsdt = customer.usrsdt;
            req.session.save(function(err) {
                if(err) {
                    console.log("SessionStore Warning : Cannot store");
                }else {
                    console.log("SessionStore Notice : Store OK");
                }
            })
            console.log("Done add customer info ",req.body);
            console.log(req.session);
        }
    });
};


exports.createOrder = function(req, res) {
    var customerOrder = new Customer(req.body);
    console.log("create Order", req.body);

    customerOrder.save(function(err, customer) {
        if(err) {
            console.log("Serverlog : create Order error !!!");
            throw err;
        } else {
            res.send({status : 'OK'});
            console.log("Serverlog : Done add customer order info", req.body);
        }
    }); 
}
