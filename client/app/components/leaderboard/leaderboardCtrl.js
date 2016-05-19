/**
 * Leaderboard Controller
 * @author beppek
 */

"use strict";

module.exports = angular.module("shutterSnappy")
    .controller("leaderboardCtrl", ["$scope", "$log", "$stateParams", "challengeService", "$state", "socket",
        function($scope, $log, $stateParams, challengeService, $state, socket) {

            /**
             * Get the challenge
             * */
            challengeService.get($stateParams.challenge)
                .success(function(res) {
                    $scope.challenge = res;

                    //Get the images and sort
                    challengeService.getImages($scope.challenge._id)
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

                })
                .error(function(err) {

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
             * Go to image
             * */
            $scope.toImage = function(image) {
                $state.go("image", {
                    challengeTitle: $stateParams.challenge,
                    imageId: image._id
                })
            };

            /**
             * Real time update of scores
             * */
            socket.on("vote:image", function(data) {
                if (data.challenge === $scope.challenge._id) {
                    challengeService.get($stateParams.challenge)
                        .success(function(res) {
                            $scope.challenge = res;

                            //Get the images and sort
                            challengeService.getImages($scope.challenge._id)
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

                        })
                        .error(function(err) {

                        });
                }
            });

            socket.on("unvote:image", function(data) {
                if (data.challenge === $scope.challenge._id) {
                    challengeService.get($stateParams.challenge)
                        .success(function(res) {
                            $scope.challenge = res;

                            //Get the images and sort
                            challengeService.getImages($scope.challenge._id)
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

                        })
                        .error(function(err) {

                        });
                }
            });

        }]);
