/**
 * Created by Beppe on 1/05/2016.
 */

"use strict";

module.exports = angular.module("slideZapp").factory("authInterceptor", function(authToken) {
        return {
            request: function(config) {
                var token = authToken.getToken();

                if (token) {
                    config.headers.authorization = "Bearer " + token;
                }

                return config;

            },

            response: function(response) {
                return response;
            }
        }
    });
