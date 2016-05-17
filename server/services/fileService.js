/**
 * handles upload requests
 */

"use strict";

var fs = require("fs");
var Challenge = require("../models/Challenge");
var User = require("../models/User");
var Image = require("../models/Image");
var rmdir = require("rimraf");

module.exports = {
    upload: uploadFile,
    deleteImg: deleteImg,
    deleteChallenge: deleteChallenge
};

/**
 * Handles uploading of file
 * */
function uploadFile(req, res) {

    var file = req.files.file;
    var imgData = req.body.imgData;
    var fileName = file.path.split("/")[2];
    var destDir = "./client/imgDB/" + imgData.challengeId;
    var dest = destDir + "/" + fileName;
    var relPath = "./imgDB/" + imgData.challengeId + "/" + fileName;

    fs.mkdir(destDir, function(err) {

        if (err) {

            if (err.code === "EEXIST") {
                return moveFile();
            }

            console.log(err);
            return res.status(500).send({
                message: err
            });
        }

        moveFile();

    });

    function moveFile() {
        var source = file.path;

        fs.readFile(source, function(err, data) {

            if (err) {
                res.status(500).send({
                    message: err
                });
                throw err;
            }

            fs.writeFile(dest, data, function(err) {

                if (err) {
                    res.status(500).send({
                        message: err
                    });
                    throw err;
                }

                fs.unlink(source, function() {
                    if (err) {
                        res.status(500).send({
                            message: err
                        });
                        throw err;
                    }

                    saveToDb();

                });
            });
        });

    }

    function saveToDb() {

        var searchUser = {
            _id: imgData.userId
        };

        var searchChallenge = {
            _id: imgData.challengeId
        };

        var createdByName;

        User.findOne(searchUser, function(err, user) {
            if (err) {
                throw err;
            }

            if (user) {
                createdByName = user.displayName;
            }else {
                return res.status(401).send({
                    message: "You must have been logged out, log back in and try again."
                });
            }

        });

        var searchImage = {
            "fileInfo.path": relPath
        };

        Image.findOne(searchImage, function(err, image) {

            if (err) {
                throw err;
            }

            if (image) {
                return res.send({
                    message: "Image already exists!"
                });
            }

            var uploadedBy = {
                name: createdByName,
                userId: imgData.userId
            };

            var fileInfo = {
                fileName: fileName,
                path: relPath
            };

            var newImage = new Image({
                uploadedBy: uploadedBy,
                title: imgData.title,
                description: imgData.description,
                fileInfo: fileInfo,
                challenge: imgData.challengeId
            });

            newImage.save(function(err) {
                if (err) {
                    throw err;
                }

                Challenge.findOneAndUpdate(searchChallenge, {$addToSet: {"stats.contributions": newImage.id}}, {new:true}, function(err, challenge) {
                    if (err) {
                        throw err;
                    }

                });

                User.findOneAndUpdate(searchUser, {$addToSet: {"stats.uploadedImages": newImage.id}}, {new:true}, function(err, user) {
                    if (err) {
                        throw err;
                    }

                });

                return res.send(newImage)

            });

        });

    }

}

/**
 * Removes file
 * */
function deleteImg(req, res) {

    var filePath = "./client/imgDB/" + req.body.challengeId + "/" + req.body.fileName;

    fs.unlink(filePath, function(err) {
        if (err) {
            return res.status(500).send({
                message: err
            });
        }

        res.send("Successfully deleted the image!");

    });

}

/**
 * Removes challenge folder
 * */
function deleteChallenge(req, res) {

    var path = "./client/imgDB/" + req.body.challengeId;
    rmdir(path, function(err) {
        if (err) {
            res.send({
                message: err
            })
        }

        res.send("Successfully deleted the challenge and all containing images");

    })

}
