/**
 * Router for the application
 * @author BeppeK
 */

"use strict";

//Requires
var router = require("express").Router();

var User = require("../models/User");
var jwt = require("../services/jwt");

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

        if (!req.headers.authorization) {
            res.status(401).send({
                message: "You are not authorized"
            });
        }

        console.log(req.headers.authorization);

        var token = req.headers.authorization.split(" ")[1];
        var payload = jwt.decode(token, "shhh...");

        if (!payload.sub) {
            res.status(401).send({
                message: "Authentication failed"
            });
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
        console.log(req.body);

        var user = req.body;

        var newUser = new User({
            email: user.email,
            password: user.password
        });

        var payload = {
            iss: req.hostname,
            sub: newUser.id
        };

        var token = jwt.encode(payload, "shhh...");

        newUser.save(function(err) {
            if (err) {
                console.log(err);
            } else {
                res.status(200).send({
                    user: newUser.toJSON(),
                    token: token
                });
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

/**
 *
 * Delete user
 * OBS! DEV ONLY
 *
 * */
router.route("/user/delete/:email")
    .get(function(req, res) {
        res.redirect("/#/user/delete/:email")
    })
    .post(function(req, res) {

        //Remove user
        User.remove({email: req.params.email}, function(err) {
            if (err) {
                throw err;
            }

            //Create flash message
            // req.session.flash = {
            //     type: "success",
            //     intro: "User deleted!",
            //     message: req.session.username + ", you've successfully deleted the user."
            // };

            //Redirect to home
            res.redirect(303, "/#/users");

        })

    });

module.exports = router;
