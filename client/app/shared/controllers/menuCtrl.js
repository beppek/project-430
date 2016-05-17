/**
 * Menu Controller
 * @author beppek
 */

"use strict";

module.exports = angular.module("shutterSnappy")
    .controller("menuCtrl", ["$scope", "$state", "nameService", "$auth",
        function($scope, $state, nameService, $auth) {
            $scope.isAuthenticated = $auth.isAuthenticated;
            $scope.currentPage = function() {
                return $state.current.url;
            };

            $scope.toggle = false;

            $scope.name = nameService.name;

        }]);
