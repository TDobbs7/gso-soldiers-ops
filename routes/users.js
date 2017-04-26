var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var db = req.db;
    var user_coll = db.collection('users');

    user_coll.find({}).toArray(function(err, users) {
    	if (err) res.status(500).json({"message": "Error getting users\n" + err});
		else res.json({"message": "success", "data": {"users": users}});
    });
});

router.get('/:email', function(req, res, next) {
    var db = req.db;
    var user_coll = db.collection('users');
    var email = req.params.email;

    user_coll.findOne({'email': email}, function(err, user) {
        if (err) res.status(500).json({"message": "Error finding user (" + email + ")\n" + err});
        else if (!user) res.status(404).json({"message": "User ("  + email + ") not found"});
        else res.json({"message": "success", "data" : {"user": user}});
    });
});

router.post('/', function(req, res, next) {
    var db = req.db;
    var user_coll = db.collection('users');
    var user = req.body;

    user_coll.findOne({"email" : user.email}, function(err, user1) {
        if (err) res.status(500).json({"message": "Error adding user (" + user.email + ")\n" + err});
        if (user1) res.status(400).json({"message" : "The email address " + user.email + " is already in use."});
        else {
            user_coll.insert(user, function(err, ins) {
                if (err) res.status(500).json({"message": "Error adding user (" + user.email + ")\n" + err});

                res.json({"message": "success", "data" : {"timestamp": new Date(new Date().getTime()).toUTCString()}});
            });
        }
    });
});

router.post('/login', function(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    var db = req.db;
    var user_coll = db.collection('users');

    user_coll.findOne({'email': email, 'password': password}, function(err, user) {
    	if (err) res.status(500).json({"message": "Error logging in users\n" + err});
    	else if (!user) res.status(401).json({"message": "invalid username and/or password"});
    	else {
    		delete user.password;

            var abs_coll = db.collection('abilities');

            abs_coll.findOne({'role': user.role.class}, {}, function(err, powers) {
                var timestamp = new Date(new Date().getTime()).toLocaleString();

                if (err) res.status(500).json({"message": "Error getting user's abilities\n" + err});
                else if (!powers) res.json({"message": "success", "data": {"user": user, "timestamp" : timestamp}});
                
                res.json({"message": "success", "data": {"user" : user, "abilities": powers.abilities, "timestamp" : timestamp}});
            });
    	}
    });
});

router.put('/', function(req, res, next) {
    var db = req.db;
    var user_coll = db.collection('users');
    var upd_user = req.body;

    user_coll.findOne({'email': upd_user.email}, {}, function(err, user) {
        if (err) res.status(500).json({"message": "Error finding user (" + upd_user.email + ")\n" + err});
        else if (!user) res.status(404).json({"message": "User (" + upd_user.email + ") not found"});
        else {
            upd_user._id = user._id;
            upd_user.password = user.password;

            user_coll.replaceOne(user, upd_user, function(err) {
                if (err) res.status(500).json({"message": "Error updating user (" + upd_user.email + ")\n" + err});
                else res.json({"message": "success", "data": {"timestamp" : new Date(new Date().getTime()).toUTCString()}});
            });
        }
    });
});

router.delete('/:email', function(req, res, next) {
    var db = req.db;
    var user_coll = db.collection('users');
    var email = req.params.email;

    user_coll.remove({"email": email}, function(err, del) {
        if (err) res.status(500).json({"message": "Error deleting user (" + email + ")\n" + err});
        else res.json({"message": "success"});
    });
});

module.exports = router;
