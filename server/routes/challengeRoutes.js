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
var createChallenge = require("../services/createChallenge");

var multipartyMiddleware = multiparty({uploadDir: "./client/imgDB"});

router.route("/challenge/create")
    .post(createChallenge);

router.route("/challenges/list")
    .post(function(req, res, next) {

        Challenge.find(function(err, challenges) {

            if (err) {
                return next(err);
            }

            res.send(challenges)

        });

    });

router.route("/challenge/upload")
    .post(multipartyMiddleware, upload.file);

router.route("/challenge/:id")
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
