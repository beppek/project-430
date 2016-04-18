/**
 *
 * This is the controller for the homepage
 *
 * @author: beppek
 *
 */

"use strict";

/**
 * Exports the controller
 * */
module.exports = angular.module("slideZapp").controller("homeController", ["$scope", "$log", "nameService", function($scope, $log, nameService) {

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
