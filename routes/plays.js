/*
id
name
key position
description
picture array
*/

var express = require('express');
var router = express.Router();

/* GET plays listing. */
router.get('/', function(req, res, next) {
    var db = req.db;
    var plays_coll = db.collection('playbook');

    plays_coll.find({}).toArray(function(err, plays) {
    	if (err) res.status(500).json({"message": "Error getting plays\n" + err});
		else res.json({"message": "success", "data": {"plays": plays}});
    });
});

router.get('/:name', function(req, res, next) {
    var db = req.db;
    var plays_coll = db.collection('playbook');
    var name = req.params.name;

    plays_coll.findOne({"name": name}, function(err, play) {
        if (err) res.status(500).json({"message": "Error getting play (" + name + ")\n" + err});
        else res.json({"message": "success", "data": {"play": play}});
    });
});

router.post('/', function(req, res, next) {
    var db = req.db;
    var play_coll = db.collection('playbook');
    var play = req.body;

    play_coll.findOne({"name" : play.name}, function(err, play) {
        if (err) res.status(500).json({"message": "Error adding play (" + play.name + ")\n" + err});
        if (play) res.status(400).json({"message" : "The name \'" + play.name + "\' is already in use."});
        else {
            play_coll.insert(play, function(err, ins) {
                if (err) res.status(500).json({"message": "Error adding play (" + play.name + ")\n" + err});

                res.json({"message": "success", "data" : {"timestamp": new Date(new Date().getTime()).toUTCString()}});
            });
        }
    });
});

router.put('/:name', function(req, res, next) {
    var db = req.db;
    var play_coll = db.collection('playbook');
    var name = req.params.name;
    var upd_play = req.body;

    play_coll.findOne({'name': name}, {}, function(err, play) {
        if (err) res.status(500).json({"message": "Error finding play (" + name + ")\n" + err});
        else if (!play) res.status(404).json({"message": "Play (" + name + ") not found"});
        else {
            play_coll.replaceOne(play, upd_play, function(err) {
                if (err) res.status(500).json({"message": "Error updating play (" + play + ")\n" + err});
                else res.json({"message": "success", "data": {"timestamp" : new Date(new Date().getTime()).toUTCString()}});
            });
        }
    });
});

router.delete('/:name', function(req, res, next) {
    var db = req.db;
    var play_coll = db.collection('playbook');
    var name = req.params.name;

    play_coll.remove({"name": name}, function(err, del) {
        if (err) res.status(500).json({"message": "Error deleting play (" + name + ")\n" + err});
        else res.json({"message": "success"});
    });
});

module.exports = router;
