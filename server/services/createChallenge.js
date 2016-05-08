/**
 *
 * Creates a new challenge in the database
 *
 */

"use strict";

var Challenge = require("../models/Challenge");
var User = require("../models/User");

module.exports = function(req, res, next) {

    var searchChallenge = {
        title: req.body.title
    };

    var searchUser = {
        _id: req.body.userId
    };

    var createdByName;

    User.findOneAndUpdate(searchUser, {$inc: { "stats.createdChallenges": 1 } }, function(err, user) {
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

        var createdBy = {
            createdByName: createdByName,
            createdById: req.body.userId
        };

        var newChallenge = new Challenge({
            createdBy: createdBy,
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

};
