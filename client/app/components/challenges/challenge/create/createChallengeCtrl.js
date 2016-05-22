/**
 * Create Challenge Controller
 * @author beppek
 */

"use strict";
module.exports = angular.module("shutterSnappy")
    .controller("createChallengeCtrl", ["$scope", "$auth", "challengeService", "callout", "$state", "socket",
        function($scope, $auth, challengeService, callout, $state, socket) {

            /**
             * Gets the User
             * */
            $scope.getUser = function() {
                var payload = $auth.getPayload();

                $scope.userId = payload.sub;
            };

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
                ]
            };

            /**
             * Create challenge on submit
             * */
            $scope.submit = function() {

                var payload = $auth.getPayload();

                var categoryObj = {
                    id: $scope.data.selectedOption.id,
                    name: $scope.data.selectedOption.name
                };

                var challengeObj = {
                    userId: payload.sub,
                    title: $scope.title,
                    description: $scope.description,
                    category: categoryObj
                };

                challengeService.save(challengeObj)
                    .success(function(res) {

                        var uriTitle = encodeURIComponent(res.lcTitle);

                        callout("dark", "Challenge Accepted!", "You successfully created the " + res.title + " challenge.");

                        $state.go("joinChallenge", {
                            title: uriTitle
                        });

                        socket.emit("challenge:created", {
                            title: res.title,
                            uriTitle: uriTitle,
                            creator: res.createdBy.createdByName
                        });

                    })
                    .error(function(err) {
                        callout("dark", "Challenge Not Accepted!", err.message);
                    });

            };

        }]);
