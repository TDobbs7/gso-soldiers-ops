var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    
});

router.post('/one', function(req, res, next){
	var db = req.db;
    var user_coll = db.collection('users');

	var user = {
		"email": "huntervick@gso.org",
		"fname": "Hunter",
		"lname": "Vick",
		"role": {
			"class": "Admin",
			"position": "General Manager"
		}
	};

	user_coll.insert(user, function(err, inserted) {
		if (err) return next(err);

		res.json();
	});
});

router.post('/abilities', function(req, res, next) {
    var db = req.db;
    var abs_coll = db.collection("abilities");

    var abilities = [
        {'role': 'Admin',
        'abilities': [
            "View All Operations",
            "Manage Contract Offers",
            "Manage Game Schedule",
            "Manage Trade Agreement Details"
        ]},
        {'role': 'Player',
        'abilities': [
            "View Contract Offer",
            "View Medical Schedule",
            "View Game Schedule",
            "View Training Schedule",
            "View Playbook"
        ]},
        {'role': 'Coach',
        'abilities': [
            "View Contract Offer",
            "Manage Training Schedules",
            "Manage Playbook",
            "Create Scouting Report",
            "Create Team Report",
            "Request Medical Appointment"
        ]},
        {
        'role': 'Medic',
        'abilities': [
            "View Contract Offer",
            "Manage Medical Appointments/Requests",
            "View Medical Schedule",
            "Create Medical Report"
        ]}
    ];

    abilities.forEach(function(role) {
        abs_coll.insert(role, function(err, insert) {
            if (err) console.error(err);
        });
    });

    res.json({"success": true});
});

router.post('/', function(req, res, next) {
	var db = req.db;
	var user_coll = db.collection("users");

	var users = [
    	{
    		"email": "huntervick@gso.org",
    		"fname": "Hunter",
    		"lname": "Vick",
    		"role": {
    			"class": "Admin",
    			"position": "General Manager"
    		}
    	},
    	{
    		"email": "shawnwilkinson@gso.org",
    		"fname": "Shawn",
    		"lname": "Wilkinson",
    		"role": {
    			"class": "Coach",
    			"position": "Head Coach"
    		}
    	},
    	{
    		"email": "phillipharley@gso.org",
    		"fname": "Phillip",
    		"lname": "Harley",
    		"role": {
    			"class": "Coach",
    			"position": "Assistant Head Coach"
    		}
    	},
    	{
    		"email": "yusefzigler@gso.org",
    		"fname": "Yusef",
    		"lname": "Zigler",
    		"role": {
    			"class": "Coach",
    			"position": "Offensive Coordinator"
    		}
    	},
    	{
    		"email": "waynelester@gso.org",
    		"fname": "Wayne",
    		"lname": "Lester",
    		"role": {
    			"class": "Coach",
    			"position": "Defensive Coordinator"
    		}
    	},
    	{
    		"email": "daniellecarter@gso.org",
    		"fname": "Danielle",
    		"lname": "Carter",
    		"role": {
    			"class": "Medic",
    			"position": "Head Athletic Trainer"
    		}
    	},
    	{
    		"email": "antoinedinatale@gso.org",
    		"fname": "Antoine",
    		"lname": "DiNatale",
    		"role": {
    			"class": "Medic",
    			"position": "Assistant Athletic Trainer"
    		}
    	},
    	{
    		"email": "carlosolsen@gso.org",
    		"fname": "Carlos",
    		"lname": "Olsen",
    		"role": {
    			"class": "Medic",
    			"position": "Massage Therapist"
    		}
    	},
    	{
    		"email": "jenniferedwards@gso.org",
    		"fname": "Jennifer",
    		"lname": "Edwards",
    		"role": {
    			"class": "Medic",
    			"position": "Head Physical Therapist"
    		}
    	},
    	{
    		"email": "mickeyisler@gso.org",
    		"fname": "Mickey",
    		"lname": "Isler",
    		"role": {
    			"class": "Medic",
    			"position": "Head Team Physician"
    		}
    	},
    	{
    		"email": "beatricequinzel@gso.org",
    		"fname": "Beatrice",
    		"lname": "Quinzel",
    		"role": {
    			"class": "Medic",
    			"position": "Associate Head Team Physician"
    		}
    	},
    	{
    		"email": "mickeyisler@gso.org",
    		"fname": "Mickey",
    		"lname": "Isler",
    		"role": {
    			"class": "Medic",
    			"position": "Head Team Physician"
    		}
    	},
    	{
    		"email": "cynthiaturner@gso.org",
    		"fname": "Cynthia",
    		"lname": "Turner",
    		"role": {
    			"class": "Medic",
    			"position": "Assistant Orthopaedic Surgeon"
    		}
    	},
    	{
    		"email": "grantulysses@gso.org",
    		"fname": "Grant",
    		"lname": "Ulysses",
    		"role": {
    			"class": "Medic",
    			"position": "Dentist"
    		}
    	},
    	{
    		"email": "nickfrazier@gso.org",
    		"fname": "Nick",
    		"lname": "Frazier",
    		"role": {
    			"class": "Player",
    			"position": "Shooting Guard"
    		}
    	},
    	{
    		"email": "markgronson@gso.org",
    		"fname": "Mark",
    		"lname": "Gronson",
    		"role": {
    			"class": "Player",
    			"position": "Point Guard"
    		}
    	},
    	{
    		"email": "jeffsanders@gso.org",
    		"fname": "Jeff",
    		"lname": "Sanders",
    		"role": {
    			"class": "Player",
    			"position": "Power Forward"
    		}
    	},
    	{
    		"email": "adamjones@gso.org",
    		"fname": "Adam",
    		"lname": "Jones",
    		"role": {
    			"class": "Player",
    			"position": "Center"
    		}
    	},
    	{
    		"email": "tylerlane@gso.org",
    		"fname": "Tyler",
    		"lname": "Lane",
    		"role": {
    			"class": "Player",
    			"position": "Small Forward"
    		}
    	},
    	{
    		"email": "travisportsmouth@gso.org",
    		"fname": "Travis",
    		"lname": "Portsmouth",
    		"role": {
    			"class": "Player",
    			"position": "Center"
    		}
    	},
    	{
    		"email": "frankrivers@gso.org",
    		"fname": "Frank",
    		"lname": "Rivers",
    		"role": {
    			"class": "Player",
    			"position": "Shooting Guard"
    		}
    	},
    	{
    		"email": "bradleybeasley@gso.org",
    		"fname": "Bradley",
    		"lname": "Beasley",
    		"role": {
    			"class": "Player",
    			"position": "Small Forward"
    		}
    	},
    	{
    		"email": "Brandonxing@gso.org",
    		"fname": "Brandon",
    		"lname": "Xing",
    		"role": {
    			"class": "Player",
    			"position": "Point Guard"
    		}
    	},
    	{
    		"email": "mikeholden@gso.org",
    		"fname": "Mike",
    		"lname": "Holden",
    		"role": {
    			"class": "Player",
    			"position": "Power Forward"
    		}
    	},
    	{
    		"email": "scottmiller@gso.org",
    		"fname": "Scott",
    		"lname": "Miller",
    		"role": {
    			"class": "Player",
    			"position": "Small Forward"
    		}
    	},
    	{
    		"email": "ryanyoung@gso.org",
    		"fname": "Ryan",
    		"lname": "Young",
    		"role": {
    			"class": "Player",
    			"position": "Center"
    		}
    	},
    	{
    		"email": "ericanderson@gso.org",
    		"fname": "Eric",
    		"lname": "Anderson",
    		"role": {
    			"class": "Player",
    			"position": "Power Forward"
    		}
    	},
    	{
    		"email": "tommykey@gso.org",
    		"fname": "Tommy",
    		"lname": "Key",
    		"role": {
    			"class": "Player",
    			"position": "Small Forward"
    		}
    	},
    	{
    		"email": "matthewnelson@gso.org",
    		"fname": "Matthew",
    		"lname": "Nelson",
    		"role": {
    			"class": "Player",
    			"position": "Shooting Guard"
    		}
    	}
    ];

    users.forEach(function(user) {
    	user_coll.insert(user, function(err, insert) {
    		if (err) console.error(err);
    	});
    });

    res.json({"success": true});
});

router.put('/pass', function(req, res, next) {
    var db = req.db;
    var user_coll = db.collection("users");

    user_coll.find({},{}, function(err, users) {
        if (err) return next(err);

        users.forEach(function(user) {
            user_coll.update(user, {$set: {"password": "pass"}}, function(err, up) {
                if (err) {
                    console.log("single bleh");
                    console.err(err);
                }
                else console.log(up);
            });
        });

        res.json({"success": true});
    });
});

router.put('/abilities', function(req, res, next) {
    var db = req.db;
    var user_coll = db.collection("users");

    user_coll.find({}).toArray(function(err, users) {
        if (err) return next(err);

        users.forEach(function(user) {
            if (user.abilities) {
                delete user.abilities;
                user_coll.update({"email": user.email}, user, function(err, up) {
                    if (err) {
                        console.log("single bleh");
                        console.error(err);
                    }
                    else console.log(up);
                });
            }
        });

        res.json({"success": true});
    });
});

module.exports = router;
