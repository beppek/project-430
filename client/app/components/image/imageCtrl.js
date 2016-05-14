/**
 * Created by Beppe on 8/05/2016.
 */

/**
 * Exports the controller
 * */
module.exports = angular.module("shutterSnappy")
    .controller("imageCtrl", ["$scope", "callout", "$state", "$stateParams", "$http", function($scope, callout, $state, $stateParams, $http) {

        var challengeId = $stateParams.challengeId;
        var imageId = $stateParams.imageId;

        $http.get("/image/" + challengeId + "/" + imageId)
            .success(function(res) {

                $scope.image = res;

            });

        $http.get("/challengeName/" + challengeId)
            .success(function(res) {
                $scope.challenge = res;
            });

    }]);
