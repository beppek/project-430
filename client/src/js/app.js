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
require("../../app/app.module.js");

// LOAD SHARED
//Services
require("../../app/shared/services/nameService");
require("../../app/shared/services/callout");

// LOAD ROUTES
require("../../app/app.routes.js");

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

// LOAD OWN JS MODULES
var toggleNav = require("./toggleNav");

// Add listeners
$(document).ready(function() {

    //Initialize foundation
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

        if (!$(nav).is(event.target)) {
            if (!$(nav).hasClass("menu-closed")) {
                toggleNav.close();
            }
        }
    });

});
