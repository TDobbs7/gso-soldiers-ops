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
controller('UserCtrl', ['$rootScope','$scope', 'abilities',
    function($rootScope, $scope, abilities) {
        $scope.user = $rootScope.currentUserData;
        $scope.user.abilities = abilities.abilities;

        function getUserEmail() {
            return $scope.user.email;
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
controller('Med_SchedCtrl', ['$rootScope','$location','$scope', 'MedReqService', 'med_reqs',
    function($rootScope, $location, $scope, MedReqService, med_reqs) {
        $scope.med_reqs = med_reqs;
        $scope.removeIssue = function(id){
          return MedReqService.DeleteMedReq(id).then(success,failed);
          //alert(request);
        }
        function success(res) {
            //AuthenticationService.setCurrentUser(res.data);
            alert("The request has been resolved!");
            $rootScope.changeState('home');
            $location.path('/home');
        }

      function failed(res) {
          $rootScope.stopAndReport(res.data);
      }
    }
]).
controller('OpsCtrl', ['$scope','$rootScope','$location',
    function( $scope, $rootScope, $location) {

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
controller('ContractsCtrl', ['$scope', 'ContractsService', 'contracts',
    function($scope, ContractsService, contracts) {
        $scope.contracts = contracts;
    }
]).
controller('MedReqsCtrl', ['$scope','$rootScope','$location', 'MedReqService', 'med_staff', 'players',
    function($rootScope, $scope, $location, MedReqService, med_staff, players) {
        $scope.med_staff = med_staff;
        $scope.players = players;

        $scope.postReq = function(player, staff, request) {
            var credentials = {};

            credentials.request = request;

            if (typeof player !== 'undefined' && player !== null) credentials.player = player;
            else credentials.player = $rootScope.currentUserData.email;

            credentials.staff = staff;

            return MedReqService.AddNewMedReq(credentials).then(success,failed);
          }
          function success(res) {
              //AuthenticationService.setCurrentUser(res.data);
              alert("Your request has been posted!");
              $rootScope.changeState('home');
              $location.path('/home');
          }

        function failed(res) {
            $rootScope.stopAndReport(res.data);
        }
    }
]).
controller('MedRepsCtrl', ['$scope',
    function($scope) {

    }
]);
