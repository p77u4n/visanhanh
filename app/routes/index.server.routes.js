module.exports = function(app) {
    var index = require('../controllers/index.server.controller');
    app.get('/', index.render, index.printreq);
    app.post('/',index.printreq);
    console.log('OK');
};