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
controller('LoginCtrl', ['$rootScope', '$scope', '$http', '$location', 'UserService', 'AuthenticationService',
    function($rootScope, $scope, $http, $location, UserService, AuthenticationService) {
        $scope.login = function(email, password) {
            console.log("Attempting log in for " + email);
            var credentials = {
                'email' : email,
                'password' : password
            };

            return UserService.Login(credentials).then(successLogin, failed);
        }

        function successLogin(res) {
            console.log(res.data.message);
            AuthenticationService.setCurrentUser(res.data);
            $rootScope.changeState('home');
            $location.path('/home');
        }

        function failed(res) {
            console.log(res.data.message);
            $rootScope.stopAndReport(res.data);
        }
    }
]).
controller('UserCtrl', ['$rootScope','$scope',
    function($rootScope, $scope) {
        $scope.user = $rootScope.currentUserData;
        function handleAbility(ability) {

        }
    }
]).
controller('Game_SchedCtrl', ['$scope', 
    function($scope) {
        
    }
]);