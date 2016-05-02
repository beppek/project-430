/**
 * Created by Beppe on 24/04/2016.
 */

module.exports = angular.module("slideZapp")
    .controller("signinCtrl", function($scope, $http, callout, authToken) {
        $scope.submit = function() {

            var url = "/signin";
            var user = {
                email: $scope.email,
                password: $scope.password
            };
            $http.post(url, user)
                .success(function(res) {
                    callout("success", "Good to see you!", "Welcome back " + res.user.email);
                    authToken.setToken(res.token);
                })
                .error(function(err) {
                    callout("warning", "Oops!", "Something went wrong", err.message);
                })
        }
    });
