"use strict";

var app = angular.module('gso-soldiers-ops', ['ui.router']);

app.run(function($location, $rootScope, $state, AuthenticationService, UserService, OpsService) {
    $rootScope.stopAndReport = function(res) {
        alert(res.message);
        return false;
    }

    $rootScope.changeState = function(state) {
        $rootScope.state = $state.get(state);
        $state.go($rootScope.state);
    }

    var s = $location.path().slice(1, $location.path().length + 1);
    $rootScope.changeState(s);
    $rootScope.currentUserData = JSON.parse(window.localStorage.getItem("user"));
    $rootScope.currentUserData.abilities = JSON.parse(window.localStorage.getItem("abilities"));

    $rootScope.logout = function() {
        $rootScope.currentUserData.last_login = $rootScope.currentUserData.timestamp;
        UserService.UpdateUser($rootScope.currentUserData).then(function(res) {
            // var op = {
            //     "type": "Logout",
            //     "user": $rootScope.currentUserData.email,
            //     "timestamp": $rootScope.currentUserData.timestamp,
            // }

            AuthenticationService.clearCurrentUser();
            /*OpsService.AddNewOp(op).then(function(res) {

            }, function(res) {
                $rootScope.stopAndReport(res.data);
            });*/

            $rootScope.changeState('login');
            $state.go('login');

            alert("You have logged out");
            //$state.reload();
        }, function(res) {
          $rootScope.stopAndReport(res.data);
        });
    };

    $rootScope.$on('$locationChangeStart', function(event, next, current) {
        var next_path = $location.path();
        //var next_route = $route.routes[next_path];

        if (next_path == '/login' && AuthenticationService.isAuthenticated()) {
            event.preventDefault();
            $rootScope.changeState('home');
            $location.path('/home');
        }

        if ($state.current.require_login) {
            if(!AuthenticationService.isAuthenticated()) {
                $rootScope.stopAndReport({'message' : "You must be logged in first"});
                $rootScope.changeState('login');
                $location.path('/login');
            }
            else if (!AuthenticationService.isAuthorized($state.current.good_roles)) {
                $rootScope.stopAndReport({'message' : "You are not authorized to view this page : " + $rootScope.currentUserData.user.role.class + ", " + $rootScope.currentUserData.user.role.position});

                $rootScope.changeState('home');
                $location.path('/' + next_path);
            } else {
                $rootScope.changeState(next_path.slice(1, next_path.length+1));
                $location.path(next_path);
            }
        }

       //$state.reload();
    });
});