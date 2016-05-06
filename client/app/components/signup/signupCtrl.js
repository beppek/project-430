/**
 * Created by Beppe on 24/04/2016.
 */

"use strict";

module.exports = angular.module("slideZapp")
    .controller("signupCtrl", ["$scope", "callout", "$auth", "$state", "nameService", function($scope, callout, $auth, $state, nameService) {
        $scope.submit = function() {

            $auth.signup({ email: $scope.email, password: $scope.password})
                .then(function(res) {
                    nameService.name = res.data.user.email;
                    callout("success", "Sweet!", "You're now registered with email: " + res.data.user.email);
                    $auth.login({
                        email: $scope.email,
                        password: $scope.password
                    }).then(function() {
                        checkState();
                    })
                })
                .catch(handleError);

        };

        $scope.authenticate = function(provider) {
            $auth.authenticate(provider).then(function(res) {

                var authProvider = provider.charAt(0).toUpperCase() + provider.slice(1);

                nameService.name = res.data.user.displayName;
                callout("success", "Sweet!", "Welcome " + res.data.user.displayName + ", thanks for using " + authProvider);
                checkState();

            }, handleError);
        };

        function handleError(err) {
            callout("warning", "Oops!", err.data.message);
        }

        function checkState() {

            if ($state.current.url === "/signup" || $state.current.url === "/signin") {
                $state.go("home");
            }

        }

    }]);
