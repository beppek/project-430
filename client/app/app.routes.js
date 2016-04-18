/**
 *
 * This file handles Angular routes
 *
 * @author: beppek
 *
 */

"use strict";

//TODO: Display error pages?
/**
 * Exports the routes
 * */
module.exports = angular.module("slideZapp").config(function($routeProvider) {

    $routeProvider

        .when("/", {
            templateUrl: "app/components/home/homeView.html",
            controller: "homeController"
        })
        .when("/second", {
            templateUrl: "views/pages/second.html",
            controller: "secondController"
        })

});
