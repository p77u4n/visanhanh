module.exports = function(app) {
    var index = require('../controllers/index.server.controller');
    app.post('/',index.processingPOST);
    app.get('/',index.render);
    console.log('OK');
};
