"use strict";

var app = angular.module('gso-soldiers-ops', ['ui.router']);

app.run(function($location, $rootScope, $state, AuthenticationService, UserService) {
    $rootScope.location = $location;
    // changeState($location.path());
    $rootScope.currentUserData = JSON.parse(window.localStorage.getItem("user"));

    $rootScope.logout = function() {
        $rootScope.currentUserData.last_login = $rootScope.currentUserData.timestamp;
        UserService.UpdateUser($rootScope.currentUserData).then(function(res) {
            AuthenticationService.clearCurrentUser();

            //changeState('login');
            $state.go('login')

            alert("You have logged out");
            $state.reload();
        }, function(res) {
          $rootScope.stopAndReport(res.data);
        });
    };

    $rootScope.stopAndReport = function(res) {
        event.preventDefault();
        alert(res.message);
    }

   /* function changeState(state) {
        $rootScope.state = state;
    }*/

    $rootScope.$on('$locationChangeStart', function(event, next, current) {
        var next_path = $location.path();
        //var next_route = $route.routes[next_path];

        if (next_path == '/' && AuthenticationService.isAuthenticated()) {
            event.preventDefault();
            changeState('/home');
            $location.path('/home');
        }

        if ($state.current.require_login) {
            if(!AuthenticationService.isAuthenticated()) {
                $rootScope.stopAndReport({'message' : "You must be logged in first"});
                changeState('/');
                $location.path('/');
            }
            else if (!AuthenticationService.isAuthorized($state.current.good_roles)) {
                $rootScope.stopAndReport({'message' : "You are not authorized to view this page : " + $rootScope.currentUserData.user.role.class + ", " + $rootScope.currentUserData.user.role.position});

                next_path = '/home';
                changeState(next_path);
                $location.path(next_path);
            } else {
                changeState(next_path);
                $location.path(next_path);
            }
        }

       //$state.reload();
    });
});