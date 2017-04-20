var app = angular.module('gso-soldiers-ops');

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
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
            when('/home', {
                templateUrl: '/views/home.html',
                controller: 'UserCtrl',
                require_login: true,
                good_roles: ["all"]
            }).
            otherwise({
                redirectTo: '/'
            });
    }
]).config(['$routeProvider']);