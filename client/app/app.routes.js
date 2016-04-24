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
module.exports = angular.module("slideZapp").config(function($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.otherwise("/");
    
    $stateProvider
        .state("home", {
            url: "/",
            templateUrl: "app/components/home/homeView.html",
            controller: "homeController"
        })
        .state("leaderboard", {
            url: "/leaderboard",
            templateUrl: "app/components/leaderboard/leaderboardView.html",
            controller: "leaderboardController"
        })
        .state("upload", {
            url: "/upload",
            templateUrl: "app/components/dashboard/dashboardView.html",
            controller: "dashboardController"
        })
        .state("challenges", {
            url: "/challenges",
            templateUrl: "app/components/challenges/challengesView.html",
            controller: "challengesController"
        })
        .state("signup", {
            url: "/signup",
            templateUrl: "app/components/signup/signupView.html",
            controller: "signupCtrl"
        });

        // .when("/", {
        //     templateUrl: "app/components/home/homeView.html",
        //     controller: "homeController"
        // })
        // .when("/leaderboard", {
        //     templateUrl: "app/components/leaderboard/leaderboardView.html",
        //     controller: "leaderboardController"
        // })
        // .when("/upload", {
        //     templateUrl: "app/components/dashboard/dashboardView.html",
        //     controller: "dashboardController"
        // })
        // .when("/challenges", {
        //     templateUrl: "app/components/challenges/challengesView.html",
        //     controller: "challengesController"
        // })
        // .otherwise({
        //     redirectTo: "/"
        // });

});
