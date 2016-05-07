/**
 * Router for the authorization pages of application
 * @author BeppeK
 */

"use strict";

//Requires
var router = require("express").Router();
var User = require("../models/User");
var jwt = require("jwt-simple");
var passport = require("passport");
var LocalStrategy = require("../services/localStrategy");
var facebookAuth = require("../services/facebookAuth");
var googleAuth = require("../services/googleAuth");
var createSendToken = require("../services/jwt");
var upload = require("../services/upload");

//Passport setup
router.use(passport.initialize());
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use("local-signup", LocalStrategy.signup);
passport.use("local-signin", LocalStrategy.signin);

/**
 *
 * @get redirects to signup with hashbang
 * @post handles signup requests
 *
 * */
router.route("/signup")
    .get(function(req, res) {
        res.redirect("/#/signup");
    })
    .post(function(req, res, next) {

        passport.authenticate("local-signup", function(err, user, info) {

            if (err) {
                next(err);
            }

            if (!user) {
                return res.status(401).send(info);
            }

            req.login(user, function(err) {

                if (err) {
                    next(err);
                }

                if (!user) {
                    return res.status(401).send(info);
                }

                createSendToken(user, res);

            });

        })(req, res, next);

    });

/**
 *
 * Handle the sign in functionality
 *
 * */
router.route("/signin")
    .get(function(req, res) {
        res.redirect("/#/signin");
    })
    .post(function(req, res, next) {

        passport.authenticate("local-signin", function(err, user, info) {

            if (err) {
                next(err);
            }

            req.login(user, function(err) {

                if (err) {
                    next(err);
                }

                if (!user) {
                    return res.status(401).send(info);
                }

                createSendToken(user, res);

            });

        })(req, res, next);

    });

/**
 *
 * Handles sign in with Google OAuth
 *
 * */
router.route("/auth/google")
    .get(function(req, res) {
        res.redirect("/#/signin");
    })
    .post(googleAuth);

/**
 *
 * Handles sign in with Facebook
 *
 * */
router.route("/auth/facebook")
    .get(function(req, res) {
        res.redirect("/#/signin");
    })
    .post(facebookAuth);

/**
 *
 * Restrict access to upload page
 *
 * */
router.route("/challenge/:id/join")
    .get(upload);

module.exports = router;
