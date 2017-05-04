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
                good_roles: ["all"],
                resolve: {
                    AbsService: "AbsService",
                    abilities: function(AbsService) {
                        return AbsService.GetMyAbs().then(function(res) {
                            return res.data.data.abilities;
                        }, function(error) {
                            return error;
                        });
                    }
                }
            }).
            state('home.ops', {
                url: '.ops',
                templateUrl: '/views/ops.html',
                controller: 'OpsCtrl',
                require_login: true,
                good_roles: ["Admin"],
                resolve: {
                    OpsService: "OpsService",
                    ops: function(OpsService) {
                        return OpsService.GetAllOps().then(function(res) {
                            return res.data.ops;
                        }, function(error) {
                            return error;
                        });
                    }
                }
            }).
            state('home.contracts', {
                url: '.contracts',
                templateUrl: '/views/contracts.html',
                controller: 'ContractsCtrl',
                require_login: true,
                good_roles: ["all"],
                resolve: {
                    ContractsService: "ContractsService",
                    UserService: "UserService",
                    contracts: function(ContractsService) {
                        return ContractsService.GetMyContracts().then(function(res) {
                            return res.data.data.contracts;
                        }, function(error) {
                            return error;
                        });
                    },
                    users: function(UserService) {
                        return UserService.GetAllUsers().then(function(res) {
                            return res.data.data.users;
                        }, function(error) {
                            return error;
                        });
                    }
                }
            }).
            state('home.plays', {
                url: '.plays',
                templateUrl: '/views/plays.html',
                controller: 'PlaysCtrl',
                require_login: true,
                good_roles: ["Coach", "Player"]
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
                        return MedReqService.GetMyMedReqs().then(function(res) {
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
                good_roles: ["Player", "Coach"],
                resolve: {
                    UserService: 'UserService',
                    med_staff: function(UserService) {
                        return UserService.GetByRole('Medic').then(function(res) {
                            return res.data.data.users;
                        }, function(error) {
                            return error;
                        });
                    },
                    players: function(UserService) {
                        return UserService.GetByRole('Player').then(function(res) {
                            return res.data.data.users;
                        }, function(error) {
                            return error;
                        });
                    }
                }
            });
    }
]);
