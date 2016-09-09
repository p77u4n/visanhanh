var users = require('../../app/controllers/customers.server.controller.js');

module.exports = function(app) {
    app.route('/customers/').post(users.create);
};
