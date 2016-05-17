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
var shutterSnappy = ng.module("shutterSnappy", [
    uiRouter,
    ngAnimate,
    satellizer,
    ngFileUpload
]);

module.exports = shutterSnappy;
