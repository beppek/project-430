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
    .post(checkAuth.normal, challenge.create);

/**
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

/**
 * Gets the challenge
 * */
router.route("/challenge/:title")
    .get(function(req, res, next) {

        var decodedTitle = decodeURIComponent(req.params.title);

        var searchChallenge = {
            lcTitle: decodedTitle.toLowerCase()
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

/**
 * Gets the images of the challenge
 * */
router.route("/challenge/:id/images")
    .get(challenge.getImages);

module.exports = router;
