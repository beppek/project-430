/**
 * Created by Beppe on 4/05/2016.
 */

"use strict";

//Requires
var User = require("../models/User");
var LocalStrategy = require("passport-local").Strategy;

var strategyOptions = {
    usernameField: "email"
};

var signupOptions = {
    usernameField: "email",
    passReqToCallback: true
};

//Local Sign in Strategy setup
var signin = new LocalStrategy(strategyOptions, function(email, password, done) {

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
var signup = new LocalStrategy(signupOptions, function(req, email, password, done) {

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
            displayName: req.body.displayName,
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

module.exports = {
    signin: signin,
    signup: signup
};
