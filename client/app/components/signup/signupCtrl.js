/**
 * Created by Beppe on 24/04/2016.
 */

"use strict";

module.exports = angular.module("slideZapp")
    .controller("signupCtrl", ["$scope", "callout", "auth", "$auth", "$state", function($scope, callout, auth, $auth, $state) {
        $scope.submit = function() {

            $auth.signup({ email: $scope.email, password: $scope.password})
                .then(function(res) {
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

                callout("success", "Sweet!", "Welcome " + res.data.user.displayName + ", thanks for using Google");
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
