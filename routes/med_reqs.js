var express = require('express');
var router = express.Router();

/* GET medical requests listing. */
router.get('/', function(req, res, next) {
    var db = req.db;
    var med_coll = db.collection('medical_req');

    med_coll.find({}).toArray(function(err, med_reqs) {
    	if (err) res.status(500).json({"message": "Error getting medical requests\n" + err});
		else res.json({"medical_reqs": med_reqs});
    });
});

/*Get all medical requests done by/involving a user*/
router.get('/:email', function(req, res, next) {
    var db = req.db;
    var med_coll = db.collection('medical_req');
    var email = req.params.email;

    med_coll.find({$or:[{'staff': email}, {'player': email}]}).toArray(function(err, med_reqs) {
    	if (err) res.status(500).json({"message": "Error getting medical requests (" + email + ")\n" + err});
		else res.json({"medical_reqs": med_reqs});
    });
});

router.post('/', function(req, res, next) {
    var db = req.db;
    var med_coll = db.collection('medical_req');
    var med_req = req.body;

    med_coll.insert(med_req, function(err, ins) {
    	if (err) res.status(500).json({"message": "Error adding medical request (" + med_req._id + ")\n" + err});
		else res.json({"success": true});
    });
});

router.put('/:_id', function(req, res, next) {
    var db = req.db;
    var med_coll = db.collection('medical_req');
    var new_med_req = req.body;

    med_coll.update({"_id": req.params._id}, {$set: {new_med_req}}, function(err) {
        if (err) res.status(500).json({"message": "Error updating medical request (" + med_req._id + ")\n" + err});
        res.json({"message": "success", "data": {"timestamp" : new Date(new Date().getTime()).toUTCString()}});
    });
});

router.delete('/:_id', function(req, res, next) {
    var db = req.db;
    var med_coll = db.collection('medical_req');
    var _id = req.params._id;

    med_coll.remove({"_id": _id}, function(err, del) {
        if (err) res.status(500).json({"message": "Error deleting medical request (" + _id + ")\n" + err});
        else res.json({"message": "success"});
    });
});


module.exports = router;
