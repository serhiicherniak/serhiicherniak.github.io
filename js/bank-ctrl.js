'use strict';
angular.module('myApp')
    .controller('bankCtrl',  function ($scope, $rootScope, $cookies) {
        $scope.pdv = 0.2;
        $scope.akciz = 0.05;
        $scope.normaAmortizaciya = 0.06;
        $rootScope.currentUser = $cookies.getObject('currentUser');

        $scope.countVal = function (dohid) {
            $scope.valVitratu = dohid.platezi + dohid.workers + dohid.aktuvu;
            $scope.valDohid = dohid.all - dohid.all*$scope.pdv- dohid.all*$scope.akciz;
            $scope.valVitratuPributku = $scope.valVitratu - dohid.prurist;
            $scope.amortizaciya = $scope.normaAmortizaciya * dohid.all;
            $scope.opodatkovanyyPributok = $scope.valDohid - $scope.valVitratuPributku - $scope.amortizaciya;
            $scope.podatokPributok = $scope.opodatkovanyyPributok * 30 / 100;
            $scope.podatok = $scope.podatokPributok - dohid.pilgi;

        };

        $scope.login = function (loginUser) {
            var users = $cookies.getObject('users');
            if(!users){
                users = [];
            };
            var user = $scope.findUserByName(users, loginUser.email);
            if (user && loginUser.password == user.password){
                $cookies.putObject('currentUser', user);
                $rootScope.currentUser = user;
                $scope.loginError = 0;
                var pathname = window.location.pathname.split('/');
                pathname.pop();
                pathname.push('index_main.html');
                window.location.hash='';
                window.location.pathname=pathname.join('/');
            } else{
                $scope.loginError = "User don't found or password is incorrect :(";
            }
        };

        $scope.logout = function () {
            $cookies.remove('currentUser');
            $rootScope.currentUser = {};
        };

        $scope.register = function (user) {
            var users = $cookies.getObject('users');
            if(!users){
                users = [];
            };
            users.push(user);
            $cookies.putObject('users', users);
            $scope.login(user);
        };

        $scope.findUserByName = function (users, email){
            var user;
            users.forEach(function(item, index){
                if(item.email == email){
                    user = item;
                }
            });
            return user;
        };

    });