'use strict';
angular.module("myApp", ["ngRoute",'ngCookies', 'htmlToPdfSave'])
    .config( function ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl : "index.html"
            })
            .when("/calendar", {
                templateUrl : "calendar.html"
            })
            .when("/login", {
                templateUrl : "login.html"
            });
    });