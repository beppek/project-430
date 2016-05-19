/**
 * Challenges Controller
 * @author beppek
 */

"use strict";

module.exports = angular.module("shutterSnappy")
    .controller("challengesCtrl", ["$scope", "$auth", "challenges", "callout", "$state", "challengeService", "sortService", "socket",
        function($scope, $auth, challenges, callout, $state, challengeService, sortService, socket) {

            /**
             * Check if authenticated
             * */
            $scope.isAuthenticated = function() {
                return $auth.isAuthenticated();
            };

            var payload = $auth.getPayload();

            /**
             * Gets all challenges
             * */
            challenges.listAll()
                .success(function(res) {
                    $scope.challenges = sortService.byVotes(res);
                })
                .error(function(err) {
                    callout("warning", "Something went wrong", err.message);
                });

            /**
             * Go to challenge
             * */
            $scope.toChallenge = function(challenge) {

                var uriTitle = encodeURIComponent(challenge.lcTitle);
                $state.go("challenge-title", {
                    title: uriTitle
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
                        socket.emit("vote:challenge", {
                            id: challenge._id,
                            score: res
                        });
                        challenge.stats.votes = res;
                    }).error(function(err) {
                        callout("warning", "Something went wrong!", err.message);
                    });
                }

            };

            /**
             * Unvote
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
                        socket.emit("unvote:challenge", {
                            id: challenge._id,
                            score: res
                        });
                        challenge.stats.votes = res;
                    }).error(function(err) {
                        callout("warning", "Something went wrong!", err.message);
                    });
                }

            };

            /**
             * Sort by votes
             * */
            $scope.sortByVotes = function() {
                $scope.challenges = sortService.byVotes($scope.challenges);
            };

            /**
             * Sort by contributions
             * */
            $scope.sortByContributions = function() {
                $scope.challenges = sortService.byContributions($scope.challenges);
            };

            /**
             * Sort by date
             * */
            $scope.sortByDate = function() {
                $scope.challenges = sortService.byDate($scope.challenges);
            };

            /**
             * Real time update of scores
             * */
            socket.on("vote:challenge", function(data) {

                $scope.challenges.forEach(function(challenge) {

                    if (data.id === challenge._id) {
                        challenge.stats.votes = data.score;
                    }

                });

            });

            socket.on("unvote:challenge", function(data) {

                $scope.challenges.forEach(function(challenge) {

                    if (data.id === challenge._id) {
                        challenge.stats.votes = data.score;
                    }

                });

            });

        }]);
