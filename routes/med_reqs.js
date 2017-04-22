var express = require('express');
var router = express.Router();

/* GET medical requests listing. */
router.get('/', function(req, res, next) {
    var db = req.db;
    var med_coll = db.collection('medical_req');

    med_coll.find({}).toArray(function(err, med_reqs) {
    	if (err) return next(err);
		else res.json({"medical_reqs": med_reqs});
    });
});

/*Get all medical requests done by/involving a user*/
router.get('/:email', function(req, res, next) {
    var db = req.db;
    var med_coll = db.collection('medical_req');
    var email = req.params.email;

    med_coll.find({$or:[{'staff': email}, {'player': email}]}).toArray(function(err, med_reqs) {
    	if (err) return next(err);
		else res.json({"medical_reqs": med_reqs});
    });
});

router.post('/', function(req, res, next) {
    var db = req.db;
    var med_coll = db.collection('medical_req');
    var med_req = req.body;

    med_coll.insert(op, function(err, ins) {
    	if (err) return next(err);
		else res.json({"success": true});
    });
});

router.put('/:id', function(req, res, next) {
    var db = req.db;
    var user_coll = db.collection('medical_req');
    var new_user = req.body;

    user_coll.findOne({"email": req.params.email}, function(err, user) {
        if (err) {
            console.error(err);
            res.status(500).json(err);
        } 

        if (!user) res.status(404).json({"message" : "User " + req.params.email + " can't be updated at this time"});

        new_user._id = user._id;

        user_coll.update({"email": req.params.email}, {$set: {new_user}}, function(err) {
            if (err) {
                console.error(err);
                return next(err);
            }
            res.json({"timestamp" : new Date(new Date().getTime()).toUTCString()});
        });
    });
});

module.exports = router;
