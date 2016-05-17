/**
 * Leaderboard Controller
 * @author beppek
 */

"use strict";

module.exports = angular.module("shutterSnappy")
    .controller("leaderboardCtrl", ["$scope", "$log", "$stateParams", "challengeService", "$state",
        function($scope, $log, $stateParams, challengeService, $state) {

            /**
             * Get the challenge
             * */
            challengeService.get($stateParams.challenge)
                .success(function(res) {
                    $scope.challenge = res;
                })
                .error(function(err) {

                });

            /**
             * Get images for challenge and sorts after vote count
             * */
            challengeService.getImages($stateParams.challenge)
                .success(function(res) {

                    var images = res;

                    images.sort(function(a, b) {
                        if (a.stats.votes.length > b.stats.votes.length) {
                            return -1;
                        }

                        if (a.stats.votes.length < b.stats.votes.length) {
                            return 1;
                        }

                        return 0
                    });

                    $scope.top10 = images.slice(0, 10);

                });

            /**
             * Go to challenge
             * */
            $scope.toChallenge = function(challenge) {
                $state.go("challenge-id", {
                    id: challenge._id
                })
            };

            /**
             * Go to image
             * */
            $scope.toImage = function(image) {
                $state.go("image", {
                    challengeId: $stateParams.challenge,
                    imageId: image._id
                })
            }

        }]);
