/**
 *
 * SETUP
 * This file sets up the app
 *
 * @author: beppek
 *
 */

"use strict";

// LOAD ANGULAR AND DEPENDENCIES
var ng = require("angular");
// var ngRoute = require("angular-route");
var uiRouter = require("angular-ui-router");

// CREATE APP
var slideZapp = ng.module("slideZapp", [
    uiRouter
]);

module.exports = slideZapp;
