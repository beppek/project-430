/**
 * Created by Beppe on 1/05/2016.
 */

"use strict";

module.exports = angular.module("slideZapp")
    .controller("menuCtrl", function($scope, authToken, $state) {
        $scope.isAuthenticated = authToken.isAuthenticated;
        $scope.currentPage = function() {
            return $state.current.url;
        }
    });
