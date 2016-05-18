/**
 * Update Image Controller
 * @author beppek
 */

"use strict";

module.exports = angular.module("shutterSnappy")
    .controller("updateImageCtrl", ["$scope", "callout", "$state", "$stateParams", "$http", "imageService", "$auth", "challengeService",
        function($scope, callout, $state, $stateParams, $http, imageService, $auth, challengeService) {

            var challengeUriTitle = $stateParams.challengeTitle;
            var imageId = $stateParams.imageId;
            var payload = $auth.getPayload();

            /**
             * Get the image and info
             * */
            $http.get("/image/update/" + imageId)
                .success(function(res) {
                    $scope.image = res;

                    if ($scope.image.uploadedBy.userId !== payload.sub) {
                        callout("warning", "Unauthorized!", "That's not your image!");
                        $state.go("challenges");
                    }

                })
                .error(function(err) {
                    callout("warning", "Something went wrong", err.message);
                    $state.go("challenges");
                });

            /**
             * Delete image
             * */
            $scope.deleteImage = function(image) {
                var reqObj = {
                    challengeId: image.challenge,
                    imageId: image._id,
                    fileName: image.fileInfo.fileName,
                    reqUserId: payload.sub,
                    creatorId: image.uploadedBy.userId
                };

                imageService.deleteImg(reqObj)
                    .success(function(res) {
                        $scope.toChallenge($scope.challenge);
                        callout("success", "Gone!", res);
                    })
                    .error(function(err) {
                        callout("warning", "Something went wrong", err.message);
                    })

            };

            /**
             * Update image
             * */
            $scope.update = function(image) {


                imageService.update(updatedImage)
                    .success(function(res) {
                        console.log(res);
                    })
                    .error(function(err) {
                        console.log(err);
                    });

            };

        }]);
