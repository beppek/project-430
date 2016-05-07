/**
 * Created by Beppe on 22/04/2016.
 */

/**
 * Exports the controller
 * */
module.exports = angular.module("slideZapp")
    .controller("challengesCtrl", ["$scope", "$auth", "challenges", "callout", "$state", function($scope, $auth, challenges, callout, $state) {

        $scope.isAuthenticated = function() {
            return $auth.isAuthenticated();
        };

        challenges.get()
            .success(function(res) {
                $scope.challenges = res;
            })
            .error(function(err) {
                callout("warning", "Something went wrong", err.message);
            });

        $scope.toChallenge = function(challenge) {
            console.log(challenge);

            var uriEncodedId = encodeURIComponent(challenge._id);
            var uriEncodedTitle = encodeURIComponent(challenge.title);

            $state.go("challenge-id", {
                id: uriEncodedId,
                title: uriEncodedTitle
            })
        }

    }]);
