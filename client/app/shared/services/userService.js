/**
 * User Service
 * @author beppek
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
