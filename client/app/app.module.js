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
var ngRoute = require("angular-route");

// CREATE APP
var slideZapp = ng.module("slideZapp", [
    ngRoute
]);

module.exports = slideZapp;
