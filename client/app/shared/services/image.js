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

        this.unVote = function(data) {
            return $http.post("/image/unvote", data);
        };

        this.deleteImg = function(data) {
            return $http.post("/image/delete", data);
        }

    }]);
