exports.render = function(req, res, next) {
    if(req.session.lastVisit) {
        console.log(req.session.lastVisit);
    }
    req.session.lastVisit = new Date();
    console.log(req);
    res.render('index');
    next();
};

exports.processingPOST = function(req, res ) {
    console.log(req.body);
    res.send({status : 'OK'});
};
