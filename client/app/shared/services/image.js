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
             * Get image
             * */
            this.getImage = function(id) {
                return $http.get("/image/" + id);
            };

            /**
             * Delete Image
             * */
            this.deleteImg = function(data) {
                return $http.post("/image/delete", data);
            };

            /**
             * Update image
             * */
            this.updateImg = function(data) {
                return $http.post("/image/update", data);
            };

        }]);
