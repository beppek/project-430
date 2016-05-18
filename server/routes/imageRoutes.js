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

/**
 * Updates image on POST
 * */
router.route("/image/update")
    .post(checkAuth.forDelete, image.updateImg);

/**
 * Checks that user is authorized to update image then gets image
 * */
router.route("/image/update/:imageId")
    .get(checkAuth.normal, image.fetch);

/**
 * Gets image
 * */
router.route("/image/:imageId")
    .get(image.fetch);

module.exports = router;
