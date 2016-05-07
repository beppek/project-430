/**
 * Router for the challenge functions of application
 * @author BeppeK
 */

"use strict";

//Requires
var router = require("express").Router();
var Challenge = require("../models/Challenge");
var User = require("../models/User");
var jwt = require("jwt-simple");

router.route("/challenge/create")
    .post(function(req, res, next) {

        console.log(req.body);

        var searchChallenge = {
            title: req.body.title
        };

        var searchUser = {
            _id: req.body.userId
        };

        var createdByName;

        User.findOne(searchUser, function(err, user) {
            if (err) {
                return next(err);
            }

            if (user) {
                createdByName = user.displayName;
            }else {
                return res.status(401).send({
                    message: "You must have been logged out, log back in and try again."
                });
            }

        });

        Challenge.findOne(searchChallenge, function(err, challenge) {

            if (err) {
                return next(err);
            }

            if (challenge) {
                return res.send({
                    message: "Title already in use, pick a unique title for your challenge."
                });
            }

            var newChallenge = new Challenge({
                createdByName: createdByName,
                createdById: req.body.userId,
                title: req.body.title,
                description: req.body.description
            });

            newChallenge.save(function(err) {
                if (err) {
                    return next(err);
                }

                res.send(newChallenge)

            });

        });

    });

module.exports = router;
