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
    var upd_op = req.body;
    var id = req.params._id;

    ops_coll.findOne({'_id': id}, {}, function(err, op) {
        if (err) res.status(500).json({"message": "Error finding operation (" + id + ")\n" + err});
        else if (!op) res.status(404).json({"message": "Operation (" + id + ") not found"});
        else {
            ops_coll.replaceOne(op, upd_op, function(err) {
                if (err) res.status(500).json({"message": "Error updating operation (" + id + ")\n" + err});
                else res.json({"message": "success", "data": {"timestamp" : new Date(new Date().getTime()).toUTCString()}});
            });
        }
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
