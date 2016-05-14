/**
 *
 * @author beppek
 * This service handles user related functions
 *
 */

"use strict";

module.exports = angular.module("shutterSnappy")
    .service("userService", ["$http", "$auth",
        function userService($http, $auth) {

            this.getId = function() {
                var payload = $auth.getPayload();

                return payload.sub;
            };

        }]);
