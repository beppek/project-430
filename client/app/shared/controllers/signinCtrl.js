/**
 *
 * Sign in functionality for:
 * - Local
 * - Google+
 * TBD:
 * - Facebook
 * - Instagram
 *
 */
module.exports = angular.module("slideZapp")
    .controller("signinCtrl", function($scope, callout, auth, $state, nameService, $auth) {
        $scope.submit = function() {

            // auth.signin($scope.email, $scope.password)
            //     .success(function(res) {
            //         nameService.name = res.user.email;
            //         callout("success", "Good to see you!", "Welcome " + res.user.email);
            //     })
            //     .error(handleError)
            $auth.login({
                email: $scope.email,
                password: $scope.password
            }).then(function(res) {
                nameService.name = res.data.user.email;
                callout("success", "Good to see you!", "Welcome back " + res.data.user.email);
                checkState();
            }).catch(handleError)

        };

        $scope.authenticate = function(provider) {
            // auth.googleAuth().then(function(res) {
            //
            //     callout("success", "Good to see you!", "Welcome " + res.user.displayName);
            //
            // }, handleError);
            $auth.authenticate(provider).then(function(res) {

                callout("success", "Good to see you!", "Welcome " + res.data.user.displayName);
                checkState();

            }, handleError);
        };

        function handleError(err) {
            console.log(err);
            callout("warning", "Oops!", err.data.message);
            if ($state.current.url !== "signin") {
                $state.go("signin");
            }
        }

        function checkState() {

            if ($state.current.url === "/signup" || $state.current.url === "/signin") {
                $state.go("home");
            }

        }

    });
