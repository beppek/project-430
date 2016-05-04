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
module.exports = angular.module("slideZapp").config(function($urlRouterProvider, $stateProvider, $httpProvider) {

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
            templateUrl: "app/components/dash/dashView.html",
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
        .state("signin", {
            url: "/signin",
            templateUrl: "app/components/signin/signinView.html",
            controller: "signinCtrl"
        })
        .state("about", {
            url: "/about",
            templateUrl: "app/components/about/aboutView.html"
        })
        .state("signout", {
            url: "/signout",
            controller: "signoutCtrl"
        });

    $httpProvider.interceptors.push("authInterceptor");

})

.constant("API_URL", "http://localhost:8000/")

.run(function($window) {
    var params = {};
    var queryString = $window.location.search.substring(1);
    var regex = /([^&=]+)=([^&]*)/g;
    var m;

    if (queryString && $window.opener && $window.opener.location.origin === $window.location.origin) {

        while (m = regex.exec(queryString)) {
            params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        }

        var code = params.code;

        $window.opener.postMessage(code, $window.location.origin);
    }

});
