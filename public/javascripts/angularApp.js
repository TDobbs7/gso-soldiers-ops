"use strict";

var app = angular.module('gso-soldiers-ops', ['ngRoute']);

app.run(function($location, $rootScope, $route, AuthenticationService, UserService) {
    $rootScope.location = $location;
    changeRoute($location.path());
    $rootScope.currentUserData = JSON.parse(window.localStorage.getItem("user"));

    $rootScope.logout = function() {
        $rootScope.currentUserData.user.last_login = $rootScope.currentUserData.timestamp;
        UserService.UpdateUser($rootScope.currentUserData.user).then(function(res) {
            AuthenticationService.clearCurrentUser();

            changeRoute('/');
            $location.path('/');

            alert("You have logged out");
            $route.reload();
        }, function(res) {
          $rootScope.stopAndReport(res.data);
        });
    };

    $rootScope.stopAndReport = function(res) {
        event.preventDefault();
        alert(res.message);
    }

    function changeRoute(route) {
        $rootScope.route = $route.routes[route];
    }

    $rootScope.$on('$locationChangeStart', function(event, next, current) {
        var next_path = $location.path();
        var next_route = $route.routes[next_path];

        if (next_path == '/' && AuthenticationService.isAuthenticated()) {
            event.preventDefault();
            changeRoute('/home');
            $location.path('/home');
        }

        if (next_route && next_route.require_login) {
            if(!AuthenticationService.isAuthenticated()) {
                $rootScope.stopAndReport({'message' : "You must be logged in first"});
                changeRoute('/');
                $location.path('/');
            }
            else if (!AuthenticationService.isAuthorized(next_route.good_roles)) {
                $rootScope.stopAndReport({'message' : "You are not authorized to view this page : " + $rootScope.currentUserData.user.role.class + ", " + $rootScope.currentUserData.user.role.position});

                next_path = '/home';
                changeRoute(next_path);
                $location.path(next_path);
            } else {
                changeRoute(next_path);
                $location.path(next_path);
            }
        }

        $route.reload();
    });
});