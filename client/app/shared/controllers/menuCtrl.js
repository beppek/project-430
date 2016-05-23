/**
 * Menu Controller
 * @author beppek
 */

"use strict";

module.exports = angular.module("shutterSnappy")
    .controller("menuCtrl", ["$scope", "$state", "nameService", "$auth", "$document",
        function($scope, $state, nameService, $auth, $document) {
            $scope.isAuthenticated = $auth.isAuthenticated;
            $scope.currentPage = function() {
                return $state.current.url;
            };

            $scope.isOpen = false;

            $scope.toggleNav = function($event) {

                $event.stopPropagation();
                $scope.isOpen = !$scope.isOpen;

            };

            $document.on("click", function(event) {
                if (event.target.id !== "menu" && event.target.id !== "menu-button") {
                    event.stopPropagation();
                    $scope.$apply($scope.isOpen = false);
                }
            });

            $scope.toggle = false;

            $scope.name = nameService.name;

        }]);
