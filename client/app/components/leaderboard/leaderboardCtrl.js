/**
 * Leaderboard Controller
 * @author beppek
 */

"use strict";

/**
 * Exports the controller
 * */
module.exports = angular.module("shutterSnappy")
    .controller("leaderboardCtrl", ["$scope", "$log", "$stateParams", "challengeService", "$state",
        function($scope, $log, $stateParams, challengeService, $state) {

            /**
             * Get the challenge
             * */
            challengeService.get($stateParams.challenge)
                .success(function(res) {
                    $scope.challenge = res;
                }).error(function(err) {

            });

            /**
             * Go to challenge
             * */
            $scope.toChallenge = function(challenge) {
                $state.go("challenge-id", {
                    id: challenge._id
                })
            };

            console.log($stateParams);

        }]);
