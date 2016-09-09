var Customer = require('mongoose').model('Customer');

exports.create = function(req, res ) {

    var customer = new Customer(req.body);
    console.log("create Customer ", req.body);
    customer.save(function(err, customer) {
        if (err) {
            console.log("err");
            throw err;
        } else {
            res.json(customer);
            console.log("Done add customer info ",req.body);
        }
    });
};
