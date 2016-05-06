/**
 *
 * This module handles the JWT
 * @author: beppek
 *
 * */

//Requires
var jwt = require("jwt-simple");
var moment = require("moment");
var secrets = require("../../secrets");

/**
 *
 * This function creates and sends a token
 *
 * */
module.exports = function(user, res) {
    var payload = {
        sub: user.id,
        exp: moment().add(10, "days").unix()
    };

    var token = jwt.encode(payload, secrets.JWT_SECRET);
    console.log(token.length);

    res.status(200).send({
        user: user.toJSON(),
        token: token
    });
};
