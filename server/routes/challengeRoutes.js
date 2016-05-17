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
var fileService = require("../services/fileService");
var challenge = require("../services/challenge");
var checkAuth = require("../services/checkAuth");

var multipartyMiddleware = multiparty({uploadDir: "./client/imgDB"});

router.route("/challenge/create")
    .post(challenge.create);

/**
 * TODO: CHANGE TO GET
 * POST for list of all challenges
 * */
router.route("/challenges/list")
    .get(function(req, res, next) {

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
    .post(multipartyMiddleware, fileService.upload);

/**
 * POST to delete challenge
 * */
router.post("/challenge/delete", checkAuth.forDelete, challenge.deleteChallenge, fileService.deleteChallenge);

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

module.exports = router;
