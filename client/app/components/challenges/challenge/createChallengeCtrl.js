/**
 * Created by Beppe on 6/05/2016.
 */

/**
 * Exports the controller
 * */
module.exports = angular.module("slideZapp").controller("createChallengeCtrl", ["$scope", "$auth", function($scope, $auth) {

    $scope.getUser = function() {
        console.log($auth.getPayload());
    };

}]);
