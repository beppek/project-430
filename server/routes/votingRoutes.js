/**
 * Routes to handle voting on the backend
 * @author beppek
 */

"use strict";

//Require
var router = require("express").Router();
var Image = require("../models/Image");
var Challenge = require("../models/Challenge");


/**
 * Vote for image
 * */
router.route("/image/vote")
    .post(function(req, res, next) {

        var searchImage = {
            _id: req.body.imageId
        };

        Image.findOneAndUpdate(searchImage, {$addToSet: {"stats.votes": req.body.userId}}, {new:true}, function(err, image) {

            if (err) {
                return next(err);
            }

            return res.send(image.stats.votes);

        })

    });

/**
 * Unvote for image
 * */
router.route("/image/unvote")
    .post(function(req, res, next) {

        var searchImage = {
            _id: req.body.imageId
        };

        Image.findOneAndUpdate(searchImage, {$pull: {"stats.votes": req.body.userId}}, {new:true}, function(err, image) {

            if (err) {
                return next(err);
            }

            return res.send(image.stats.votes);

        })


    });


/**
 * Vote for challenge
 * */
router.route("/challenge/vote")
    .post(function(req, res, next) {

        var searchChallenge = {
            _id: req.body.challengeId
        };

        Challenge.findOneAndUpdate(searchChallenge, {$addToSet: {"stats.votes": req.body.userId}}, {new:true}, function(err, challenge) {

            if (err) {
                return next(err);
            }

            return res.send(challenge.stats.votes);

        })

    });

/**
 * Unvote for challenge
 * */
router.route("/challenge/unvote")
    .post(function(req, res, next) {

        var searchChallenge = {
            _id: req.body.challengeId
        };

        Challenge.findOneAndUpdate(searchChallenge, {$pull: {"stats.votes": req.body.userId}}, {new:true}, function(err, challenge) {

            if (err) {
                return next(err);
            }

            return res.send(challenge.stats.votes);

        })

    });

module.exports = router;
