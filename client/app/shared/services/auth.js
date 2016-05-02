/**
 * Created by Beppe on 2/05/2016.
 */

"use strict";

module.exports = angular.module("slideZapp")
    .service("auth", function auth($http, authToken, $state) {

        this.signin = function(email, password) {
            return $http.post("/signin", {
                email: email,
                password: password
            }).success(function(res) {
                authToken.setToken(res.token);
                if ($state.current.url === "/signup" || $state.current.url === "/signin") {
                    $state.go("home");
                }

            })

        };

        this.signup = function(email, password) {
            return $http.post("/signup", {
                email: email,
                password: password
            }).success(function(res) {
                authToken.setToken(res.token);
                $state.go("home");
            })
        };

    });
