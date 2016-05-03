/**
 * Router for the starting point of application
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
router.route("/")
    .get(function(req, res) {
        res.sendFile("index.html", {root: "/client/"});
    })
    .post(function(req, res) {
        res.status(400);
        res.send("You didn't GET it!");
    });

module.exports = router;
