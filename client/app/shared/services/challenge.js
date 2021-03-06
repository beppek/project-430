/**
 * Challenge Service
 * @author beppek
 */

"use strict";

module.exports = angular.module("shutterSnappy")
    .service("challengeService", ["$http",
        function challengeService($http) {

            this.save = function(challenge) {
                return $http.post("/challenge/create", challenge);
            };

            this.get = function(title) {
                return $http.get("/challenge/" + title);
            };

            this.vote = function(data) {
                return $http.post("/challenge/vote", data);
            };

            this.getImages = function(id) {
                return $http.get("/challenge/" + id + "/images");
            };

            this.unVote = function(data) {
                return $http.post("/challenge/unvote", data);
            };

            this.deleteChallenge = function(data) {
                return $http.post("/challenge/delete", data);
            };

            this.updateChallenge = function(data) {
                return $http.post("/challenge/update", data);
            }

        }]);
