/**
 * Image Controller
 * @author beppek
 */
"use strict";

/**
 * Exports the controller
 * */
module.exports = angular.module("shutterSnappy")
    .controller("imageCtrl", ["$scope", "callout", "$state", "$stateParams", "$http", "imageService", "$auth",
        function($scope, callout, $state, $stateParams, $http, imageService, $auth) {

            var challengeId = $stateParams.challengeId;
            var imageId = $stateParams.imageId;
            var payload = $auth.getPayload();

            /**
             * Get the image and info
             * */
            $http.get("/image/" + challengeId + "/" + imageId)
                .success(function(res) {

                    $scope.image = res;

                    $scope.votes = parseInt(res.stats.votes.length);

                    if (payload) {

                        imageService.checkVoted({
                            imageId: $scope.image._id,
                            userId: payload.sub
                        }).success(function(res) {
                            $scope.hasVoted = res;
                        }).error(function(err) {
                            callout("warning", "Something went wrong", err.message);
                        })

                    } else {

                        //TODO Handle unregistered visitors better
                        $scope.hasVoted = true;

                    }

                }).error(function(err) {
                    callout("warning", "Something went wrong", err.message);
            });

            /**
             * Get challenge name
             * */
            $http.get("/challengeName/" + challengeId)
                .success(function(res) {
                    $scope.challenge = res;
                });

            /**
             * Vote
             * */
            $scope.vote = function() {

                $scope.hasVoted = true;
                $scope.votes += 1;

                imageService.vote({
                    imageId: $scope.image._id,
                    userId: payload.sub
                }).success(function(res) {
                    $scope.votes = res.length;
                }).error(function(err) {
                    callout("warning", "Something went wrong!", err.message);
                });

            };

        }]);
