/**
 * Created by Beppe on 24/04/2016.
 */

module.exports = angular.module("slideZapp")
    .controller("signinCtrl", function($scope) {
        $scope.submit = function() {
            console.log("hello");
        }
    });
