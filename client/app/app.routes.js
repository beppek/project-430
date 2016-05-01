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
        })
        .state("about", {
            url: "/about",
            templateUrl: "app/components/about/aboutView.html"
        })
        .state("signout", {
            url: "/signout",
            controller: "signoutCtrl"
        });


});
