/**
 * Image service for backend
 * @author beppek
 */

var Image = require("../models/Image");
var Challenge = require("../models/Challenge");
var User = require("../models/User");

module.exports = {
    fetch: getImage,
    deleteImg: deleteImage,
    updateImg: updateImg
};

/**
 *
 * This function gets the image data and sends it back to client
 *
 * */
function getImage(req, res) {

    var searchImage = {
        _id: req.params.imageId
    };

    Image.findOne(searchImage, function(err, image) {
        if (err) {
            return res.status(500).send({message: "Internal error"});
        }

        if (image) {
            return res.send(image);
        }

        return res.status(404).send({message: "Couldn't find image"});

    })

}

/**
 * Lets the user delete images linked to that user
 * */
function deleteImage(req, res, next) {

    var searchImage = {
        _id: req.body.imageId
    };

    var searchChallenge = {
        _id: req.body.challengeId
    };

    var searchUser = {
        _id: req.body.reqUserId
    };

    Image.remove(searchImage, function(err) {
        if (err) {
            throw err;
        }

        Challenge.findOneAndUpdate(searchChallenge, {$pull: {"stats.contributions": req.body.imageId}}, {new:true}, function(err) {

            if (err) {
                return next(err);
            }

        });

        User.findOneAndUpdate(searchUser, {$pull: {"stats.uploadedImages": req.body.imageId}}, {new:true}, function(err) {

            if (err) {
                return next(err);
            }

        });

        next();

    })

}

/**
 * Allows user to update image
 * */
function updateImg(req, res, next) {

    var searchImage = {
        _id: req.body.imgId
    };

    Image.findOne(searchImage, function(err, image) {
        if (err) {
            return res.status(500).send({message: "Something went wrong"});
        }

        if (image) {

            image.title = req.body.title;
            image.description = req.body.description;
            image.location = req.body.location;

            image.save(function(err) {
                if (err) {
                    return res.status(500).send({message: "Something went wrong"});
                } else {

                    return res.send("Image successfully updated!");

                }

            })

        } else {

            return res.status(404).send({message: "Image not found!"});

        }

    })

}
