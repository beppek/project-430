/**
 * Dashboard Controller
 * @author beppek
 */

"use strict";

module.exports = angular.module("shutterSnappy")
    .controller("dashboardController", ["$scope", "$http", "callout", "$state",
        function($scope, $http, callout, $state) {

            $http.get("/upload")
                .success(function() {

                }).error(function(err) {
                    callout("warning", "Unable to get upload", err.message);
                    $state.go("signin");
                })

        }]);
