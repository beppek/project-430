/**
 * Created by Beppe on 8/05/2016.
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
            throw err;
        }

        if (image) {
            res.send(image);
        }

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

    console.log(req.body);

}
