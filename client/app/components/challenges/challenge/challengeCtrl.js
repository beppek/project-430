/**
 * Challenge Controller
 * @author beppek
 *
 */

"use strict";

module.exports = angular.module("shutterSnappy")
    .controller("challengeCtrl", ["$scope", "$auth", "challengeService", "callout", "$state", "$stateParams", "$http", "imageService", "sortService", "socket",
        function($scope, $auth, challengeService, callout, $state, $stateParams, $http, imageService, sortService, socket) {

            var payload = $auth.getPayload();

            /**
             * Get the challenge
             * */
            challengeService.get($stateParams.title)
                .success(function(challenge) {
                    $scope.challenge = challenge;

                    //Get images
                    challengeService.getImages(challenge._id)
                        .success(function(res) {

                            $scope.images = sortService.byDate(res);

                        });

                })
                .error(function(err) {
                    callout("warning", "Something went wrong", err.message);
                });

            /**
             * Go to image
             * */
            $scope.toImage = function(image) {

                var imageId = encodeURIComponent(image._id);

                $state.go("image", {
                    challengeTitle: $stateParams.title,
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
             * Join challenge function
             * */
            $scope.joinChallenge = function() {

                var uriTitle = encodeURIComponent($scope.challenge.lcTitle);

                $state.go("joinChallenge", {
                    title: uriTitle
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
             * Vote for image
             * */
            $scope.imageVote = function(image) {

                image.stats.votes.push(payload.sub);

                imageService.vote({
                    imageId: image._id,
                    userId: payload.sub
                }).success(function(res) {
                    socket.emit("vote:image", {
                        id: image._id,
                        challenge: $scope.challenge._id,
                        score: res
                    });
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
                    socket.emit("unvote:image", {
                        id: image._id,
                        challenge: $scope.challenge._id,
                        score: res
                    });
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
                    challenge: $stateParams.title
                })
            };

            /**
             * Sort by votes
             * */
            $scope.sortByVotes = function() {
                $scope.images = sortService.byVotes($scope.images);
            };

            /**
             * Sort by date
             * */
            $scope.sortByDate = function() {
                $scope.images = sortService.byDate($scope.images);
            };

            /**
             * Deletes challenge
             * */
            $scope.deleteChallenge = function(challenge) {
                var reqObj = {
                    challengeId: challenge._id,
                    reqUserId: payload.sub,
                    creatorId: challenge.createdBy.createdById
                };

                challengeService.deleteChallenge(reqObj)
                    .success(function(res) {
                        $state.go("challenges");
                        callout("dark", "Gone!", res);
                    })
                    .error(function(err) {
                        callout("warning", "Something went wrong", err.message);
                    })
            };

            /**
             * Checks if current user is creator of challenge
             * */
            $scope.isCreator = function(challenge) {
                return challenge.createdBy.createdById === payload.sub;
            };

            /**
             * Go to Update Challenge
             * */
            $scope.updateChallenge = function(challenge) {
                $state.go("challenge-update", {
                    title: $stateParams.title
                });
            };

            /**
             * Real time update of scores
             * */
            socket.on("vote:challenge", function(data) {
                if (data.id === $scope.challenge._id) {
                    $scope.challenge.stats.votes = data.score;
                }
            });

            socket.on("unvote:challenge", function(data) {
                if (data.id === $scope.challenge._id) {
                    $scope.challenge.stats.votes = data.score;
                }
            });

            socket.on("vote:image", function(data) {

                $scope.images.forEach(function(image) {

                    if (data.id === image._id) {
                        image.stats.votes = data.score;
                    }

                });

            });

            socket.on("unvote:image", function(data) {

                $scope.images.forEach(function(image) {

                    if (data.id === image._id) {
                        image.stats.votes = data.score;
                    }

                });

            });

            socket.on("image:uploaded", function(data) {
                if (data.challenge === $scope.challenge.title) {
                    imageService.getImage(data.id)
                        .success(function(res) {
                            $scope.images.push(res);
                        });
                }
            });

            socket.on("image:deleted", function(data) {
                if (data.challenge === $scope.challenge.title) {
                    $scope.images = $scope.images.filter(function(image) {
                        return image._id !== data.imageId
                    })
                }
            });

        }]);
