var app = angular.module('gso-soldiers-ops');

app.factory('UserService', ['$http', 'OpsService',
    function($http, OpsService) {
        var service = {};

        service.GetAllUsers = GetAllUsers;
        service.GetByEmail = GetByEmail;
        service.AddNewUser = AddNewUser;
        service.UpdateUser = UpdateUser;
        service.DeleteUser = DeleteUser;
        service.Login = Login;

        return service;

        function GetAllUsers() {
            return $http.get('/users').then(handleSuccess, handleError);
        }

        function GetByEmail(email) {
            return $http.get('/users/' + email).then(handleSuccess, handleError);
        }

        function AddNewUser(user) {
            return $http.post('/users', user).then(handleSuccess, handleError);
        }

        function Login(credentials) {
            return $http.post('/users/login', credentials).then(handleSuccess, handleError);
        }

        function UpdateUser(user) {
            return $http.put('/users', user).then(handleSuccess, handleError);
        }

        function DeleteUser(user) {
            return $http.delete('/users/' + user.email, user).then(handleSuccess, handleError);
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
factory('AuthenticationService', ['$rootScope',
    function($rootScope) {
        var service = {};

        service.isAuthenticated = isAuthenticated;
        service.isAuthorized = isAuthorized;
        service.setCurrentUser = setCurrentUser;
        service.clearCurrentUser = clearCurrentUser;

        return service;

        function isAuthenticated() {
            return ($rootScope.currentUserData !== null);
        }

        function setCurrentUser(res) {
            window.localStorage.setItem("user", JSON.stringify(res.data.user));
            $rootScope.currentUserData = res.data.user;
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
    }
]).
factory('OpsService', ['$http',
    function($http) {
        var service = {};

        service.GetAllOps = GetAllOps;
        service.GetOpsByEmail = GetOpsByEmail;
        service.AddNewOp = AddNewOp;
        service.UpdateOp = UpdateOp;
        service.DeleteOp = DeleteOp;

        return service;

        function GetAllOps() {
            return $http.get('/ops').then(handleSuccess, handleError);
        }

        function GetOpsByEmail(email) {
            return $http.get('/ops/email/' + email).then(handleSuccess, handleError);
        }

        function GetOpsByType(type) {
            return $http.get('/ops/type/' + type).then(handleSuccess, handleError);
        }

        function AddNewOp(op) {
            return $http.post('/ops', op).then(handleSuccess, handleError);
        }

        function UpdateOp(op) {
            return $http.put('/ops/' + op._id, op).then(handleSuccess, handleError);
        }

        function DeleteOp(id) {
            return $http.delete('/ops/' + op._id).then(handleSuccess, handleError);
        }

        // private functions

        function handleSuccess(res) {
            return {"data" : res.data};
        }

        function handleError(error) {
            return {"message" : error.message};
        }
    }
]).
factory('MedReqService', ['$http',
    function($http) {
        var service = {};

        service.GetAllMedReqs = GetAllMedReqs;
        service.GetMedReqsByEmail = GetMedReqsByEmail;
        service.AddNewMedReq = AddNewMedReq;
        service.UpdateMedReq = UpdateMedReq;
        service.DeleteMedReq = DeleteMedReq;

        return service;

        function GetAllMedReqs() {
            return $http.get('/med_reqs').then(handleSuccess, handleError);
        }

        function GetMedReqsByEmail(email) {
            return $http.get('/med_reqs/' + email).then(handleSuccess, handleError);
        }

        function AddNewMedReq(med_req) {
            return $http.post('/med_reqs', med_req).then(handleSuccess, handleError);
        }

        function UpdateMedReq(med_req) {
            return $http.put('/med_reqs/' + med_req._id, med_req).then(handleSuccess, handleError);
        }

        function DeleteMedReq(id) {
            return $http.delete('/med_reqs/' + med_req._id).then(handleSuccess, handleError);
        }

        // private functions

        function handleSuccess(res) {
            return {"data" : res.data};
        }

        function handleError(error) {
            return {"message" : error.message};
        }
    }
]);
