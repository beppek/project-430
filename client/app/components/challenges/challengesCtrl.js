/**
 * Created by Beppe on 22/04/2016.
 */

/**
 * Exports the controller
 * */
module.exports = angular.module("shutterSnappy")
    .controller("challengesCtrl", ["$scope", "$auth", "challenges", "callout", "$state", "challengeService",
        function($scope, $auth, challenges, callout, $state, challengeService) {

            /**
             * Check if authenticated
             * */
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

            /**
             * Check if user has voted
             * */
            $scope.hasVoted = function(challenge) {
                if (payload) {
                    if (challenge.stats.votes.indexOf(payload.sub) === -1) {
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    return true;
                }
            };

            /**
             * Vote
             * */
            $scope.vote = function(challenge) {

                if (payload) {
                    challenge.stats.votes.push(payload.sub);

                    challengeService.vote({
                        challengeId: challenge._id,
                        userId: payload.sub
                    }).success(function(res) {
                        challenge.stats.votes = res;
                    }).error(function(err) {
                        callout("warning", "Something went wrong!", err.message);
                    });
                }

            };
            
            /**
             * Unvote
             * */
            $scope.unVote = function(challenge) {
                if (payload) {
                    var i = challenge.stats.votes.indexOf(payload.sub);

                    if (i > -1) {
                        challenge.stats.votes.splice(i, 1);
                    }

                    challengeService.unVote({
                        challengeId: challenge._id,
                        userId: payload.sub
                    }).success(function(res) {
                        challenge.stats.votes = res;
                    }).error(function(err) {
                        callout("warning", "Something went wrong!", err.message);
                    });
                }

            };

        }]);
