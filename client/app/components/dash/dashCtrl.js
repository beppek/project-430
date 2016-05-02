/**
 * Created by Beppe on 22/04/2016.
 */

/**
 * Exports the controller
 * */
module.exports = angular.module("slideZapp")
    .controller("dashboardController", ["$scope", "$http", "callout", "$state", function($scope, $http, callout, $state) {

        $http.get("/upload")
            .success(function() {

            }).error(function(err) {
                callout("warning", "Unable to get upload", err.message);
                $state.go("signin");
            })

    }]);
