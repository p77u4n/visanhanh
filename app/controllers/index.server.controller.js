exports.render = function(req, res, next) {
    if(req.session.lastVisit) {
        console.log(req.session.lastVisit);
    }
    req.session.lastVisit = new Date();

    res.render('index');
    next();
};

exports.printreq = function(req, res ) {
    console.log(req.body);
};
