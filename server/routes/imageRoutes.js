/**
 * Router for the Image functions of application
 * @author beppek
 */

"use strict";

//Requires
var router = require("express").Router();
var image = require("../services/image");
var checkAuth = require("../services/checkAuth");
var fileService = require("../services/fileService");

/**
 * Deletes image on POST
 * */
router.post("/image/delete", checkAuth.forDelete, image.deleteImg, fileService.deleteImg);

//TODO Rewrite to use challenge title
/**
 * Gets image
 * */
router.route("/image/:imageId")
    .get(image.fetch);

module.exports = router;
