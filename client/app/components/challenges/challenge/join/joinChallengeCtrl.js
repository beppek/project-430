/**
 *
 * Controller for upload page
 * @author beppek
 *
 */

"use strict";

/**
 * Exports the controller
 * */
module.exports = angular.module("shutterSnappy")
    .controller("joinChallengeCtrl", ["$scope", "callout", "$state", "$stateParams", "challengeService", "userService", "Upload", "socket",
        function($scope, callout, $state, $stateParams, challengeService, userService, Upload, socket) {

            var userId = userService.getId();

            /**
             * Get challenge
             * */
            challengeService.get($stateParams.title)
                .success(function(challenge) {
                    $scope.challenge = challenge;
                })
                .error(function(err) {
                    callout("warning", "Something went wrong", err.message);
                });

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
             * Save image
             * */
            $scope.submit = function() {

                if ($scope.joinChallenge.image.$valid && $scope.image) {

                    $scope.upload($scope.image);
                }

            };

            /**
             * Validation for image
             * */
            $scope.validateImage = function() {

                if ($scope.joinChallenge.image.$error.maxSize) {
                    callout("warning", "Image size too big.", "Must be less than 1mb");
                }

            };

            /**
             * Go to Leaderboard
             * */
            $scope.gotoLeaderboard = function(challenge) {
                $state.go("leaderboard", {
                    challenge: challenge.lcTitle
                })
            };

            /**
             * Upload the image
             * */
            $scope.upload = function(file) {

                var formData = {
                    userId: userId,
                    title: $scope.title,
                    description: $scope.description,
                    location: $scope.location,
                    challengeId: $scope.challenge._id
                };

                Upload.upload({
                    url: "challenge/upload",
                    method: "POST",
                    data: {
                        file: file,
                        imgData: formData
                    }
                }).then(function(res) {

                    callout("dark", "Challenge Accepted!", "You successfully uploaded " + res.config.data.file.name);

                    var id = res.data._id;

                    userService.getUserName(userId)
                        .success(function(res) {
                            socket.emit("image:uploaded", {
                                title: $scope.title,
                                id: id,
                                creator: res,
                                challenge: $scope.challenge.title
                            });
                        });

                    $state.go("image", {
                        challengeTitle: $stateParams.title,
                        imageId: res.data._id
                    });
                },

                function(err) {
                    callout("warning", "Something went wrong!", "Error status: " + err.status);
                },

                function(evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log("Progress: " + progressPercentage + "% " + evt.config.data.file.name);
                    $scope.progress = progressPercentage;
                });

            };

        }]);
