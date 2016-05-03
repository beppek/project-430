/**
 * Created by Beppe on 24/04/2016.
 */

"use strict";

module.exports = angular.module("slideZapp")
    .controller("signupCtrl", ["$scope", "callout", "auth", function($scope, callout, auth) {
        $scope.submit = function() {

            auth.signup($scope.email, $scope.password)
                .success(function(res) {
                    callout("success", "Sweet!", "You're now registered with email: " + res.user.email);
                })
                .error(function(err) {
                    callout("warning", "Oops!", err.message);
                })
        }
    }]);
