/**
 * Image Controller
 * @author beppek
 */
"use strict";

module.exports = angular.module("shutterSnappy")
    .controller("imageCtrl", ["$scope", "callout", "$state", "$stateParams", "$http", "imageService", "$auth", "challengeService", "socket", "$rootScope",
        function($scope, callout, $state, $stateParams, $http, imageService, $auth, challengeService, socket, $rootScope) {

            var challengeTitle = $stateParams.challengeTitle;
            var imageId = $stateParams.imageId;
            var payload = $auth.getPayload();

            /**
             * Check if user is authenticated
             * */
            $scope.isAuthenticated = function() {
                return $auth.isAuthenticated();
            };

            /**
             * Get the image and info
             * */
            imageService.getImage(imageId)
                .success(function(res) {

                    $scope.image = res;

                    var dateCreated = new Date($scope.image.dateCreated);

                    $scope.image.dateCreated = dateCreated.toDateString();

                    $rootScope.image = $scope.image;

                })
                .error(function(err) {
                    callout("dark", "Something went wrong", err.message);
                    $state.go("challenge-title", {
                        title: challengeTitle
                    })
                });

            /**
             * Get challenge
             * */
            challengeService.get(challengeTitle)
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
                    socket.emit("vote:image", {
                        id: $scope.image._id,
                        score: res
                    });
                    $scope.image.stats.votes = res;
                }).error(function(err) {
                    callout("warning", "Something went wrong!", err.message);
                });

            };
            /**
             * Unvote
             * */
            $scope.unVote = function() {

                var i = $scope.image.stats.votes.indexOf(payload.sub);

                if (i > -1) {
                    $scope.image.stats.votes.splice(i, 1);
                }

                imageService.unVote({
                    imageId: $scope.image._id,
                    userId: payload.sub
                }).success(function(res) {
                    socket.emit("unvote:image", {
                        id: $scope.image._id,
                        score: res
                    });
                    $scope.image.stats.votes = res;
                }).error(function(err) {
                    callout("warning", "Something went wrong!", err.message);
                });

            };

            /**
             * Go back to challenge
             * */
            $scope.toChallenge = function(challenge) {

                var uriTitle = encodeURIComponent(challenge.lcTitle);

                $state.go("challenge-title", {
                    title: uriTitle
                })
            };

            /**
             * Delete image
             * */
            $scope.deleteImage = function(image) {
                var reqObj = {
                    challengeId: image.challenge,
                    imageId: image._id,
                    fileName: image.fileInfo.fileName,
                    reqUserId: payload.sub,
                    creatorId: image.uploadedBy.userId
                };

                imageService.deleteImg(reqObj)
                    .success(function(res) {
                        socket.emit("image:deleted", {
                            challenge: $scope.challenge.title,
                            imageId: image._id
                        });
                        $scope.toChallenge($scope.challenge);
                        callout("dark", "Gone!", res);
                    })
                    .error(function(err) {
                        callout("warning", "Something went wrong", err.message);
                    })
            };

            /**
             * Checks if current user is creator of image
             * */
            $scope.isCreator = function() {
                return $scope.image.uploadedBy.userId === payload.sub;
            };

            /**
             * Go to update image
             * */
            $scope.updateImage = function(image) {

                var uriTitle = encodeURIComponent($scope.challenge.lcTitle);
                var uriId = encodeURIComponent(image._id);

                $state.go("image-update", {
                    challengeTitle: uriTitle,
                    imageId: uriId
                })
            };

            /**
             * Real time update of scores
             * */
            socket.on("vote:image", function(data) {
                if (data.id === $scope.image._id) {
                    $scope.image.stats.votes = data.score;
                }
            });

            socket.on("unvote:image", function(data) {
                if (data.id === $scope.image._id) {
                    $scope.image.stats.votes = data.score;
                }
            });

            /**
             * If image is deleted while viewing take user back to challenge page
             * */
            socket.on("image:deleted", function(data) {
                if (data.imageId === $scope.image._id) {
                    callout("dark", "The image was deleted");
                    $state.go("challenge-title", {
                        title: $scope.challenge.title
                    });
                }
            });

            /**
             * If challenge is deleted while viewing take user back to challenges page
             * */
            socket.on("challenge:deleted", function(data) {
                if (data.challenge === decodeURIComponent(challengeTitle)) {
                    callout("dark", "The challenge was deleted");
                    $state.go("challenges");
                }
            });

        }]);
