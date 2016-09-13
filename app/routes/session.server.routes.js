var session = require('../controllers/session.server.controller.js');

module.exports = function(app) {
    app.get('/session/', session.sendSession);
}
