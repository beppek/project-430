/**
 * Created by Beppe on 2/05/2016.
 */

"use strict";

module.exports = angular.module("slideZapp")
    .service("auth", function auth($http, authToken, $state, $window) {

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

        this.googleAuth = function() {

            var urlBuilder = [];
            urlBuilder.push("response_type=code",
                "client_id=288476738545-srv0bg4vvfv7tjimqttr2g1hcm6pheni.apps.googleusercontent.com",
                "redirect_uri=" + window.location.origin,
                "scope=profile email"
            );

            var url = "https://accounts.google.com/o/oauth2/v2/auth?" + urlBuilder.join("&");
            var opts = "width=500, height=500, left="+ ($window.outerWidth - 500) / 2 + ",top=" + ($window.outerHeight - 500) / 2.5;

            var popup = $window.open(url, "", opts);
            $window.focus();

            $window.addEventListener("message", function(event) {
                if (event.origin === $window.location.origin) {
                    var code = event.data;
                    popup.close();

                    $http.post("/auth/google", {code: code});
                }
            })
        }

    });
