/**
 *
 * Controller for upload page
 *
 */

/**
 * Exports the controller
 * */
module.exports = angular.module("slideZapp")
    .controller("joinChallengeCtrl", ["$scope", "callout", "$state", "$stateParams", "challengeService", "userService", "Upload",
        function($scope, callout, $state, $stateParams, challengeService, userService, Upload) {

            challengeService.get(decodeURIComponent($stateParams.id))
                .success(function(challenge) {
                    $scope.challenge = challenge;
                })
                .error(function(err) {
                    callout("warning", "Something went wrong", err.message);
                });

            $scope.submit = function() {

                if ($scope.joinChallenge.image.$valid && $scope.image) {

                    $scope.upload($scope.image);
                }

            };

            $scope.upload = function(file) {

                var formData = {
                    userId: userService.getId(),
                    title: $scope.title,
                    description: $scope.description,
                    challengeId: $stateParams.id
                };

                Upload.upload({
                    url: "challenge/upload",
                    method: "POST",
                    data: {
                        file: file,
                        imgData: formData
                    }
                }).then(function(res) {
                    console.log("Success " + res.config.data.file.name + " uploaded. Response: " + res.data);
                }, function(res) {
                    console.log("Error status: " + res.status);
                }, function(evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log("Progress: " + progressPercentage + "% " + evt.config.data.file.name);
                });

            };

            // $scope.submit = function() {
            //
            //     var image = document.querySelector("#image");
            //
            //     console.log(image);

            //     var payload = $auth.getPayload();
            //
            //     var imgObj = {
            //         userId: payload.sub,
            //         title: $scope.title,
            //         description: $scope.description,
            //         image: $scope.image
            //     };
            //
            //     $http.post("/challenge/upload", imgObj);
            //
            //     // console.log(imgObj);
            //
            //     // challengeService.save(challengeObj)
            //     //     .success(function(res) {
            //     //
            //     //         var uriEncodedId = encodeURIComponent(res._id);
            //     //
            //     //         callout("success", "Challenge Accepted!", "You successfully created the " + res.title + " challenge.");
            //     //         $state.go("challenge-id", {
            //     //             id: uriEncodedId
            //     //         });
            //     //     })
            //     //     .error(function(err) {
            //     //         callout("warning", "Challenge Not Accepted!", err.message);
            //     //
            //     //     });
            //     //
            // };

        }]);
