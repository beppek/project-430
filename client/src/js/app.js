/**
 *
 * This is the starting point of the Client side application
 *
 * @author: beppek
 * @version: 1.0.0
 *
 */

"use strict";

// LOAD SETUP MODULE
var slideZapp = require("../../app/app.module.js");

// LOAD ROUTES
require("../../app/app.routes.js");

// LOAD SHARED

//Services
require("../../app/shared/services/nameService");

//Directives
require("../../app/shared/directives/validateEquals");

//Controllers
require("../../app/shared/controllers/signinCtrl");

// LOAD COMPONENTS

// Home
require("../../app/components/home/homeController");

// Leaderboard
require("../../app/components/leaderboard/leaderboardController");

// Upload
require("../../app/components/dashboard/dashboardController");

// Challenges
require("../../app/components/challenges/challengesController");

// Signup
require("../../app/components/signup/signupCtrl");

// Load own JS modules
var toggleNav = require("./toggleNav");

// Add listeners
$(document).ready(function() {

    $(document).foundation();

    var nav = $("#menu");

    //Toggle menu on click
    $("#menu-button").click(function(event) {

        event.preventDefault();
        if ($(nav).hasClass("menu-closed")) {
            toggleNav.open();
        } else {
            toggleNav.close();
        }

    });

    //Close menu when clicked outside
    $(".main-content").click(function(event) {

        event.preventDefault();
        if (!$(nav).is(event.target)) {
            if (!$(nav).hasClass("menu-closed")) {
                toggleNav.close();
            }
        }

    })

});
