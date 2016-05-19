/**
 * Sign Up Controller
 * @author beppek
 */

"use strict";

module.exports = angular.module("shutterSnappy")
    .controller("signupCtrl", ["$scope", "callout", "$auth", "$state", "nameService",
        function($scope, callout, $auth, $state, nameService) {

            /**
             * Signup on submit
             * */
            $scope.submit = function() {

                var newUser = {
                    email: $scope.email,
                    displayName: $scope.displayName,
                    password: $scope.password
                };

                $auth.signup(newUser)
                    .then(function(res) {
                        nameService.name = res.data.user.displayName;
                        callout("dark", "Sweet!", res.data.user.displayName + ", welcome to ShutterSnappy!");
                        $auth.login({
                            email: $scope.email,
                            password: $scope.password
                        }).then(function() {
                            checkState();
                        })
                    })
                    .catch(handleError);

            };

            /**
             * Authenticate user
             * */
            $scope.authenticate = function(provider) {
                $auth.authenticate(provider).then(function(res) {

                    var authProvider = provider.charAt(0).toUpperCase() + provider.slice(1);

                    nameService.name = res.data.user.displayName;
                    callout("dark", "Sweet!", "Welcome " + res.data.user.displayName + ", thanks for using " + authProvider);
                    checkState();

                }, handleError);
            };

            //TODO: Service
            function handleError(err) {
                callout("warning", "Oops!", err.data.message);
            }

            //TODO: Service
            function checkState() {

                if ($state.current.url === "/signup" || $state.current.url === "/signin") {
                    $state.go("home");
                }

            }

        }]);
