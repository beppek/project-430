/**
 * Router for the Image functions of application
 * @author BeppeK
 */

"use strict";

//Requires
var router = require("express").Router();
var image = require("../services/image");

router.route("/image/:challengeId/:imageId")
    .get(image.fetch);

module.exports = router;
