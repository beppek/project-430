/**
 * 
 * This service gets all the challenges from the database
 * 
 */

"use strict";

module.exports = angular.module("slideZapp")
    .service("challenges", ["$http", function challenges($http) {

        this.get = function() {
            return $http.post("/challenges/list")
        };
    
    }]);
