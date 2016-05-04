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
var uiRouter = require("angular-ui-router");
var ngAnimate = require("angular-animate");
var satellizer = require("satellizer");

// CREATE APP
var slideZapp = ng.module("slideZapp", [
    uiRouter,
    ngAnimate,
    satellizer
]);

module.exports = slideZapp;
