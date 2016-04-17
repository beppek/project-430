/**
 * Created by Beppe on 15/04/2016.
 */

"use strict";

var slideZapp = require("../../app/app.module.js");

slideZapp.config(function($routeProvider) {

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

slideZapp.service("nameService", function() {

    this.name = "";

    this.nameLength = function() {

        return this.name.length;

    }.bind;

});

slideZapp.controller("mainController", ["$scope", "$log", "nameService", function($scope, $log, nameService) {

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

slideZapp.controller("secondController", ["$scope", "$log", "nameService", function($scope, $log, nameService) {

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
