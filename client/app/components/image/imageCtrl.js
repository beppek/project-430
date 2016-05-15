/**
 * Created by Beppe on 8/05/2016.
 */

/**
 * Exports the controller
 * */
module.exports = angular.module("shutterSnappy")
    .controller("imageCtrl", ["$scope", "callout", "$state", "$stateParams", "$http", "imageService", "$auth",
        function($scope, callout, $state, $stateParams, $http, imageService, $auth) {

            var challengeId = $stateParams.challengeId;
            var imageId = $stateParams.imageId;

            $scope.isDisabled = false;

            var payload = $auth.getPayload();

            $scope.vote = function() {
                imageService.vote({
                    imageId: $scope.image._id,
                    userId: payload.sub
                }).success(function(res) {
                    callout("success", "Här följer:", res);
                    console.log(res);
                }).error(function(err) {
                    callout("warning", "Something went wrong!", err.message);
                });
            };

            // $scope.upVote = function() {
            //
            //     $scope.isDisabled = true;
            //     $scope.votes  += 1;
            //
            // };

            $http.get("/image/" + challengeId + "/" + imageId)
                .success(function(res) {

                    $scope.image = res;

                    $scope.votes = parseInt(res.stats.votes.length);

                });

            $http.get("/challengeName/" + challengeId)
                .success(function(res) {
                    $scope.challenge = res;
                });

        }]);
