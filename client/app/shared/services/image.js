/**
 * Image Service
 * @author beppek
 */

"use strict";

module.exports = angular.module("shutterSnappy")
    .service("imageService", ["$http",
        function imageService($http) {

            /**
             * Vote
             * */
            this.vote = function(data) {
                return $http.post("/image/vote", data);
            };

            /**
             * Unvote
             * */
            this.unVote = function(data) {
                return $http.post("/image/unvote", data);
            };

            /**
             * Delete Image
             * */
            this.deleteImg = function(data) {
                return $http.post("/image/delete", data);
            };
            
            this.update = function(data) {
                return $http.post("/image/update", data);
            };

        }]);
