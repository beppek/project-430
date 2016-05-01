/**
 * Created by Beppe on 22/04/2016.
 */

/**
 * Exports the controller
 * */
module.exports = angular.module("slideZapp")
    .controller("dashboardController", ["$scope", "$http", "API_URL", "callout", function($scope, $http, API_URL, callout) {

    $http.get(API_URL + "upload")
        .success(function() {

        }).error(function(err) {
            callout("warning", "Unable to get upload", err.message);
        console.log(err);
        })

    }]);
