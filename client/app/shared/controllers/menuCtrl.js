/**
 * Created by Beppe on 1/05/2016.
 */

"use strict";

module.exports = angular.module("slideZapp")
    .controller("menuCtrl", function($scope, authToken) {
        $scope.isAuthenticated = authToken.isAuthenticated;
    });
