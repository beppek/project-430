/**
 * Create Challenge Controller
 * @author beppek
 */

"use strict";
module.exports = angular.module("shutterSnappy")
    .controller("createChallengeCtrl", ["$scope", "$auth", "challengeService", "callout", "$state",
        function($scope, $auth, challengeService, callout, $state) {

            /**
             * Gets the User
             * */
            $scope.getUser = function() {
                var payload = $auth.getPayload();

                $scope.userId = payload.sub;
            };

            /**
             * Create challenge on submit
             * */
            $scope.submit = function() {

                var payload = $auth.getPayload();

                var challengeObj = {
                    userId: payload.sub,
                    title: $scope.title,
                    description: $scope.description
                };

                challengeService.save(challengeObj)
                    .success(function(res) {

                        var uriTitle = encodeURIComponent(res.lcTitle);

                        callout("success", "Challenge Accepted!", "You successfully created the " + res.title + " challenge.");
                        $state.go("challenge-title", {
                            title: uriTitle
                        });
                    })
                    .error(function(err) {
                        callout("warning", "Challenge Not Accepted!", err.message);
                    });

            };

        }]);
