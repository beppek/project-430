/**
 * Image Controller
 * @author beppek
 */
"use strict";

/**
 * Exports the controller
 * */
module.exports = angular.module("shutterSnappy")
    .controller("imageCtrl", ["$scope", "callout", "$state", "$stateParams", "$http", "imageService", "$auth", "challengeService",
        function($scope, callout, $state, $stateParams, $http, imageService, $auth, challengeService) {

            var challengeId = $stateParams.challengeId;
            var imageId = $stateParams.imageId;
            var payload = $auth.getPayload();

            /**
             * Get the image and info
             * */
            $http.get("/image/" + challengeId + "/" + imageId)
                .success(function(res) {

                    $scope.image = res;

                }).error(function(err) {
                    callout("warning", "Something went wrong", err.message);
            });

            /**
             * Get challenge
             * */
            challengeService.get(challengeId)
                .success(function(res) {
                    $scope.challenge = res;
                })
                .error(function(err) {

                });

            /**
             * Check if user has voted
             * */
            $scope.hasVoted = function(image) {
                if (payload) {
                    if (image.stats.votes.indexOf(payload.sub) === -1) {
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    return true;
                }
            };

            /**
             * Vote
             * */
            $scope.vote = function() {

                $scope.image.stats.votes.push(payload.sub);

                imageService.vote({
                    imageId: $scope.image._id,
                    userId: payload.sub
                }).success(function(res) {
                    $scope.image.stats.votes = res;
                }).error(function(err) {
                    callout("warning", "Something went wrong!", err.message);
                });

            };

            /**
             * Go back to challenge
             * */
            $scope.toChallenge = function(challenge) {

                var uriEncodedId = encodeURIComponent(challenge._id);

                $state.go("challenge-id", {
                    id: uriEncodedId
                })
            };

        }]);
