/**
 * Created by Beppe on 22/04/2016.
 */

/**
 * Exports the controller
 * */
module.exports = angular.module("slideZapp")
    .controller("challengesCtrl", ["$scope", "$auth", "challenges", "callout", function($scope, $auth, challenges, callout) {

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

    }]);
