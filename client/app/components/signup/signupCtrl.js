/**
 * Created by Beppe on 24/04/2016.
 */

"use strict";

module.exports = angular.module("slideZapp").controller("signupCtrl", ["$scope", "$http", function($scope, $http) {
    $scope.submit = function() {

        var url = "/signup";
        var user = {};
        $http.post(url, user)
            .success(function(res) {
                console.log("good");
            })
            .error(function(err) {
                console.log("bad");
                console.log(err);
            })
    }
}]);
