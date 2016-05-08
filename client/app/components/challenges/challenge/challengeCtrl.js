/**
 *
 * @author beppek
 *
 */

/**
 * Exports the controller
 * */
module.exports = angular.module("slideZapp")
    .controller("challengeCtrl", ["$scope", "$auth", "challengeService", "callout", "$state", "$stateParams", "$http",
        function($scope, $auth, challengeService, callout, $state, $stateParams, $http) {

            var challengeId = $stateParams.id;

            /**
             * Get images for challenge
             * */
            $http.get("/challenge/" + challengeId)
                .success(function(res) {

                    return $scope.images = res;
                    console.log(res);

                });
            // /**
            //  * Return full image path
            //  * */
            // $scope.getImagePath = function(imageName) {
            //     return "./imgDB/" + challengeId + "/" + imageName;
            // };

            /**
             * Check if authenticated
             * */
            $scope.isAuthenticated = function() {
                return $auth.isAuthenticated();
            };

            /**
             * Get the user
             * */
            $scope.getUser = function() {
                var payload = $auth.getPayload();
                $scope.userId = payload.sub;
            };

            /**
             * Get the challenge
             * */
            challengeService.get(decodeURIComponent($stateParams.id))
                .success(function(challenge) {

                    $scope.challenge = challenge;
                })
                .error(function(err) {
                    callout("warning", "Something went wrong", err.message);
                });

            /**
             * Join challenge function
             * */
            $scope.joinChallenge = function() {
                $state.go("joinChallenge", {
                    id: $stateParams.id
                })
            };

        }]);
