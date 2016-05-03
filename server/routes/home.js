/**
 * Router for the application
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

//Local Strategy setup
var localStrategy = new LocalStrategy({
    usernameField: "email"
}, function(email, password, done) {

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

passport.use(localStrategy);

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
 * @get redirects to signup with hashbang
 * @post handles signup requests
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
router.post("/signin", (function(req, res, next) {

    passport.authenticate("local", function(err, user) {

        if (err) {
            next(err);
        }

        req.login(user, function(err) {

            if (err) {
                next(err);
            }

            createSendToken(user, res);

        });

    })(req, res, next);

}));

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
