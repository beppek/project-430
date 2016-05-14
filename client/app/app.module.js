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
var ngFileUpload = require("ng-file-upload");

// CREATE APP
var slideZapp = ng.module("shutterSnappy", [
    uiRouter,
    ngAnimate,
    satellizer,
    ngFileUpload
]);

module.exports = slideZapp;
