/**
 * This is the controller for the homepage
 * @author: beppek
 */

"use strict";

//TODO: Actually do something useful
module.exports = angular.module("shutterSnappy")
    .controller("homeController", ["$scope", "$log", "nameService", "challenges", "$state", "$auth",
        function($scope, $log, nameService, challenges, $state, $auth) {

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

            $scope.backgroundImage1 = bgImages[Math.floor(Math.random() * bgImages.length)];
            do {
                $scope.backgroundImage2 = bgImages[Math.floor(Math.random() * bgImages.length)];
            } while ($scope.backgroundImage1 === $scope.backgroundImage2);

        }]);
