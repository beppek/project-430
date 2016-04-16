/**
 * Created by Beppe on 15/04/2016.
 */

"use strict";

var $ = require("jquery");
var ng = require("angular");
var ngRoute = require("angular-route");

var myApp = ng.module("myApp", [ngRoute]);

myApp.config(function($routeProvider) {

    $routeProvider

        .when("/", {
            templateUrl: "views/pages/main.html",
            controller: "mainController"
        })
        .when("/second", {
            templateUrl: "views/pages/second.html",
            controller: "secondController"
        })

});

myApp.service("nameService", function() {

    this.name = "";

    this.nameLength = function() {

        return this.name.length;

    }.bind;

});

myApp.controller("mainController", ["$scope", "$log", "nameService", function($scope, $log, nameService) {

    $scope.name = nameService.name;

    $scope.$watch("name", function() {
        nameService.name = $scope.name;
    });

    $scope.rules = [
        {rulename: "Must be 5 characters"},
        {rulename: "Must not be used elsewhere"},
        {rulename: "Must be cool"}
    ];

}]);

myApp.controller("secondController", ["$scope", "$log", "nameService", function($scope, $log, nameService) {

    $scope.name = nameService.name;

    $scope.$watch("name", function() {
        nameService.name = $scope.name;
    });

    $scope.rules = [
        {rulename: "Must be 5 characters"},
        {rulename: "Must not be used elsewhere"},
        {rulename: "Must be cool"}
    ];

}]);
