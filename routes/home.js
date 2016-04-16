/**
 * Home routes for the less interactive pages
 * @author BeppeK
 */

"use strict";

//Requires
var router = require("express").Router();

/**
 *
 * Home Page
 *
 * */
router.route("*")
    .get(function(req, res) {
        res.sendfile("pages/index.html");
    });

module.exports = router;
