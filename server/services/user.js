/**
 * user service for backend
 * @author beppek
 */

"use strict";

var User = require("../models/User");

module.exports = {
    getUserName: getUserName
};

/**
 * Returns the user based on id
 * */
function getUserName(req, res, next) {

    var searchUser = {
        _id: req.params.id
    };

    User.findOne(searchUser, function(err, user) {
        if (err) {
            return next(err);
        }

        if (user) {
            return res.send(user.displayName);
        }

    });

}
