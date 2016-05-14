/**
 * Created by Beppe on 1/05/2016.
 */

"use strict";

module.exports = angular.module("shutterSnappy")
    .controller("signoutCtrl", function(authToken, $state, $auth, callout) {
        $auth.logout();
        callout("success", "You've signed out!", "Bye bye now");
        $state.go("home");
    });
