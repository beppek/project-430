/**
 * Sign out Controller
 * @author beppek
 */

"use strict";

module.exports = angular.module("shutterSnappy")
    .controller("signoutCtrl", ["$state", "$auth", "callout",
        function($state, $auth, callout) {
            $auth.logout();
            callout("dark", "You've signed out!", "Bye bye now");
            $state.go("home");
        }]);
