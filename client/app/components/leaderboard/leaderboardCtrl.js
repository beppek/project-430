/**
 * Created by Beppe on 22/04/2016.
 */

/**
 * Exports the controller
 * */
module.exports = angular.module("shutterSnappy")
    .controller("leaderboardCtrl", ["$scope", "$log", "$stateParams", "challengeService",
        function($scope, $log, $stateParams, challengeService) {

            challengeService.get($stateParams.challengeId)
                .success(function(res) {
                    $scope.challenge = res;
                }).error(function(err) {

            });
            console.log($stateParams);

        }]);
