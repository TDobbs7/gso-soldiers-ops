var app = angular.module('gso-soldiers-ops');

/*app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            //General user routes
            when('/', {
                templateUrl: '/views/login.html',
                controller: 'LoginCtrl',
                require_login: false
            }).
            when('/test', {
                templateUrl: '/views/test/test.html',
                controller: 'TestCtrl',
                require_login: false
            }).
            when('/home', {
                templateUrl: '/views/home.html',
                controller: 'UserCtrl',
                require_login: true,
                good_roles: ["all"]
            }).
            //admin routes
            when('/admin/game_sched', {
                templateUrl: '/views/admin-game_sched',
                controller: 'Game_SchedCtrl',
                require_login: true,
                good_roles: ["Admin"]
            }). 
            otherwise({
                redirectTo: '/'
            });
    }
]);*/

app.config(['$stateProvider', '$urlRouterProvider', 
    function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('login');

        $stateProvider.
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
            });
    }
]);