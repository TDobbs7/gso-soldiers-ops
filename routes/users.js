var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var db = req.db;
    var user_coll = db.collection('users');

    user_coll.find({}, {}, function(err, users) {
    	if (err) throw err;
		else res.json({"users": users});
    });
});

// router.get('/:email', function(req, res, next) {
//     User.findOne({"email" : req.params.email}, function(err, user) {
//         if (err) return next(err);

//         if (!user) res.status(404).json({'message' :"User with Email " + req.params.email + " not found"});
//         else res.json({"user" : user, "timestamp" : new Date(new Date().getTime())});
//     });
// });

router.post('/', function(req, res, next) {
    var user = {};

    User.findOne({"email" : user.email}, function(err, user1) {
        if (err) return next(err);
        if (user1) res.status(400).json({"message" : "The email address " + user.email + " is already in use."});
        else {
            user.user_role = "regular";

            user.save(function(err) {
                if (err) return next(err);

                res.json({"timestamp" : new Date(new Date().getTime()).toUTCString()});
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
    	if (err) res.status(500).json(err);
    	else if (!user) res.status(401).json({"message": "invalid username and/or password"});
    	else {
    		delete user.password;

            var abs_coll = db.collection('abilities');

            abs_coll.findOne({'role': user.role.class}, {}, function(err, powers) {
                var timestamp = new Date(new Date().getTime()).toLocaleString();

                if (err) res.status(500).json(err);
                else if (!powers) res.json({"user" : user, "timestamp" : timestamp});
                
                user.abilities = powers.abilities;
                res.json({"user" : user, "timestamp" : timestamp});
            });
    	}
    });
});

router.put('/:email', function(req, res, next) {
    var db = req.db;
    var user_coll = db.collection('users');
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
