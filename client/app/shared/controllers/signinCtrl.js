/**
 *
 * Sign in functionality for:
 * - Local
 * - Google+
 * - Facebook
 * TBD:
 * - Instagram
 *
 */
module.exports = angular.module("slideZapp")
    .controller("signinCtrl", function($scope, callout, $state, nameService, $auth) {
        $scope.submit = function() {

            $auth.login({
                email: $scope.email,
                password: $scope.password
            }).then(function(res) {
                nameService.name = res.data.user.displayName;
                callout("success", "Good to see you!", "Welcome back " + res.data.user.displayName);
                checkState();
            }).catch(handleError)

        };

        $scope.authenticate = function(provider) {
            $auth.authenticate(provider).then(function(res) {

                var authProvider = provider.charAt(0).toUpperCase() + provider.slice(1);

                nameService.name = res.data.user.displayName;
                callout("success", "Good to see you!", "Welcome " + res.data.user.displayName + ", thanks for signing in with " + authProvider);
                checkState();

            }, handleError);
        };

        //TODO: Rewrite as service
        function handleError(err) {
            console.log(err);
            callout("warning", "Oops!", err.data.message);
            if ($state.current.url !== "signin") {
                $state.go("signin");
            }
        }

        //TODO: Rewrite as service
        function checkState() {

            if ($state.current.url === "/signup" || $state.current.url === "/signin") {
                $state.go("home");
            }

        }

    });
