var app = angular.module('gso-soldiers-ops');

app.factory('UserService', ['$http', '$rootScope',
    function($http, $rootScope) {
        var service = {};

        service.GetAllUsers = GetAllUsers;
        service.GetByEmail = GetByEmail;
        service.AddNewUser = AddNewUser;
        service.UpdateUser = UpdateUser;
        service.Login = Login;

        return service;

        function GetAllUsers() {
            return $http.get('/users').then(handleSuccess, handleError('Error getting all users'));
        }

        function GetByEmail(email) {
            return $http.get('/users/email/' + email).then(handleSuccess, handleError('Error getting user by username'));
        }

        function AddNewUser(user) {
            return $http.post('/users', user).then(handleSuccess, handleError('Error creating user'));
        }

        function Login(credentials) {
            return $http.post('/users/login', credentials).then(handleSuccess, handleError('Invalid email and/or password'));
        }

        function UpdateUser(user) {
            return $http.put('/users/' + user.email, user).then(handleSuccess, handleError('Error updating user'));
        }

        // private functions

        function handleSuccess(res) {
            return {"data" : res.data};
        }

        function handleError(error) {
            return {"message" : error};
        }
    }
]).
factory('AuthenticationService', ['$rootScope', 'UserService',
    function($rootScope, UserService) {
        var service = {};

        service.isAuthenticated = isAuthenticated;
        service.isAuthorized = isAuthorized;
        service.setCurrentUser = setCurrentUser;
        service.clearCurrentUser = clearCurrentUser;

        return service;

        function isAuthenticated() {
            return ($rootScope.currentUserData !== null);
        }

        function setCurrentUser(data) {
            window.localStorage.setItem("user", JSON.stringify(data));
            $rootScope.currentUserData = data;
        }

        function clearCurrentUser() {
            window.localStorage.clear();
            $rootScope.currentUserData = null;
            $rootScope.requestedPerson = null;
            $rootScope.requestedUser = null;
        }

        function isAuthorized(good_roles) {
            //return (good_roles.indexOf($rootScope.currentUserData.user.user_role) !== -1);

            if (good_roles[0] === "all") return true;

            for(var index in $rootScope.currentUserData.user.user_role) {
                if (good_roles.indexOf($rootScope.currentUserData.user.user_role[index]) !== -1) return true;
            }

            return false;
        }

        function handleSuccess(res) {
            return {"data" : res.data};
        }

        function handleError(error) {
            return {"message" : error};
        }
    }
]).
factory('OpsService', ['$http', '$rootScope',
    function($http, $rootScope) {
        var service = {};

        service.GetAllOps = GetAllOps;
        service.GetOpsByEmail = GetOpsByEmail;
        service.AddNewOp = AddNewOp;
        service.UpdateOp = UpdateOp;

        return service;

        function GetAllOps() {
            return $http.get('/ops').then(handleSuccess, handleError('Error getting all operations'));
        }

        function GetOpsByEmail(email) {
            return $http.get('/ops/email/' + email).then(handleSuccess, handleError('Error getting operations by username'));
        }

        function AddNewOp(op) {
            return $http.post('/ops', op).then(handleSuccess, handleError('Error creating operation'));
        }

        function UpdateOp(op) {
            return $http.put('/ops/' + op._id, op).then(handleSuccess, handleError('Error updating operation'));
        }

        // private functions

        function handleSuccess(res) {
            return {"data" : res.data};
        }

        function handleError(error) {
            return {"message" : error};
        }
    }
]);