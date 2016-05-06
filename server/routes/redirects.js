/**
 * Router for the redirects to pages of application with hashbang
 * @author BeppeK
 */

"use strict";

//Requires
var router = require("express").Router();

/**
 *
 * Redirect to leaderboard with hashbang
 *
 * */
router.route("/leaderboard")
    .get(function(req, res) {
        res.redirect("/#/leaderboard");
    });

/**
 *
 * Redirect to challenges with hashbang
 *
 * */
router.route("/challenges")
    .get(function(req, res) {
        res.redirect("/#/challenges");
    });

/**
*
* Redirect to challenge/create with hashbang
*
* */
router.route("/challenge/create")
    .get(function(req, res) {
        res.redirect("/#/challenge/create");
    });


/**
 *
 * Redirect to about with hashbang
 *
 * */
router.route("/about")
    .get(function(req, res) {
        res.redirect("/#/about");
    });

module.exports = router;
