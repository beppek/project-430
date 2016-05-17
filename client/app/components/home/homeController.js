/**
 * This is the controller for the homepage
 * @author: beppek
 */

"use strict";

//TODO: Actually do something useful
module.exports = angular.module("shutterSnappy")
    .controller("homeController", ["$scope", "$log", "nameService", "challenges", "$state",
        function($scope, $log, nameService, challenges, $state) {

            $scope.name = nameService.name;

            challenges.listAll()
                .success(function(res) {
                    $scope.challenges = res;
                })
                .error(function(err) {
                    callout("warning", "Something went wrong", err.message);
                });

            $scope.toChallenge = function(challenge) {

                var uriTitle = encodeURIComponent(challenge.lcTitle);

                $state.go("challenge-title", {
                    title: uriTitle
                })
            };

            $scope.$watch("name", function() {
                nameService.name = $scope.name;
            });

            $scope.rules = [
                {rulename: "Must be 5 characters"},
                {rulename: "Must not be used elsewhere"},
                {rulename: "Must be cool"}
            ];

        }]);
