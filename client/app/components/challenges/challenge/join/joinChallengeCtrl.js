/**
 *
 * Controller for upload page
 *
 */

/**
 * Exports the controller
 * */
module.exports = angular.module("slideZapp")
    .controller("joinChallengeCtrl", ["$scope", "$auth", "callout", "$state", "$http", "$stateParams", "challengeService", function($scope, $auth, callout, $state, $http, $stateParams, challengeService) {

        challengeService.get(decodeURIComponent($stateParams.id))
            .success(function(challenge) {
                $scope.challenge = challenge;
            })
            .error(function(err) {
                callout("warning", "Something went wrong", err.message);
            });

        $scope.getUser = function() {
            var payload = $auth.getPayload();

            $scope.userId = payload.sub;
        };

        $http.get("/challenge/:id/join")
            .success(function() {

            }).error(function(err) {
            callout("warning", "Unable to get upload", err.message);
            $state.go("signin");
        });

        $scope.submit = function() {

            var payload = $auth.getPayload();

            var imgObj = {
                userId: payload.sub,
                title: $scope.title,
                description: $scope.description
            };

            console.log(imgObj);

            // challengeService.save(challengeObj)
            //     .success(function(res) {
            //
            //         var uriEncodedId = encodeURIComponent(res._id);
            //
            //         callout("success", "Challenge Accepted!", "You successfully created the " + res.title + " challenge.");
            //         $state.go("challenge-id", {
            //             id: uriEncodedId
            //         });
            //     })
            //     .error(function(err) {
            //         callout("warning", "Challenge Not Accepted!", err.message);
            //
            //     });
            //
        };

    }]);
