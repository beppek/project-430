/**
 *
 * Creates a new challenge in the database
 *
 */

"use strict";

var Challenge = require("../models/Challenge");
var User = require("../models/User");
var Image = require("../models/Image");

module.exports = {
    create: createChallenge,
    getImages: getChallengeImages,
    deleteChallenge: deleteChallenge
};

/**
 *
 * This function gets all images related to the challenge
 *
 * */
function getChallengeImages(req, res, next) {

    var challengeId = req.params.id;

    var searchImages = {
        challenge: challengeId
    };

    Image.find(searchImages, function(err, images) {

        if (err) {
            return next(err);
        }

        res.send(images);

    });

}

/**
 *
 * This function creates a challenge
 *
 * */
function createChallenge(req, res, next) {

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

            User.findOneAndUpdate(searchUser, {$addToSet: {"stats.createdChallenges": newChallenge._id}}, {new:true}, function(err, user) {

            });

            return res.send(newChallenge)

        });

    });

}

/**
 * Deletes the challenge
 * */
function deleteChallenge(req, res, next) {

    var searchChallenge = {
        _id: req.body.challengeId
    };

    var searchImage = {
        challenge: req.body.challengeId
    };

    Image.find(searchImage, function(err, images) {
        if (err) {
            return next(err);
        }

        images.forEach(function(image) {

            var searchUser = {
                "stats.uploadedImages": image._id
            };

            User.findOneAndUpdate(searchUser, {$pull: {"stats.uploadedImages": image._id}}, {new:true}, function(err, user) {

                if (err) {
                    return next(err);
                }

            });

        });

    });

    Image.remove(searchImage, function(err) {
        if (err) {
            return next(err);
        }
    });

    Challenge.remove(searchChallenge, function(err) {
        if (err) {
            return next(err);
        }

        var searchUser = {
            _id: req.body.creatorId
        };

        User.findOneAndUpdate(searchUser, {$pull: {"stats.createdChallenges": req.body.challengeId}}, {new:true}, function(err) {

            if (err) {
                return next(err);
            }

        });

        next();

    });

}

