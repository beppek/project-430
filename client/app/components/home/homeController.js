/**
 * This is the controller for the homepage
 * @author: beppek
 */

"use strict";

//TODO: Actually do something useful
module.exports = angular.module("shutterSnappy")
    .controller("homeController", ["$scope", "$log", "nameService", "challenges", "$state", "$auth", "challengeService", "sortService", "socket",
        function($scope, $log, nameService, challenges, $state, $auth, challengeService, sortService, socket) {

            if ($auth.isAuthenticated()) {
                $state.go("challenges");
            }

            /**
             * Check if authenticated
             * */
            $scope.isAuthenticated = function() {
                return $auth.isAuthenticated();
            };

            var bgImages = [
                "camera1",
                "aurora1",
                "camera2",
                "map1",
                "camera3",
                "map2",
                "man1",
                "camera4",
                "stars1",
                "forest1",
                "frost1",
                "bench1",
                "mountains1",
                "kids1",
                "flower1",
                "map3",
                "mountains2",
                "child1",
                "sunset1"
            ];

            $scope.backgroundImage = bgImages[Math.floor(Math.random() * bgImages.length)];

            // var payload = $auth.getPayload();

            // /**
            //  * Get list of challenges
            //  * */
            // challenges.listAll()
            //     .success(function(res) {
            //         $scope.challenges = res;
            //     })
            //     .error(function(err) {
            //         callout("warning", "Something went wrong", err.message);
            //     });

            // /**
            //  * Go to challenge
            //  * */
            // $scope.toChallenge = function(challenge) {
            //
            //     var uriTitle = encodeURIComponent(challenge.lcTitle);
            //
            //     $state.go("challenge-title", {
            //         title: uriTitle
            //     })
            // };

            // /**
            //  * Check if user has voted
            //  * */
            // $scope.hasVoted = function(challenge) {
            //     if (payload) {
            //         if (challenge.stats.votes.indexOf(payload.sub) === -1) {
            //             return false;
            //         } else {
            //             return true;
            //         }
            //     } else {
            //         return true;
            //     }
            // };

            // /**
            //  * Vote
            //  * */
            // $scope.vote = function(challenge) {
            //
            //     if (payload) {
            //         challenge.stats.votes.push(payload.sub);
            //
            //         challengeService.vote({
            //             challengeId: challenge._id,
            //             userId: payload.sub
            //         }).success(function(res) {
            //             socket.emit("vote:challenge", {
            //                 id: challenge._id,
            //                 score: res
            //             });
            //             challenge.stats.votes = res;
            //         }).error(function(err) {
            //             callout("warning", "Something went wrong!", err.message);
            //         });
            //     }
            //
            // };

            // /**
            //  * Unvote
            //  * */
            // $scope.unVote = function(challenge) {
            //     if (payload) {
            //         var i = challenge.stats.votes.indexOf(payload.sub);
            //
            //         if (i > -1) {
            //             challenge.stats.votes.splice(i, 1);
            //         }
            //
            //         challengeService.unVote({
            //             challengeId: challenge._id,
            //             userId: payload.sub
            //         }).success(function(res) {
            //             socket.emit("unvote:challenge", {
            //                 id: challenge._id,
            //                 score: res
            //             });
            //             challenge.stats.votes = res;
            //         }).error(function(err) {
            //             callout("warning", "Something went wrong!", err.message);
            //         });
            //     }
            //
            // };

            // /**
            //  * Sort by votes
            //  * */
            // $scope.sortByVotes = function() {
            //     $scope.challenges = sortService.byVotes($scope.challenges);
            // };
            //
            // /**
            //  * Sort by contributions
            //  * */
            // $scope.sortByContributions = function() {
            //     $scope.challenges = sortService.byContributions($scope.challenges);
            // };
            //
            // /**
            //  * Sort by date
            //  * */
            // $scope.sortByDate = function() {
            //     $scope.challenges = sortService.byDate($scope.challenges);
            // };

            // $scope.$watch("name", function() {
            //     nameService.name = $scope.name;
            // });

            // /**
            //  * Real time update of scores
            //  * */
            // socket.on("vote:challenge", function(data) {
            //
            //     $scope.challenges.forEach(function(challenge) {
            //
            //         if (data.id === challenge._id) {
            //             challenge.stats.votes = data.score;
            //         }
            //
            //     });
            //
            // });

            // socket.on("unvote:challenge", function(data) {
            //
            //     $scope.challenges.forEach(function(challenge) {
            //
            //         if (data.id === challenge._id) {
            //             challenge.stats.votes = data.score;
            //         }
            //
            //     });
            //
            // });

            // /**
            //  * Real time update of new and deleted challenges
            //  * */
            // socket.on("challenge:created", function(data) {
            //     challengeService.get(data.title)
            //         .success(function(res) {
            //             $scope.challenges.push(res);
            //         });
            // });

            // socket.on("challenge:deleted", function(data) {
            //     $scope.challenges = $scope.challenges.filter(function(challenge) {
            //         return challenge.lcTitle !== data.challenge
            //     })
            // });

        }]);
