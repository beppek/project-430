/**
 * Router for the application
 * @author BeppeK
 */

"use strict";

//Requires
var router = require("express").Router();

/**
 *
 * Serve up the starting page of the application
 *
 * */
router.route("/")
    .get(function(req, res) {
        res.sendFile("index.html", {root: "/client/"});
    })
    .post(function(req, res) {
        res.status(400);
        res.send("You didn't GET it!");
    });

/**
 *
 * Redirect to leaderboard with hashbang
 *
 * */
router.route("/leaderboard")
    .get(function(req, res) {
        res.redirect("/#/leaderboard");
    });

/**
 *
 * Redirect to upload with hashbang
 *
 * */
router.route("/upload")
    .get(function(req, res) {
        res.redirect("/#/upload");
    });

/**
 *
 * Redirect to challenges with hashbang
 *
 * */
router.route("/challenges")
    .get(function(req, res) {
        res.redirect("/#/challenges");
    });

module.exports = router;
