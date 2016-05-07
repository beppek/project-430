/**
 * Created by Beppe on 6/05/2016.
 */

/**
 * Exports the controller
 * */
module.exports = angular.module("slideZapp").controller("createChallengeCtrl", ["$scope", "$auth", "challengeService", "callout", "$state", function($scope, $auth, challengeService, callout, $state) {

    $scope.getUser = function() {
        var payload = $auth.getPayload();

        $scope.userId = payload.sub;
    };

    $scope.submit = function() {

        var payload = $auth.getPayload();

        var challengeObj = {
            userId: payload.sub,
            title: $scope.title,
            description: $scope.description
        };

        challengeService.save(challengeObj)
            .success(function(res) {

                var uriEncodedId = encodeURIComponent(res._id);

                callout("success", "Challenge Accepted!", "You successfully created the " + res.title + " challenge.");
                $state.go("challenge-id", {
                    id: uriEncodedId
                });
            })
            .error(function(err) {
                callout("warning", "Challenge Not Accepted!", err.message);

            });

    };

}]);
