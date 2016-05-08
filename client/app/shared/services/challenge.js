/**
 * Created by Beppe on 2/05/2016.
 */

"use strict";

module.exports = angular.module("slideZapp")
    .service("challengeService", ["$http", "Upload", function challengeService($http, Upload) {

        this.save = function(challenge) {
            return $http.post("/challenge/create", challenge);
        };

        this.get = function(id) {
            return $http.post("/challenge/" + id);
        };

    }]);
