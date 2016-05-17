/**
 * Challenges Service
 */

"use strict";

module.exports = angular.module("shutterSnappy")
    .service("challenges", ["$http",
        function challenges($http) {

            /**
             * Call to list all challenges
             * */
            this.listAll = function() {
                return $http.get("/challenges/list")
            };

        }]);
