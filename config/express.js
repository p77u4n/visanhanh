var config = require('./config'),
    express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    redisStore = require('connect-redis')(session),
    genuuid = require('uid-safe'),
    MongoStore = require('connect-mongo')(session);
module.exports = function(mongoose) {
    var app = express();

    if (process.env.NODE_ENV === 'development') {
        
    } else if(process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());
    app.use(methodOverride());

    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret,
        cookie: {secure : config.sessionSecure},
        store: new MongoStore({mongooseConnection : mongoose.connection}) 
    }));
    
    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    require('../app/routes/index.server.routes.js')(app);
    require('../app/routes/customers.server.routes.js')(app); 
    require('../app/routes/session.server.routes.js')(app);
    app.use(express.static('./public'));
    return app;
};
