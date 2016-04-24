/**
 * Created by Beppe on 24/04/2016.
 */

"use strict";

module.exports = angular.module("slideZapp")
    .controller("signupCtrl", function($scope) {
        $scope.submit = function() {
            console.log("hello");
        }
    });
