/**
 *
 * This is the starting point of the Client side application
 *
 * @author: beppek
 * @version: 1.0.0
 *
 */

"use strict";

//TODO: Delete variable and only require?
// LOAD SETUP MODULE
var slideZapp = require("../../app/app.module.js");

// LOAD ROUTES
require("../../app/app.routes.js");

// LOAD SHARED
require("../../app/shared/services/nameService");

// LOAD CONTROLLERS
// HOME
require("../../app/components/home/homeController");

// LEADERBOARD
require("../../app/components/leaderboard/leaderboardController");

// DASHBOARD
require("../../app/components/dashboard/dashboardController");

// CHALLENGES
require("../../app/components/challenges/challengesController");

//TODO: Delete this controller
/**
 * Just a test controller
 * */
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
