/**
 * Created by Beppe on 1/05/2016.
 */

"use strict";

module.exports = angular.module("slideZapp")
    .controller("signoutCtrl", function(authToken, $state) {
        authToken.removeToken();
        $state.go("home");
    });
