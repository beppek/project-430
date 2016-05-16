/**
 * Challenge Controller
 * @author beppek
 *
 */

"use strict";

/**
 * Exports the controller
 * */
module.exports = angular.module("shutterSnappy")
    .controller("challengeCtrl", ["$scope", "$auth", "challengeService", "callout", "$state", "$stateParams", "$http", "imageService",
        function($scope, $auth, challengeService, callout, $state, $stateParams, $http, imageService) {

            var challengeId = $stateParams.id;
            var payload = $auth.getPayload();

            /**
             * Get images for challenge
             * */
            $http.get("/challenge/" + challengeId)
                .success(function(res) {

                    return $scope.images = res;

                });

            /**
             * Go to image
             * */
            $scope.toImage = function(image) {

                var imageId = encodeURIComponent(image._id);

                $state.go("image", {
                    challengeId: challengeId,
                    imageId: imageId
                })
            };

            /**
             * Check if authenticated
             * */
            $scope.isAuthenticated = function() {
                return $auth.isAuthenticated();
            };

            /**
             * Get the user
             * */
            $scope.getUser = function() {
                var payload = $auth.getPayload();
                $scope.userId = payload.sub;
            };

            /**
             * Get the challenge
             * */
            challengeService.get(decodeURIComponent($stateParams.id))
                .success(function(challenge) {

                    $scope.challenge = challenge;
                })
                .error(function(err) {
                    callout("warning", "Something went wrong", err.message);
                });

            /**
             * Join challenge function
             * */
            $scope.joinChallenge = function() {
                $state.go("joinChallenge", {
                    id: $stateParams.id
                })
            };

            /**
             * Check if user has voted
             * */
            $scope.hasVoted = function(item) {
                if (payload) {
                    if (item.stats.votes.indexOf(payload.sub) === -1) {
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    return true;
                }

            };

            /**
             * Vote for challenge
             * */
            $scope.vote = function(challenge) {
                if (payload) {
                    challenge.stats.votes.push(payload.sub);

                    challengeService.vote({
                        challengeId: challenge._id,
                        userId: payload.sub
                    }).success(function(res) {
                        challenge.stats.votes = res;
                    }).error(function(err) {
                        callout("warning", "Something went wrong!", err.message);
                    });
                }

            };

            /**
             * Unvote for challenge
             * */
            $scope.unVote = function(challenge) {
                if (payload) {
                    var i = challenge.stats.votes.indexOf(payload.sub);

                    if (i > -1) {
                        challenge.stats.votes.splice(i, 1);
                    }

                    challengeService.unVote({
                        challengeId: challenge._id,
                        userId: payload.sub
                    }).success(function(res) {
                        challenge.stats.votes = res;
                    }).error(function(err) {
                        callout("warning", "Something went wrong!", err.message);
                    });
                }

            };

            /**
             * Vote for image
             * */
            $scope.imageVote = function(image) {

                image.stats.votes.push(payload.sub);

                imageService.vote({
                    imageId: image._id,
                    userId: payload.sub
                }).success(function(res) {
                    image.stats.votes = res;
                }).error(function(err) {
                    callout("warning", "Something went wrong!", err.message);
                });

            };
            /**
             * Unvote for image
             * */
            $scope.imageUnVote = function(image) {

                var i = image.stats.votes.indexOf(payload.sub);

                if (i > -1) {
                    image.stats.votes.splice(i, 1);
                }

                imageService.unVote({
                    imageId: image._id,
                    userId: payload.sub
                }).success(function(res) {
                    image.stats.votes = res;
                }).error(function(err) {
                    callout("warning", "Something went wrong!", err.message);
                });

            };

            /**
             * Go to Leaderboard
             * */
            $scope.gotoLeaderboard = function(challenge) {
                $state.go("leaderboard", {
                    challenge: challenge._id
                })
            }

        }]);
