/**
 * Created by Beppe on 2/05/2016.
 */

"use strict";

module.exports = angular.module("shutterSnappy")
    .service("auth", function auth($http, authToken, $state, $window, $q) {

        function authSuccessful(res) {

            authToken.setToken(res.token);
            if ($state.current.url === "/signup" || $state.current.url === "/signin") {
                $state.go("home");
            }

        }

        this.signin = function(email, password) {
            return $http.post("/signin", {
                email: email,
                password: password
            }).success(authSuccessful)

        };

        this.signup = function(email, password) {
            return $http.post("/signup", {
                email: email,
                password: password
            }).success(authSuccessful)
        };

        this.googleAuth = function() {

            var urlBuilder = [];
            var clientId = "288476738545-srv0bg4vvfv7tjimqttr2g1hcm6pheni.apps.googleusercontent.com";
            urlBuilder.push("response_type=code",
                "client_id=" + clientId,
                "redirect_uri=" + window.location.origin,
                "scope=profile email"
            );

            var url = "https://accounts.google.com/o/oauth2/v2/auth?" + urlBuilder.join("&");
            var opts = "width=500, height=500, left="+ ($window.outerWidth - 500) / 2 + ",top=" + ($window.outerHeight - 500) / 2.5;

            var deferred = $q.defer();

            var popup = $window.open(url, "", opts);
            $window.focus();

            $window.addEventListener("message", function(event) {
                if (event.origin === $window.location.origin) {
                    var code = event.data;
                    popup.close();

                    $http.post("/auth/google", {
                        code: code,
                        clientId: clientId,
                        redirectUri: window.location.origin
                    }).success(function(res) {
                        authSuccessful(res);
                        deferred.resolve(res);
                    });
                }
            });

            return deferred.promise;

        }

    });
