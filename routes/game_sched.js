var express = require('express');
var router = express.Router();

/* GET abilities listing. */
router.get('/', function(req, res, next) {
    var db = req.db;
    var game_coll = db.collection('game_sched');

    game_coll.find({}).sort({'datetime' : 1}).toArray(function(err, games) {
    	if (err) res.status(500).json({"message": "Error getting games\n" + err});
		else res.json({"message": "success", "data": {"games": games}});
    });
});

router.post('/', function(req, res, next) {
	var db = req.db;
	var game_coll = db.collection('game_sched');
	var game = req.body;

	game_coll.insert(game, function(err, ins) {
		if (err) res.status(500).json({"message": "Error adding game (" + game.opponent + ")\n" + err});
        res.json({"message": "success", "data" : {"timestamp": new Date(new Date().getTime()).toUTCString()}});
	});
});

module.exports = router;