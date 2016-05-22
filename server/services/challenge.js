/**
 * Creates a new challenge in the database
 * @author beppek
 */

"use strict";

var Challenge = require("../models/Challenge");
var User = require("../models/User");
var Image = require("../models/Image");

module.exports = {
    create: createChallenge,
    getImages: getChallengeImages,
    deleteChallenge: deleteChallenge,
    getChallenge: getChallenge,
    update: updateChallenge
};

/**
 * This function gets all images related to the challenge
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
 * This function creates a challenge
 * */
function createChallenge(req, res, next) {

    console.log(req.body.category);

    var lcTitle = req.body.title.toLowerCase();

    if (lcTitle === "create" || lcTitle === "update" || lcTitle === "read" || lcTitle === "delete") {
        return res.status(401).send({
            message: "That name is not allowed!"
        })
    }

    var searchChallenge = {
        lcTitle: lcTitle
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
            return res.status(403).send({
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
            lcTitle: req.body.title.toLowerCase(),
            description: req.body.description,
            category: req.body.category
        });

        newChallenge.save(function(err) {
            if (err) {
                return console.log(err);
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

/**
 * Gets the challenge
 * */
function getChallenge(req, res, next) {

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

        return res.status(404).send({message: "Call Sherlock! The challenge is missing!"})

    });

}

/**
 * Updates the challenge
 * */
function updateChallenge(req, res, next) {

    var searchChallenge = {
        _id: req.body.challengeId
    };

    var searchImage = {
        challenge: req.body.challengeId
    };

    Challenge.findOne(searchChallenge, function(err, challenge) {
        if (err) {
            return res.status(500).send({message: "Something went wrong"});
        }

        if (challenge) {

            challenge.title = req.body.title;
            challenge.description = req.body.description;
            challenge.category.id = req.body.category.id;
            challenge.category.name = req.body.category.name;

            Image.find(searchImage, function(err, images) {
                if (err) {
                    next(err);
                }

                images.forEach(function(image) {

                    image.category = req.body.category;

                    image.save(function(err) {
                        if (err) {
                            next(err);
                        }

                    });

                });

            });

            challenge.save(function(err) {
                if (err) {
                    return res.status(500).send({message: "Something went wrong"});
                } else {

                    return res.send("Challenge successfully updated!");

                }

            });

        } else {

            return res.status(404).send({message: "Challenge not found!"});

        }

    })
}

