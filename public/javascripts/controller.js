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
controller('UserCtrl', ['$rootScope','$scope',
    function($rootScope, $scope) {
        $scope.user = $rootScope.currentUserData;

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
]).
controller('MedReqsCtrl', ['$scope','$rootScope','$location', 'MedReqService', 'med_reqs', 'med_staff', 'players',
    function($rootScope, $scope, $location, MedReqService, med_reqs, med_staff, players) {
        $scope.med_reqs = med_reqs;
        $scope.med_staff = med_staff;
        $scope.players = players;

        $scope.makeRequest = function() {
            return MedReqService.AddNewMedReq(/*medical req*/).then(success, failed);
        }
        $scope.postReq = function(staff, request) {
            var credentials = {
                'staff' : staff,
                'player' : $rootScope.currentUserData.email,
                'request' : request
            };
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
