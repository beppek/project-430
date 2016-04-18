/**
 * Router for the application
 * @author BeppeK
 */

"use strict";

//Requires
var router = require("express").Router();

/**
 *
 * Serve up the starting page of the application
 *
 * */
router.route("*")
    .get(function(req, res) {
        res.sendFile("index.html", {root: "/client/"});
    });

module.exports = router;
