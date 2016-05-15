/**
 * Handles image related functionality on front end
 * @author beppek
 */

"use strict";

module.exports = angular.module("shutterSnappy")
    .service("imageService", ["$http", function imageService($http) {

        this.vote = function(data) {
            return $http.post("/image/vote", data);
        };

        this.checkVoted = function(data) {
            return $http.post("/image/checkvoted", data);
        }

    }]);
