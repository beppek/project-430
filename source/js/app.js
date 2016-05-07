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
require("../../client/app/app.module.js");

// LOAD SHARED
//Services
require("../../client/app/shared/services/nameService");
require("../../client/app/shared/services/callout");
require("../../client/app/shared/services/auth");
require("../../client/app/shared/services/challenge");
require("../../client/app/shared/services/challenges");

//Factories
require("../../client/app/shared/services/authToken");
require("../../client/app/shared/services/authInterceptor");

// LOAD ROUTES
require("../../client/app/app.routes.js");

//Directives
require("../../client/app/shared/directives/validateEquals");

//Controllers
require("../../client/app/shared/controllers/signinCtrl");
require("../../client/app/shared/controllers/menuCtrl");
require("../../client/app/shared/controllers/signoutCtrl");

// LOAD COMPONENTS
// Home
require("../../client/app/components/home/homeController");

// Leaderboard
require("../../client/app/components/leaderboard/leaderboardController");

// Upload
require("../../client/app/components/dash/dashCtrl");

// Challenges
require("../../client/app/components/challenges/challengesCtrl");
require("../../client/app/components/challenges/challenge/create/createChallengeCtrl");
require("../../client/app/components/challenges/challenge/challengeCtrl");
require("../../client/app/components/challenges/challenge/join/joinChallengeCtrl");

// Signup
require("../../client/app/components/signup/signupCtrl");

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
        toggleNav.toggle();
    });

    //Close menu when clicked outside
    $(".main-content").click(function(event) {

        if (!$(nav).is(event.target)) {
            if (!$(nav).hasClass("menu-closed")) {
                toggleNav.toggle();
            }
        }
    });

});
