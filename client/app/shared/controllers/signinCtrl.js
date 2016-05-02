/**
 * Created by Beppe on 24/04/2016.
 */

module.exports = angular.module("slideZapp")
    .controller("signinCtrl", function($scope, callout, auth) {
        $scope.submit = function() {

            auth.signin($scope.email, $scope.password)
                .success(function(res) {
                    callout("success", "Good to see you!", "Welcome back " + res.user.email);
                })
                .error(function(err) {
                    callout("warning", "Oops!", err.message);
                })
        }
    });
