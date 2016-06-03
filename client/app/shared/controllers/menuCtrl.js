/**
 * Menu Controller
 * @author beppek
 */

"use strict";

module.exports = angular.module("shutterSnappy")
    .controller("menuCtrl", ["$scope", "$state", "$auth", "$document", "$stateParams", "$rootScope", "userService", "challengeService", "callout", "socket", "imageService",
        function($scope, $state, $auth, $document, $stateParams, $rootScope, userService, challengeService, callout, socket, imageService) {

            $scope.isAuthenticated = $auth.isAuthenticated;

            $scope.currentPage = function() {
                return $state.current.url;
            };

            /**
             * Toggle Menu to open/close
             * */
            $scope.isOpen = false;
            $scope.toggleNav = function($event) {

                $event.stopPropagation();
                $scope.isOpen = !$scope.isOpen;

            };

            /**
             * Close menu on click outside
             * */
            $document.on("click", function(event) {
                if (event.target.id !== "menu" && event.target.id !== "menu-button") {
                    event.stopPropagation();
                    $scope.$apply($scope.isOpen = false);
                }
            });

            /**
             * Load tools based on page
             * */
            $scope.tools = function() {

                switch ($state.current.name) {
                    case "home":
                        return "views/partials/toolbars/challengesTools.html";
                    case "challenges":
                        return "views/partials/toolbars/challengesTools.html";
                    case "challenge-title":
                        return "views/partials/toolbars/challengeTools.html";
                    case "image":
                        return "views/partials/toolbars/imageTools.html";
                    case "challenge-update":
                        return "views/partials/toolbars/challengeUpdateTools.html";
                    case "image-update":
                        return "views/partials/toolbars/imageUpdateTools.html";
                }

            };

            /**
             * Go to Leaderboard
             * */
            $scope.gotoLeaderboard = function() {
                $state.go("leaderboard", {
                    challenge: $stateParams.title
                });
            };

            /**
             * Join challenge function
             * */
            $scope.joinChallenge = function() {
                $state.go("joinChallenge", {
                    title: $stateParams.title
                })
            };

            /**
             * Checks if current user is creator of challenge
             * */
            $scope.isChallengeCreator = function() {
                return $rootScope.challenge.createdBy.createdById === userService.getId();
            };

            $scope.isConfirmed = function(value) {
                console.log(value + " from controller");
            };

            /**
             * Deletes challenge
             * */
            $scope.deleteChallenge = function() {

                // if (confirm("Are you sure you want to delete the challenge?")) {

                    challengeService.get($stateParams.title)
                        .success(function(res) {
                            $scope.challenge = res;
                            var reqObj = {
                                challengeId: res._id,
                                reqUserId: userService.getId(),
                                creatorId: res.createdBy.createdById
                            };

                            challengeService.deleteChallenge(reqObj)
                                .success(function(res) {
                                    socket.emit("challenge:deleted", {
                                        challenge: $scope.challenge.lcTitle
                                    });
                                    $state.go("challenges");
                                    callout("dark", "Gone!", res);
                                })
                                .error(function(err) {
                                    callout("warning", "Something went wrong", err.message);
                                })
                        });

                // }

            };

            /**
             * Go to challenge
             * */
            $scope.toChallenge = function(challenge) {

                var uriTitle = encodeURIComponent(challenge.lcTitle);

                $state.go("challenge-title", {
                    title: uriTitle
                })
            };

            /**
             * Go to Update Challenge
             * */
            $scope.updateChallenge = function() {
                $state.go("challenge-update", {
                    title: $stateParams.title
                });
            };

            /**
             * Checks if current user is creator of image
             * */
            $scope.isImageCreator = function() {
                return $rootScope.image.uploadedBy.userId === userService.getId();
            };

            /**
             * Go to update image
             * */
            $scope.updateImage = function() {
                $state.go("image-update", {
                    challengeTitle: $stateParams.challengeTitle,
                    imageId: $stateParams.imageId
                })
            };

            /**
             * Delete image
             * */
            $scope.deleteImage = function() {

                // if (confirm("Are you sure you want to delete this image?")) {

                    challengeService.get($stateParams.challengeTitle)
                        .success(function(res) {
                            $scope.challenge = res;
                        });

                    imageService.getImage($stateParams.imageId)
                        .success(function(res) {
                            var reqObj = {
                                challengeId: res.challenge,
                                imageId: res._id,
                                fileName: res.fileInfo.fileName,
                                reqUserId: userService.getId(),
                                creatorId: res.uploadedBy.userId
                            };

                            imageService.deleteImg(reqObj)
                                .success(function(res) {
                                    socket.emit("image:deleted", {
                                        challenge: $scope.challenge.title,
                                        imageId: reqObj.imageId
                                    });
                                    $scope.toChallenge($scope.challenge);
                                    callout("dark", "Gone!", res);
                                })
                                .error(function(err) {
                                    callout("dark", "Something went wrong", err.message);
                                });

                        })
                        .error(function(err) {
                            callout("dark", err.message || err);
                        });

                };

            // };

        }]);
