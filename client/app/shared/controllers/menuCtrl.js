/**
 * Created by Beppe on 1/05/2016.
 */

"use strict";

module.exports = angular.module("slideZapp")
    .controller("menuCtrl", function($scope, authToken, $state, nameService, $auth) {
        $scope.isAuthenticated = $auth.isAuthenticated;
        $scope.currentPage = function() {
            return $state.current.url;
        };

        $scope.$watch("email", function() {
            nameService.name = $scope.email;
        });

        $scope.name = nameService.name;
    });
