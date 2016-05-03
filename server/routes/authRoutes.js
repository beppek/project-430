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
var LocalStrategy = require("passport-local").Strategy;

//Passport setup
router.use(passport.initialize());
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

var strategyOptions = {
    usernameField: "email"
};

//Local Sign in Strategy setup
var localSigninStrategy = new LocalStrategy(strategyOptions, function(email, password, done) {

    var searchUser = {
        email: email
    };

    User.findOne(searchUser, function(err, user) {
        if (err) {
            return done(err);
        }

        if (!user) {
            return done(null, false, {
                message: "Wrong email/password!"
            });
        }

        user.comparePasswords(password, function(err, isMatch) {
            if (err) {
                return done(err);
            }

            if (!isMatch) {
                return done(null, false, {
                    message: "Wrong email/password!"
                });
            }

            return done(null, user);

        });

    })

});

//Local Sign up strategy setup
var localSignupStrategy = new LocalStrategy(strategyOptions, function(email, password, done) {

    var searchUser = {
        email: email
    };

    User.findOne(searchUser, function(err, user) {
        if (err) {
            return done(err);
        }

        if (user) {
            return done(null, false, {
                message: "Email already in use!"
            });
        }

        var newUser = new User({
            email: email,
            password: password
        });

        newUser.save(function(err) {
            if (err) {
                return done(err);
            } else {

                done(null, newUser);

            }
        });

    });

});

passport.use("local-signup", localSignupStrategy);
passport.use("local-signin", localSigninStrategy);


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
 * This function creates and sends a token
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
