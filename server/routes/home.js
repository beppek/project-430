/**
 * Router for the application
 * @author BeppeK
 */

"use strict";

//Requires
var router = require("express").Router();

var User = require("../models/User");
var jwt = require("jwt-simple");

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
 * Restrict access to upload page
 *
 * */
router.route("/upload")
    .get(function(req, res) {

        if (!req.headers.authorization) {
            res.status(401).send({
                message: "You are not authorized"
            });
        } else {

            var token = req.headers.authorization.split(" ")[1];
            var payload = jwt.decode(token, "shhh...");

            if (!payload.sub) {
                res.status(401).send({
                    message: "Authentication failed"
                });
            }

        }

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

        req.user = req.body;
        var searchUser = {
            email: req.user.email
        };

        User.findOne(searchUser, function(err, user) {
            if (err) {
                console.log(err);
            }

            if (user) {
                return res.status(401).send({message: "An account with that email already exists"});
            }

            var newUser = new User({
                email: req.user.email,
                password: req.user.password
            });

            newUser.save(function(err) {
                if (err) {
                    console.log(err);
                } else {
                    createSendToken(newUser, res);
                }
            });

        });

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

/**
 *
 * Handle the sign in functionality
 *
 * */
router.route("/signin")
    .post(function(req, res) {

        req.user = req.body;
        var searchUser = {
            email: req.user.email
        };

        User.findOne(searchUser, function(err, user) {
            if (err) {
                throw err;
            }

            if (!user) {
                return res.status(401).send({
                    message: "Wrong email/password!"
                });
            }

            user.comparePasswords(req.user.password, function(err, isMatch) {
                if (err) {
                    throw err;
                }

                if (!isMatch) {
                    return res.status(401).send({message: "Wrong email/password!"});
                }

                createSendToken(user, res);

            });

        })
    });

/**
 *
 * This function creates a token
 *
 * */
function createSendToken(user, res) {
    var payload = {
        sub: user.id
    };

    var token = jwt.encode(payload, "shhh...");

    res.status(200).send({
        user: user.toJSON(),
        token: token
    });
}


module.exports = router;
