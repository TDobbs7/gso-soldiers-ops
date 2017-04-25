var app = angular.module('gso-soldiers-ops');

app.controller('TestCtrl', ['$scope', '$http',
    function($scope, $http) {
        $scope.init = function() {
            console.log("Hey!")
            return $http.put('/init/abilities')
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
            var credentials = {
                'email' : email,
                'password' : password
            };

            return UserService.Login(credentials).then(success,failed);
        }

        function success(res) {
            AuthenticationService.setCurrentUser(res.data);
            $rootScope.changeState('home');
            $location.path('/home');
        }

        function failed(res) {
            $rootScope.stopAndReport(res.data);
        }
    }
]).
controller('UserCtrl', ['$rootScope','$scope', ''
    function($rootScope, $scope) {
        $scope.user = $rootScope.currentUserData;
        function handleAbility(ability) {

        }
    }
]).
controller('Game_SchedCtrl', ['$scope',
    function($scope) {

    }
]).
controller('Train_SchedCtrl', ['$scope',
    function($scope) {

    }
]).
controller('Med_SchedCtrl', ['$scope', 'MedReqService', 'med_reqs'
    function($scope, MedReqService, med_reqs) {
        $scope.med_reqs = med_reqs;
    }
]).
controller('OpsCtrl', ['$scope',
    function($scope) {

    }
]).
controller('PlaysCtrl', ['$scope',
    function($scope) {

    }
]).
controller('TradesCtrl', ['$scope',
    function($scope) {

    }
]).
controller('ContractsCtrl', ['$scope',
    function($scope) {

    }
]);
