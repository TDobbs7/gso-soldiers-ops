var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var db = req.db;
    var contracts_coll = db.collection('contracts');

    contracts_coll.find({}).toArray(function(err, contracts) {
    	if (err) res.status(500).json({"message": "Error getting contracts\n" + err});
		else res.json({"message": "success", "data": {"contracts": contracts}});
    });
});

router.get('/email/:email', function(req, res, next) {
    var db = req.db;
    var contracts_coll = db.collection('contracts');
    var email = req.params.email;

    contracts_coll.findOne({'email': email}, function(err, contract) {
        if (err) res.status(500).json({"message": "Error finding contract (" + email + ")\n" + err});
        else if (!contract) res.status(404).json({"message": "Contract ("  + email + ") not found"});
        else res.json({"message": "success", "data" : {"contract": contract}});
    });
});

router.get('/role/:role', function(req, res, next) {
    var db = req.db;
    var contract_coll = db.collection('contracts');
    var role = req.params.role;

    contract_coll.find({'role.class': role}).toArray(function(err, contracts) {
        if (err) res.status(500).json({"message": "Error finding contracts (" + role + ")\n" + err});
        else if (!contracts) res.status(404).json({"message": "contracts ("  + role + ") not found"});
        else res.json({"message": "success", "data" : {"contracts": contracts}});
    });
});

router.post('/', function(req, res, next) {
    var db = req.db;
    var contract_coll = db.collection('contracts');
    var contract = req.body;

    contract_coll.findOne({"email" : contract.email}, function(err, contract1) {
        if (err) res.status(500).json({"message": "Error adding contract (" + contract.email + ")\n" + err});
        if (contract1) res.status(400).json({"message" : "The email address " + contract.email + " is already in use."});
        else {
            contract_coll.insert(contract, function(err, ins) {
                if (err) res.status(500).json({"message": "Error adding contract (" + contract.email + ")\n" + err});

                res.json({"message": "success", "data" : {"timestamp": new Date(new Date().getTime()).toUTCString()}});
            });
        }
    });
});

router.put('/', function(req, res, next) {
    var db = req.db;
    var contract_coll = db.collection('contracts');
    var upd_contract = req.body;

    contract_coll.findOne({'email': upd_contract.email}, {}, function(err, contract) {
        if (err) res.status(500).json({"message": "Error finding contract (" + upd_contract.email + ")\n" + err});
        else if (!contract) res.status(404).json({"message": "Contract (" + upd_contract.email + ") not found"});
        else {
            upd_contract._id = contract._id;

            contract_coll.replaceOne(contract, upd_contract, function(err) {
                if (err) res.status(500).json({"message": "Error updating contract (" + upd_contract.email + ")\n" + err});
                else res.json({"message": "success", "data": {"timestamp" : new Date(new Date().getTime()).toUTCString()}});
            });
        }
    });
});

router.delete('/:email', function(req, res, next) {
    var db = req.db;
    var contract_coll = db.collection('contracts');
    var email = req.params.email;

    contract_coll.remove({"email": email}, function(err, del) {
        if (err) res.status(500).json({"message": "Error deleting contract (" + email + ")\n" + err});
        else res.json({"message": "success"});
    });
});

module.exports = router;