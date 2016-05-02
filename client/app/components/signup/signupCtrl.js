/**
 * Created by Beppe on 24/04/2016.
 */

"use strict";

module.exports = angular.module("slideZapp").controller("signupCtrl", ["$scope", "$rootScope", "$http", "callout", "authToken", function($scope, $rootScope, $http, callout, authToken) {
    $scope.submit = function() {

        var url = "/signup";
        var user = {
            email: $scope.email,
            password: $scope.password
        };
        $http.post(url, user)
            .success(function(res) {
                callout("success", "Sweet!", "You're now registered with email: " + res.user.email);
                authToken.setToken(res.token);
            })
            .error(function(err) {
                callout("warning", "Oops!", "Could not register!", err.message);
            })
    }
}]);
