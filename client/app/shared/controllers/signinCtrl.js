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
    .controller("signinCtrl", function($scope, callout, auth, $state, nameService) {
        $scope.submit = function() {

            auth.signin($scope.email, $scope.password)
                .success(function(res) {
                    nameService.name = res.user.email;
                    callout("success", "Good to see you!", "Welcome " + res.user.email);
                })
                .error(handleError)
        };

        $scope.google = function() {
            auth.googleAuth().then(function(res) {

                callout("success", "Good to see you!", "Welcome " + res.user.displayName);

            }, handleError);
        };

        function handleError(err) {
            callout("warning", "Oops!", err.message);
            if ($state.current.url !== "signin") {
                $state.go("signin");
            }
        }

    });
