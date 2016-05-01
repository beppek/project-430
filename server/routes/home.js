/**
 * Router for the application
 * @author BeppeK
 */

"use strict";

//Requires
var router = require("express").Router();
var User = require("../models/User");

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

/**
 *
 * Redirect to signup with hashbang
 *
 * */
router.route("/signup")
    .get(function(req, res) {
        res.redirect("/#/signup");
    })
    .post(function(req, res) {
        console.log(req.body);

        var user = req.body;

        var newUser = new User({
            email: user.email,
            password: user.password
        });

        newUser.save(function(err) {
            if (err) {
                console.log(err);
            } else {
                res.status(200).json(newUser);
            }
        })

    });

/**
 *
 * Redirect to about with hashbang
 *
 * */
router.route("/about")
    .get(function(req, res) {
        res.redirect("/#/about");
    });

module.exports = router;
