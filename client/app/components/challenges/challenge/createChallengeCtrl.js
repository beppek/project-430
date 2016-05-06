/**
 * Created by Beppe on 6/05/2016.
 */

/**
 * Exports the controller
 * */
module.exports = angular.module("slideZapp").controller("createChallengeCtrl", ["$scope", "$auth", function($scope, $auth) {

    $scope.getUser = function() {
        var payload = $auth.getPayload();

        $scope.userId = payload.sub;
    };

    $scope.submit = function() {

        var payload = $auth.getPayload();

        var challenge = {
            userId: payload.sub,
            title: $scope.title,
            description: $scope.description
        };

        console.log(challenge);

    };

}]);
