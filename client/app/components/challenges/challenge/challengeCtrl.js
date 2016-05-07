/**
 *
 * @author beppek
 *
 */

/**
 * Exports the controller
 * */
module.exports = angular.module("slideZapp")
    .controller("challengeCtrl", ["$scope", "$auth", "challengeService", "callout", "$state", "$stateParams", function($scope, $auth, challengeService, callout, $state, $stateParams) {

        $scope.title = decodeURIComponent($stateParams.title);

        $scope.getUser = function() {
            var payload = $auth.getPayload();

            $scope.userId = payload.sub;
        };

        challengeService.get(decodeURIComponent($stateParams.id))
            .success(function(challenge) {
                
                $scope.challenge = challenge;
            })
            .error(function(err) {
                callout("warning", "Something went wrong", err.message);
            })

    }]);
