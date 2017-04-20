var express = require('express');
var router = express.Router();

/* GET operations listing. */
router.get('/', function(req, res, next) {
    var db = req.db;
    var ops_coll = db.get('operations');

    ops_coll.find({}, {}, function(err, ops) {
    	if (err) throw err;
		else res.json({"operations": ops});
    });
});

/*Get all operations done by/involving a user*/
router.get('/:email', function(req, res, next) {
    var db = req.db;
    var ops_coll = db.get('operations');
    var email = req.params.email;

    ops_coll.find({$or:[{'requester': email}, {'requestee': email}]}, {}, function(err, ops) {
    	if (err) throw err;
		else res.json({"operations": ops});
    });
});

router.post('/', function(req, res, next) {
    var db = req.db;
    var ops_coll = db.get('operations');
    var op = req.body;

    ops_coll.insert(op, function(err, ins) {
    	if (err) throw err;
		else res.json({"operations": ops});
    });
});