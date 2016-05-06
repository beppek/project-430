/**
 * Created by Beppe on 22/04/2016.
 */

/**
 * Exports the controller
 * */
module.exports = angular.module("slideZapp").controller("challengesCtrl", ["$scope", "$auth", function($scope, $auth) {

    $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
    };

}]);
