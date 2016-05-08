/**
 * Created by Beppe on 8/05/2016.
 */

/**
 * Exports the controller
 * */
module.exports = angular.module("slideZapp")
    .controller("imageCtrl", ["$scope", "callout", "$state", "$stateParams", "$http", function($scope, callout, $state, $stateParams, $http) {

        var challengeId = $stateParams.challengeId;
        var imageId = $stateParams.imageId;
        var imgObj;

        $http.get("/image/" + challengeId + "/" + imageId)
            .success(function(res) {

                $scope.imgSrc = res.fileInfo.path;
                $scope.imgDescription = res.description;
                imgObj = res;

            });

    }]);
