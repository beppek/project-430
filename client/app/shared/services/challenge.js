/**
 * Created by Beppe on 2/05/2016.
 */

"use strict";

module.exports = angular.module("slideZapp")
    .service("challenge", function challenge($http) {

        this.save = function(challenge) {
            return $http.post("/challenge/create", challenge);
        };

    });
