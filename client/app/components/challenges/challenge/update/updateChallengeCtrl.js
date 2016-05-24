/**
 * Update Challenge Controller
 * @author beppek
 *
 */

"use strict";

module.exports = angular.module("shutterSnappy")
    .controller("updateChallengeCtrl", ["$scope", "$auth", "challengeService", "callout", "$state", "$stateParams", "$http", "socket",
        function($scope, $auth, challengeService, callout, $state, $stateParams, $http, socket) {

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

                    $scope.data = {
                        availableOptions: [
                            {id: "1", name: "People & Portrait"},
                            {id: "2", name: "Landscape & Rural"},
                            {id: "3", name: "Cityscape & Urban"},
                            {id: "4", name: "Travel"},
                            {id: "5", name: "Black & White"},
                            {id: "6", name: "Sports"},
                            {id: "7", name: "Action"},
                            {id: "8", name: "HDR"},
                            {id: "9", name: "Photoshop"},
                            {id: "10", name: "Architecture"},
                            {id: "11", name: "Food & Drink"},
                            {id: "12", name: "Macro"},
                            {id: "13", name: "Nature"},
                            {id: "14", name: "Night"},
                            {id: "15", name: "Art"},
                            {id: "16", name: "Miscellaneous"}
                        ],
                        selectedOption: {id: $scope.challenge.category.id, name: $scope.challenge.category.name}
                    };

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

                var categoryObj = {
                    id: $scope.data.selectedOption.id,
                    name: $scope.data.selectedOption.name
                };

                var formData = {
                    reqUserId: payload.sub,
                    creatorId: $scope.challenge.createdBy.createdById,
                    title: $scope.title,
                    description: $scope.description,
                    challengeId: $scope.challenge._id,
                    category: categoryObj
                };

                challengeService.updateChallenge(formData)
                    .success(function(res) {
                        callout("dark", "Done!", res);

                        socket.emit("challenge:updated", {
                            title: $scope.title,
                            uriTitle: $stateParams.title,
                            creator: $scope.challenge.createdBy.createdByName
                        });
                        $state.go("challenge-title", {
                            title: $stateParams.title
                        });

                    })
                    .error(function(err) {
                        callout("warning", "Couldn't save!", err.message);
                    });

            };

            /**
             * Go back to challenge
             * */
            $scope.toChallenge = function() {
                $state.go("challenge-title", {
                    title: $stateParams.title
                });
            };

            /**
             * Checks if current user is creator of challenge
             * */
            $scope.isCreator = function(challenge) {
                return challenge.createdBy.createdById === payload.sub;
            };

        }]);
