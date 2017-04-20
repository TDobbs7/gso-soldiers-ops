var app = angular.module('gso-soldiers-ops');

app.controller('TestCtrl', ['$scope', '$http', 
    function($scope, $http) {
        $scope.init = function() {
            console.log("Hey!")
            return $http.put('/init/pass')
                .success(function(res){
                    console.log("yay!");
                }).error(function(err) {
                    console.error(err);
                    console.log("Ugggghhh!");
                });
        }
    }
]).
controller('LoginCtrl', ['$rootScope', '$scope', '$http', '$location', 'AuthenticationService',
    function($rootScope, $scope, $http, $location, AuthenticationService) {
        $scope.login = function(email, password) {
            console.log("Attempting log in for " + email);
            var credentials = {
                'email' : email,
                'password' : password
            };

            return $http.post('/users/login', credentials).then(successLogin, failed);
        }

        function successLogin(res) {
            console.log("Log in Successful");
            AuthenticationService.setCurrentUser(res.data);
            $location.path('/home');
        }

        function failed(res) {
            $rootScope.stopAndReport(res.data);
        }
    }
]).
controller('UserCtrl', ['$rootScope','$scope',
    function($rootScope, $scope) {
        $scope.user = $rootScope.currentUserData.user;
        function handleOperation(ability) {

        }
    }
]).
controller('Game_SchedCtrl', ['$scope', 
    function($scope) {
        
    }
]);