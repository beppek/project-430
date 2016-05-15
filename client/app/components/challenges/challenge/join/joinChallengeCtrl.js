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
    .controller("joinChallengeCtrl", ["$scope", "callout", "$state", "$stateParams", "challengeService", "userService", "Upload",
        function($scope, callout, $state, $stateParams, challengeService, userService, Upload) {

            /**
             * Get challenge
             * */
            challengeService.get(decodeURIComponent($stateParams.id))
                .success(function(challenge) {
                    $scope.challenge = challenge;
                })
                .error(function(err) {
                    callout("warning", "Something went wrong", err.message);
                });

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
                    callout("warning", "Image size too big.", "Must be less than 2mb");
                }

            };

            /**
             * Upload the image
             * */
            $scope.upload = function(file) {

                var formData = {
                    userId: userService.getId(),
                    title: $scope.title,
                    description: $scope.description,
                    challengeId: $stateParams.id
                };

                Upload.upload({
                    url: "challenge/upload",
                    method: "POST",
                    data: {
                        file: file,
                        imgData: formData
                    }
                }).then(function(res) {
                    callout("success", "Challenge Accepted!", "You successfully uploaded " + res.config.data.file.name);

                    $state.go("image", {
                        challengeId: res.data.challenge,
                        imageId: res.data._id
                    });
                },

                function(err) {
                    console.log("Error status: " + err.status);
                },

                function(evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log("Progress: " + progressPercentage + "% " + evt.config.data.file.name);
                });

            };

        }]);
