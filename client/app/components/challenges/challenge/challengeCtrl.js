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
    .controller("challengeCtrl", ["$scope", "$auth", "challengeService", "callout", "$state", "$stateParams", "$http",
        function($scope, $auth, challengeService, callout, $state, $stateParams, $http) {

            var challengeId = $stateParams.id;
            var payload = $auth.getPayload();

            /**
             * Get images for challenge
             * */
            $http.get("/challenge/" + challengeId)
                .success(function(res) {

                    return $scope.images = res;

                });

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
            $scope.hasVoted = function(challenge) {
                if (payload) {
                    if (challenge.stats.votes.indexOf(payload.sub) === -1) {
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
             * Go to Leaderboard
             * */
            $scope.gotoLeaderboard = function(challenge) {
                $state.go("leaderboard", {
                    challenge: challenge._id
                })
            }

        }]);
