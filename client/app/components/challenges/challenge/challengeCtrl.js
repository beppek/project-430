/**
 *
 * @author beppek
 *
 */

/**
 * Exports the controller
 * */
module.exports = angular.module("slideZapp")
    .controller("challengeCtrl", ["$scope", "$auth", "challenge", "callout", "$state", "$stateParams", function($scope, $auth, challenge, callout, $state, $stateParams) {

        console.log($stateParams);

        $scope.title = $stateParams.title;

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

            challenge.save(challengeObj)
                .success(function(res) {
                    callout("success", "Challenge Accepted!", "You successfully created the " + res.title + " challenge.");
                    $state.go("challenge.id", res._id);
                })
                .error(function(err) {
                    callout("warning", "Challenge Not Accepted!", err.message);

                });

        };

    }]);
