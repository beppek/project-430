/**
 * Update Challenge Controller
 * @author beppek
 *
 */

"use strict";

module.exports = angular.module("shutterSnappy")
    .controller("updateChallengeCtrl", ["$scope", "$auth", "challengeService", "callout", "$state", "$stateParams", "$http", "imageService", "sortService",
        function($scope, $auth, challengeService, callout, $state, $stateParams, $http, imageService, sortService) {

            var payload = $auth.getPayload();
            var challengeTitle = decodeURIComponent($stateParams.title);

            /**
             * Get the challenge and info
             * */
            $http.get("/challenge/" + challengeTitle + "/update")
                .success(function(res) {

                    $scope.challenge = res;

                    $scope.title = $scope.challenge.title;
                    $scope.description = $scope.challenge.description;

                    if ($scope.challenge.createdBy.createdById !== payload.sub) {
                        callout("warning", "Unauthorized!", "That's not your challenge!");
                        $state.go("challenge-title", {
                            title: $stateParams.title
                        });
                    }

                })
                .error(function(err) {
                    callout("warning", "Something went wrong", err.message);
                    $state.go("challenge-title", {
                        title: $stateParams.title
                    });
                });

            /**
             * Updates challenge
             * */
            $scope.submit = function() {

                var formData = {
                    reqUserId: payload.sub,
                    creatorId: $scope.challenge.createdBy.createdById,
                    title: $scope.title,
                    description: $scope.description,
                    challengeId: $scope.challenge._id
                };

                challengeService.updateChallenge(formData)
                    .success(function(res) {
                        callout("success", "Done!", res);
                        $state.go("challenge-title", {
                            title: $stateParams.title
                        })
                    })
                    .error(function(err) {
                        callout("warning", "Couldn't save!" , err.message);
                    });

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
                        callout("success", "Gone!", res);
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

        }]);
