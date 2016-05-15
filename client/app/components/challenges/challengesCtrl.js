/**
 * Created by Beppe on 22/04/2016.
 */

/**
 * Exports the controller
 * */
module.exports = angular.module("shutterSnappy")
    .controller("challengesCtrl", ["$scope", "$auth", "challenges", "callout", "$state", "challengeService",
        function($scope, $auth, challenges, callout, $state, challengeService) {

            $scope.isAuthenticated = function() {
                return $auth.isAuthenticated();
            };
            var payload = $auth.getPayload();

            /**
             * Gets all challenges
             * */
            challenges.listAll()
                .success(function(res) {
                    $scope.challenges = res;
                })
                .error(function(err) {
                    callout("warning", "Something went wrong", err.message);
                });

            $scope.toChallenge = function(challenge) {

                var uriEncodedId = encodeURIComponent(challenge._id);

                $state.go("challenge-id", {
                    id: uriEncodedId
                })
            };

            // if (image.stats.votes.indexOf(req.body.userId) === -1) {
            //     return res.send(false);
            // } else {
            //     return res.send(true);
            // }

            /**
             * Check if user has voted
             * */
            $scope.hasVoted = function(challenge) {
                if (challenge.stats.votes.indexOf(payload.sub) === -1) {
                    return false;
                } else {
                    return true;
                }
            };

            /**
             * Vote
             * */
            $scope.vote = function(challenge) {

                console.log(challenge);

                challenge.stats.votes.push(payload.sub);

                challengeService.vote({
                    challengeId: challenge._id,
                    userId: payload.sub
                }).success(function(res) {
                    challenge.stats.votes = res;
                }).error(function(err) {
                    callout("warning", "Something went wrong!", err.message);
                });

            };

        }]);
