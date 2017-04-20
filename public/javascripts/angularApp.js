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
]);

// app.controller('UserCtrl', ['$scope', '$rootScope', '$location', 'USER_ROLES', 'AuthenticationService', 'UserService', 'EmailService',
//     function($scope, $rootScope, $location, USER_ROLES, AuthenticationService, UserService, EmailService) {
//         $scope.login = function(email, password) {
//             AuthenticationService.Login(email, password).then(successLogin, failed);
//         };

//         function successLogin(res) {
//             AuthenticationService.setCurrentUser(res.data);
//             $location.path('/home');
//         }

//         function failed(res) {
//             $rootScope.stopAndReport(res.data);
//         }

//         $scope.register = function(user) {
//             if (user.password !== user.password2) $rootScope.stopAndReport({'message' : "Your passwords didn't match!"});
//             else {
//                 delete user.password2;

//                 UserService.AddNewUser({"name" : user.fname + " " + user.lname, "email" : user.email, "password" : user.password})
//                     .then(function(res) {
//                         alert("You have registered!");
//                         $location.path('/');
//                     }, failed);
//             }
//         }
//     }
// ])
// .controller('JudgeCtrl', ['$scope', '$rootScope', '$route', '$location', 'EventService', 'UserService', 'AuthenticationService', 'USER_ROLES',
//     function($scope, $rootScope, $route, $location, EventService, UserService, AuthenticationService, USER_ROLES) {
//         $scope.judgeForm = {};
//         $scope.scores = [];
//         $scope.other_scores = {};
//         $scope.isSubmitted = false;

//         $scope.updateScore = function(index, criterion) {
//             var value = this.crits[index];
//             document.getElementById('crit-' +index).innerHTML = criterion + ": " + value;
//             $scope.scores[index] = parseInt(value);
//             $scope.other_scores[criterion] = parseInt(value);
//         }

//         $scope.submitJudgeForm = function(event, judgeForm) {
//             $scope.isSubmitted = true;
//             var total = 0;

//             $scope.scores.forEach(function(err, ind) {
//                 total += $scope.scores[ind];
//             });

//             var data = {
//                 "score_doc" : {
//                         "judge_name" : $rootScope.currentUserData.user.name,
//                         "judge_email" : $rootScope.currentUserData.user.email,
//                         "team_name": judgeForm.team,
//                         "scores" : $scope.other_scores,
//                         "total_score": total
//                     }
//             };

//             EventService.addScoreForm(data, event).then(function(res) {
//                 alert("Your scores have been submitted for " + data.score_doc.team_name +"!");
//                 //$location.path('/home');
//                 $route.reload();
//             }, function(res) {
//                 $rootScope.stopAndReport(res.data);
//             });
//         }

//         $scope.verifyEventCode = function(code) {
//             var credentials = {
//                 email: $rootScope.currentUserData.user.email,
//                 evt_code: code
//             };

//             EventService.verifyEventCode(credentials).then(function(res) {
//                 window.localStorage.setItem("current_evt_code", JSON.stringify(res.data.event.evt_id));

//                 var changed = false;
//                 if ($rootScope.currentUserData.user.user_role.indexOf(USER_ROLES.judge) < 0) {
//                     $rootScope.currentUserData.user.user_role.push(USER_ROLES.judge);
//                     changed = true;
//                 }

//                 if ($rootScope.currentUserData.user.events_judging.indexOf(res.data.event.evt_id) < 0) {
//                     $rootScope.currentUserData.user.events_judging.push(res.data.event.evt_id);
//                     changed = true;
//                 }

//                 if (changed) {
//                     AuthenticationService.setCurrentUser($rootScope.currentUserData).then(function(res) {
//                         UserService.UpdateUser($rootScope.currentUserData.user).then(function(res) {
//                         }, function(res) {
//                             $rootScope.stopAndReport(res.data);
//                         });
//                     }, function(res) {
//                        $rootScope.stopAndReport(res.data);
//                     });
//                 }

//                 alert("You can now judge this event: " + res.data.event.name);
//                 $location.path('/judge/event_form');

//             }, function(res) {
//                 $rootScope.stopAndReport(res.data);
//             });
//         }

//         $scope.populateForm = function() {
//             var evt_code = JSON.parse(window.localStorage.getItem("current_evt_code"));

//             EventService.getEvent(evt_code).then(function(res) {
//                 $rootScope.event = res.data.event;
//             }, function(res) {
//                 $rootScope.stopAndReport(res.data);
//             });
//         }
//     }
// ])
// .controller('EventCtrl', ['$scope', '$rootScope', '$compile', '$location', 'UserService', 'EventService', 'EmailService', 'USER_ROLES',
//     function($scope, $rootScope, $compile, $location, UserService, EventService, EmailService, USER_ROLES) {
//         $scope.number_of_judges = 1;
//         $scope.number_of_criteria = 1;
//         $scope.isSubmitted = false;

//         $scope.addEvent = function(event) {
//             $scope.isSubmitted = true;
//             event.judges = [];
//             event.criteria = [];

//             event.evt_id = Math.random().toString(36).substring(2, 9);
//             event.event_host = $rootScope.currentUserData.user.email;

//             var judgesHTML = $('#judges')[0].children;

//             for (var i = 0; i < judgesHTML.length; i++) {
//                 var judge = {};

//                 judge.name = judgesHTML[i].children.name.value;
//                 judge.address = judgesHTML[i].children.email.value;

//                 event.judges.push(judge);
//             }

//             var criteriaHTML = $('#jcrit')[0].children;

//             for (var i = 0; i < criteriaHTML.length; i++) {
//                 var criterion = criteriaHTML[i].children.criterion.value;

//                 event.criteria.push(criterion);
//             }

//             event.max_scale = $('input[name="tblebttn"]:checked').val();

//             EventService.addEvent(event).then(function(res) {
//                 var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//                 var message = "Hello,\n\nWe would like to invite you to join this competition, " + event.name +", as a judge" +
//                               " or as an honored guest. The contest will be held at " + event.location + " on " +
//                               months[event.start_date.getMonth()] + " " + event.start_date.getDate() + ", " +
//                               event.start_date.getFullYear() + " starting at " + formatAMPM(event.start_date) + ". We sincerely " +
//                               "hope that you are available to attend. \n\nGo to scored.ncat.edu to register. You must be " +
//                               "connected to an NCAT network in order to use the website.\n\nWhen registering for this " +
//                               "competition, please use your current destination email as the username and create a "+
//                               "password. After logging in, use the event code provided below to get to the event.\n\n" +
//                               "Event Code: " + event.evt_id + "\n\nAlso, attached is a criteria page. We look forward to " +
//                               "hearing from you soon.\n\nThank you,\n\nScored! Administration";
//                 $rootScope.sendEmail("contactus.scored@gmail.com", event.judges, "Judging!", message);

//                 var changed = false;
//                 if ($rootScope.currentUserData.user.user_role.indexOf(USER_ROLES.evt_admin) < 0) {
//                     $rootScope.currentUserData.user.user_role.push(USER_ROLES.evt_admin);
//                     changed = true;
//                 }

//                 if ($rootScope.currentUserData.user.events_hosting.indexOf(res.data.event.evt_id) < 0) {
//                     $rootScope.currentUserData.user.events_hosting.push(res.data.event.evt_id);
//                     changed = true;
//                 }

//                 if (changed) {
//                     AuthenticationService.setCurrentUser($rootScope.currentUserData).then(function(res) {
//                         UserService.UpdateUser($rootScope.currentUserData.user).then(function(res) {
//                         }, function(res) {
//                             $rootScope.stopAndReport(res.data);
//                         });
//                     }, function(res) {
//                        $rootScope.stopAndReport(res.data);
//                     });
//                 }
//             }, function(res){
//                 $rootScope.stopAndReport(res.data);
//             });
//         }

//         function formatAMPM(date) {
//             var hours = date.getHours();
//             var minutes = date.getMinutes();
//             var ampm = hours >= 12 ? 'PM' : 'AM';
//             hours = hours % 12;
//             hours = hours ? hours : 12; // the hour '0' should be '12'
//             minutes = minutes < 10 ? '0'+minutes : minutes;
//             var strTime = hours + ':' + minutes + ' ' + ampm;
//             return strTime;
//         }

//         $scope.addJudge = function(evt) {
//             evt.preventDefault();

//             $scope.number_of_judges++;

//             var el = document.createElement('div');
//             var divIDName = 'judge-' + $scope.number_of_judges;
//             el.setAttribute('id', divIDName);
//             el.setAttribute('class', 'form-group');
//             el.innerHTML = '<button data-ng-click="removeJudge($event,' + $scope.number_of_judges + ');" class="btn btn-info">-</button> <input type="text" placeholder="full name" name="name" class="input" required> <input type="email" placeholder="youremail@email.com" name="email" class="input" required>';

//             var temp = $compile(el)($scope);
//             angular.element(document.querySelector('#judges')).append(temp);
//         }

//         $scope.removeJudge = function(evt, num) {
//             evt.preventDefault();

//             $scope.number_of_judges--;

//             var j = document.getElementById('judges');
//             var delDiv = document.getElementById('judge-' + num);
//             j.removeChild(delDiv);
//         }

//         function failed(res) {
//             $rootScope.stopAndReport(res.data);
//         }

//         $scope.addCriteria= function(evt){
//             evt.preventDefault();

//             $scope.number_of_criteria++;
//             var el = document.createElement('div');
//             var divIDName = 'jcrit-' + $scope.number_of_criteria;
//             el.setAttribute('id', divIDName);
//             el.setAttribute('class', 'form-group');
//             el.innerHTML = '<button data-ng-click="removeCriteria($event,' + $scope.number_of_criteria + ');" class="btn btn-info">-</button> <input type="text" placeholder="Criteria" name="criterion" class="input" required>';

//             var temp = $compile(el)($scope);
//             angular.element(document.querySelector('#jcrit')).append(temp);
//         }

//         $scope.removeCriteria = function(evt, num) {
//             evt.preventDefault();

//             $scope.number_of_criteria--;

//             var j = document.getElementById('jcrit');
//             var delDiv = document.getElementById('jcrit-' + num);
//             j.removeChild(delDiv);
//         }

//         $scope.checkDate = function(startDate,endDate) {
//             var curDate = new Date();

//             if(new Date(startDate) > new Date(endDate)){
//                alert ("End date should not be before Start Date.");
//                $('#end_date').val("");
//             }
//             if(new Date(startDate) < curDate){
//                alert ("Start date should not be before today.");
//                $('#start_date').val("");
//             }
//         };
//     }
//]);