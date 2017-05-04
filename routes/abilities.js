var express = require('express');
var router = express.Router();

/* GET abilities listing. */
router.get('/', function(req, res, next) {
    var db = req.db;
    var ability_coll = db.collection('abilities');

    ability_coll.find({}).sort({'class' : 1}).toArray(function(err, abilities) {
    	if (err) res.status(500).json({"message": "Error getting abilities\n" + err});
		else res.json({"message": "success", "data": {"abilities": abilities}});
    });
});

router.get('/roles', function(req, res, next) {
    var db = req.db;
    var ability_coll = db.collection('abilities');

    ability_coll.find({}).sort({'class' : 1}).toArray(function(err, abilities) {
        if (err) res.status(500).json({"message": "Error getting abilities\n" + err});
        else {
            var roles = [];
            for (var index in abilities) {
                roles.push(abilities[index].class);
            }

            res.json({"message": "success", "data": {"roles": roles}});
        }
    });
})

router.get('/:role', function(req, res, next) {
    var db = req.db;
    var ability_coll = db.collection('abilities');
    var role = req.params.role;

    ability_coll.findOne({'class': role}, function(err, abilities) {
        if (err) res.status(500).json({"message": "Error finding abilities (" + role + ")\n" + err});
        else if (!abilities) res.status(404).json({"message": "abilities ("  + role + ") not found"});
        else res.json({"message": "success", "data" : {"abilities": abilities}});
    });
});

router.post('/:role', function(req, res, next) {
    var db = req.db;
    var ability_coll = db.collection('abilities');
    var ability = req.body;
    var role = req.params.role;

    ability_coll.findOne({"class": role, "name" : ability.name}, function(err, ability1) {
        if (err) res.status(500).json({"message": "Error adding ability (" + ability.name + ")\n" + err});
        if (ability1) res.status(400).json({"message" : "The ability " + ability.name + " already exists."});
        else {
            ability_coll.insert(ability, function(err, ins) {
                if (err) res.status(500).json({"message": "Error adding ability (" + ability.name + ")\n" + err});

                res.json({"message": "success", "data" : {"timestamp": new Date(new Date().getTime()).toUTCString()}});
            });
        }
    });
});

router.put('/:role', function(req, res, next) {
    var db = req.db;
    var ability_coll = db.collection('abilities');
    var upd_ability = req.body;
    var role = req.params.role;

    ability_coll.findOne({"class": role, 'name': upd_ability.name}, {}, function(err, ability) {
        if (err) res.status(500).json({"message": "Error finding ability (" + upd_ability.name + ")\n" + err});
        else if (!ability) res.status(404).json({"message": "ability (" + upd_ability.name + ") not found"});
        else {
            upd_ability._id = ability._id;

            ability_coll.replaceOne(ability, upd_ability, function(err) {
                if (err) res.status(500).json({"message": "Error updating ability (" + upd_ability.name + ")\n" + err});
                else res.json({"message": "success", "data": {"timestamp" : new Date(new Date().getTime()).toUTCString()}});
            });
        }
    });
});

router.delete('/:role/:name', function(req, res, next) {
    var db = req.db;
    var ability_coll = db.collection('abilities');
    var name = req.params.name;
    var role = req.params.role;

    ability_coll.remove({"class": role, "name": name}, function(err, del) {
        if (err) res.status(500).json({"message": "Error deleting ability (" + name + ")\n" + err});
        else res.json({"message": "success"});
    });
});

module.exports = router;
