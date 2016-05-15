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
var multiparty = require("connect-multiparty");
var upload = require("../services/upload");
var challenge = require("../services/challenge");

var multipartyMiddleware = multiparty({uploadDir: "./client/imgDB"});

router.route("/challenge/create")
    .post(challenge.create);

/**
 * TODO: CHANGE TO GET
 * POST for list of all challenges
 * */
router.route("/challenges/list")
    .post(function(req, res, next) {

        Challenge.find(function(err, challenges) {

            if (err) {
                return next(err);
            }

            res.send(challenges)

        });

    });

/**
 * POST to upload image to challenge
 * */
router.route("/challenge/upload")
    .post(multipartyMiddleware, upload.file);

// /**
//  * POST for the leaderboard
//  * */
// router.route("/challenge/leaderboard")
//     .post(function(req, res, next) {
//         console.log(req);
//     });

router.route("/challenge/:id")
    .get(challenge.getImages)
    .post(function(req, res, next) {

        var searchChallenge = {
            _id: req.params.id
        };

        Challenge.findOne(searchChallenge, function(err, challenge) {

            if (err) {
                return next(err);
            }

            if (challenge) {
                return res.send(challenge);
            }

        });

    });

router.route("/challengeName/:id").get(function(req, res, next) {

    var searchChallenge = {
        _id: req.params.id
    };

    Challenge.findOne(searchChallenge, function(err, challenge) {

        if (err) {
            return next(err);
        }

        if (challenge) {
            return res.send(challenge.title);
        }

    });

});

module.exports = router;
