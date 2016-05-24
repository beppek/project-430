/**
 * Update Image Controller
 * @author beppek
 */

"use strict";

module.exports = angular.module("shutterSnappy")
    .controller("updateImageCtrl", ["$scope", "callout", "$state", "$stateParams", "$http", "imageService", "$auth", "challengeService", "socket",
        function($scope, callout, $state, $stateParams, $http, imageService, $auth, challengeService, socket) {

            var challengeTitle = $stateParams.challengeTitle;
            var imageId = $stateParams.imageId;
            var payload = $auth.getPayload();

            /**
             * Update image
             * */
            $scope.submit = function() {

                var formData = {
                    reqUserId: payload.sub,
                    creatorId: $scope.image.uploadedBy.userId,
                    title: $scope.title,
                    description: $scope.description,
                    location: $scope.location,
                    imgId: $scope.image._id
                };

                imageService.updateImg(formData)
                    .success(function(res) {
                        callout("dark", "Done!", res);
                        $state.go("image", {
                            challengeTitle: challengeTitle,
                            imageId: imageId
                        })
                    })
                    .error(function(err) {
                        callout("warning", "Couldn't save!", err.message);
                    });

            };

            /**
             * Get the image and info
             * */
            $http.get("/image/update/" + imageId)
                .success(function(res) {
                    $scope.image = res;

                    $scope.title = $scope.image.title;
                    $scope.description = $scope.image.description;
                    $scope.location = $scope.image.location;

                    if ($scope.image.uploadedBy.userId !== payload.sub) {
                        callout("warning", "Unauthorized!", "That's not your image!");
                        $state.go("challenges");
                    }

                })
                .error(function(err) {
                    callout("warning", "Something went wrong", err.message);
                    $state.go("challenges");
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
             * Go back to challenge
             * */
            $scope.toChallenge = function(challenge) {

                $state.go("challenge-title", {
                    title: challengeTitle
                })
            };

            /**
             * Go back to image
             * */
            $scope.toImage = function() {
                $state.go("image", {
                    challengeTitle: challengeTitle,
                    imageId: imageId
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

        }]);
