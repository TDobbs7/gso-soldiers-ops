var app = angular.module('gso-soldiers-ops');

app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('login');

        $stateProvider.
            state('test', {
                url: '/test',
                templateUrl: '/views/test/test.html',
                controller: 'TestCtrl',
                require_login: false
            }).
            state('login', {
                url: '/login',
                templateUrl: '/views/login.html',
                controller: 'LoginCtrl',
                require_login: false
            }).
            state('home', {
                url: '/home',
                templateUrl: '/views/home.html',
                controller: 'UserCtrl',
                require_login: true,
                good_roles: ["all"]
            }).
            state('home.ops', {
                url: '.ops',
                templateUrl: '/views/ops.html',
                controller: 'OpsCtrl',
                require_login: true,
                good_roles: ["Admin"]
            }).
            state('home.contracts', {
                url: '.contracts',
                templateUrl: '/views/contracts.html',
                controller: 'ContractsCtrl',
                require_login: true,
                good_roles: ["all"]
            }).
            state('home.plays', {
                url: '.plays',
                templateUrl: '/views/plays.html',
                controller: 'PlaysCtrl',
                require_login: true,
                good_roles: ["all"]
            }).
            state('home.game_sched', {
                url: '.game_sched',
                templateUrl: '/views/game_sched.html',
                controller: 'Game_SchedCtrl',
                require_login: true,
                good_roles: ["all"]
            }).
            state('home.train_sched', {
                url: '.train_sched',
                templateUrl: '/views/train_sched.html',
                controller: 'Train_SchedCtrl',
                require_login: true,
                good_roles: ["all"]
            }).
            state('home.med_sched', {
                url: '.med_sched',
                templateUrl: '/views/med_sched.html',
                controller: 'Med_SchedCtrl',
                require_login: true,
                good_roles: ["all"],
                resolve: {
                    MedReqService: "MedReqService",
                    med_reqs: function(MedReqService) {
                        return MedReqService.GetAllMedReqs().then(function(res) {
                            return res.data.medical_reqs;
                        }, function(error) {
                            return error;
                        });
                    }
                }
            }).
            state('home.med_reqs', {
                url: '.med_reqs',
                templateUrl: '/views/med_reqs.html',
                controller: 'MedReqsCtrl',
                require_login: true,
                good_roles: ["Player", "Coach", "Medic"],
                resolve: {
                    MedReqService: 'MedReqService',
                    med_reqs: function(MedReqService) {
                        return MedReqService.GetMyMedReqs().then(function(res) {
                            return res.data.medical_reqs;
                        }, function(error) {
                            return error;
                        });
                    }
                }
            }).
            state('home.med_rep', {
                url: '.med_rep',
                templateUrl: '/views/med_rep.html',
                controller: 'MedRepsCtrl',
                require_login: true,
                good_roles: ["Medic"]
            }).
            state('home.trades', {
                url: '.trades',
                templateUrl: '/views/trades.html',
                controller: 'TradesCtrl',
                require_login: true,
                good_roles: ["Admin", "Coach"]
            });
    }
]);
