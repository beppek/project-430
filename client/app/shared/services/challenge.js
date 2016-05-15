/**
 * Created by Beppe on 2/05/2016.
 */

"use strict";

module.exports = angular.module("shutterSnappy")
    .service("challengeService", ["$http", function challengeService($http) {

        this.save = function(challenge) {
            return $http.post("/challenge/create", challenge);
        };

        this.get = function(id) {
            return $http.post("/challenge/" + id);
        };

        this.vote = function(data) {
            return $http.post("/challenge/vote", data);
        };

        this.getImages = function(id) {
            return $http.get("/challenge/" + id);
        };

        // this.top10 = function(data) {
        //     return $http.post("/challenge/leaderboard", data);
        // };

    }]);
