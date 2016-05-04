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
var request = require("request");
var moment = require("moment");
var facebookAuth = require("../services/facebookAuth");
var createSendToken = require("../services/jwt");

//Load in secrets set as ENV_VARIABLEs in production
var secrets = require("../../secrets");

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
 * Handles sign in with Google OAuth
 *
 * */
router.route("/auth/google")
    .get(function(req, res) {
        res.redirect("/#/signin");
    })
    .post(function(req, res, next) {

        var url = "https://www.googleapis.com/oauth2/v4/token";
        var apiUrl = "https://www.googleapis.com/plus/v1/people/me/openIdConnect";

        var params = {
            code: req.body.code,
            client_id: req.body.clientId,
            client_secret: secrets.oauthClientSecret,
            redirect_uri: req.body.redirectUri,
            grant_type: "authorization_code"
        };

        request.post(url, {
            json: true,
            form: params
        }, function(err, response, token) {
            if (err) {
                return next(err);
            }

            var accessToken = token.access_token;
            var tokenType = token.token_type + " ";
            var headers = {
                Authorization: tokenType + accessToken
            };

            request.get({
                url: apiUrl,
                headers: headers,
                json: true
            }, function(err, response, profile) {

                User.findOne({googleId: profile.sub}, function(err, user) {
                    if (err) {
                        return next(err);
                    }

                    if (user) {
                        return createSendToken(user, res);
                    }

                    var newUser = new User({
                        email: profile.email,
                        googleId: profile.sub,
                        displayName: profile.name
                    });

                    newUser.save(function(err) {
                        if (err) {
                            return next(err);
                        } else {

                            createSendToken(newUser, res);

                        }
                    });

                })

            })

        });
    });

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
router.route("/upload")
    .get(function(req, res) {


        // if (!localStorage.satellizer_token) {
        //     res.status(401).send({
        //         message: "You are not authorized"
        //     });
        // } else {
        //
        //     var token = localStorage.satellizer_token.split(" ")[1];
        //     var payload = jwt.decode(token, "shhh...");
        //
        //     if (!payload.sub) {
        //         res.status(401).send({
        //             message: "Authentication failed"
        //         });
        //     }
        //
        // }

    });

module.exports = router;
