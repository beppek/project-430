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
        .when("/leaderboard", {
            templateUrl: "app/components/leaderboard/leaderboardView.html",
            controller: "leaderboardController"
        })
        .when("/dashboard", {
            templateUrl: "app/components/dashboard/dashboardView.html",
            controller: "dashboardController"
        })
        .when("/challenges", {
            templateUrl: "app/components/challenges/challengesView.html",
            controller: "challengesController"
        })
        .otherwise({
            redirectTo: "/"
        });

});
