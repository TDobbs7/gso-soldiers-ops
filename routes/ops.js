var express = require('express');
var router = express.Router();

/* GET operations listing. */
router.get('/', function(req, res, next) {
    var db = req.db;
    var ops_coll = db.collection('operations');

    ops_coll.find({}).toArray(function(err, ops) {
    	if (err) res.status(500).json({"message": "Error getting operations\n" + err});
		else res.json({"message": "success", "data": {"operations": ops}});
    });
});

/*Get all operations done by/involving a user*/
router.get('/email/:email', function(req, res, next) {
    var db = req.db;
    var ops_coll = db.collection('operations');
    var email = req.params.email;

    ops_coll.find({$or:[{'requester': email}, {'requestee': email}]}).toArray(function(err, ops) {
    	if (err) res.status(500).json({"message": "Error getting operations (" + email + ")\n" + err});
		else res.json({"message": "success", "data": {"operations": ops}});
    });
});

router.get('/type/:type', function(req, res, next) {
    var db = req.db;
    var ops_coll = db.collection('operations');
    var type = req.params.type;

    ops_coll.find({'type': type}).toArray(function(err, ops) {
        if (err) res.status(500).json({"message": "Error getting operations (" + type + ")\n" + err});
        else res.json({"message": "success", "data": {"operations": ops}});
    });
});

router.post('/', function(req, res, next) {
    var db = req.db;
    var ops_coll = db.collection('operations');
    var op = req.body;

    ops_coll.insert(op, function(err, ins) {
    	if (err) res.status(500).json({"message": "Error inserting operation (" + op._id + ")\n" + err});
		else res.json({"message": "success"});
    });
});

router.put('/:_id', function(req, res, next) {
    var db = req.db;
    var ops_coll = db.collection('operations');
    var op = req.body;

    ops_coll.update({'_id': req.params._id}, op, function(err, ups) {
        if (err) res.status(500).json({"message": "Error updating operation (" + op._id + ")\n" + err});
        else res.json({"message": "success"});
    });
});

router.delete('/:_id', function(req, res, next) {
    var db = req.db;
    var ops_coll = db.collection('operations');

    ops_coll.remove({'_id': req.params._id}, function(err, del) {
        if (err) res.status(500).json({"message": "Error deleting operation (" + op._id + ")\n" + err});
        else res.json({"message": "success"});
    });
});

module.exports = router;
