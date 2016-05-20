/**
 * User Routes
 * @author beppek
 */

"use strict";

//Requires
var router = require("express").Router();
var userService = require("../services/user");

/**
 *
 * Serve up the starting page of the application
 *
 * */
router.route("/user/getname/:id")
    .get(userService.getUserName);

module.exports = router;
