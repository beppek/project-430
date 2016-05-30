/**
 *
 * Sign in Controller using:
 * - Local
 * - Google+
 * - Facebook
 * TODO:
 * - Instagram
 *
 */
module.exports = angular.module("shutterSnappy")
    .controller("signinCtrl", ["$scope", "callout", "$state", "nameService", "$auth", "socket",
        function($scope, callout, $state, nameService, $auth, socket) {

            /**
             * Login on submit
             * */
            $scope.submit = function() {

                $auth.login({
                    email: $scope.email,
                    password: $scope.password
                }).then(function(res) {
                    nameService.name = res.data.user.displayName;
                    callout("dark", "Good to see you!", "Welcome " + res.data.user.displayName);
                    checkState();
                }).catch(handleError)

            };

            /**
             * Authenticate user
             * */
            $scope.authenticate = function(provider) {
                $auth.authenticate(provider).then(function(res) {

                    var authProvider = provider.charAt(0).toUpperCase() + provider.slice(1);

                    nameService.name = res.data.user.displayName;
                    callout("dark", "Good to see you!", "Welcome " + res.data.user.displayName + ", thanks for signing in with " + authProvider);
                    checkState();

                }, handleError);
            };

            function handleError(err) {
                callout("dark", "Oops!", err.data.message);
                if ($state.current.url !== "signin") {
                    $state.go("signin");
                }
            }

            function checkState() {

                if ($state.current.url === "/signup" || $state.current.url === "/signin" || $state.current.name === "home") {
                    $state.go("challenges");
                }

            }

        }]);
