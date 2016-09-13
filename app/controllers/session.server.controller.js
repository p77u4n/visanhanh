exports.sendSession = function(req, res) {
    console.log("sendSession log : session ID ", req.sessionID);
    console.log("sendSession log : ",req.session);
    if(req.session.customerInfo) {
        res.send({status: 'OK', session : req.session});
    }else{
        res.send({status: 'NONE', session : req.session}); 
    }
    console.log("sendSession log: send Done");
}
