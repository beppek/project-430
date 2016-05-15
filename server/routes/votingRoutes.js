/**
 * Created by Beppe on 15/05/2016.
 */

"use strict";

//Require
var router = require("express").Router();
var Image = require("../models/Image");
var Challenge = require("../models/Challenge");


router.route("/image/vote")
    .post(function(req, res, next){

        // console.log(req.body);

        var searchImage = {
            _id: req.body.imageId
        };

        Image.findOne(searchImage, function(err, image) {
            
        })

    });

module.exports = router;
