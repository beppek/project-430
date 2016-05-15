/**
 * Created by Beppe on 15/05/2016.
 */

"use strict";

//Require
var router = require("express").Router();
var Image = require("../models/Image");
var Challenge = require("../models/Challenge");


router.route("/image/vote")
    .post(function(req, res, next) {

        // console.log(req.body);

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

router.route("/image/checkvoted")
    .post(function(req, res, next) {

        var searchImage = {
            _id: req.body.imageId
        };

        Image.findOne(searchImage, function(err, image) {

            if (err) {
                return next(err);
            }

            if (!image) {
                return res.status(500).send({message: "Something went wrong"});
            }
            else {

                if (image.stats.votes.indexOf(req.body.userId) === -1) {
                    return res.send(false);
                } else {
                    return res.send(true);
                }

            }

        });

    });

module.exports = router;
