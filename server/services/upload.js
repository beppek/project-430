/**
 * Created by Beppe on 4/05/2016.
 */

//Requires
var jwt = require("jwt-simple");
var secrets = require("../../secrets");
var moment = require("moment");

module.exports = function(req, res) {

    if (!req.header("Authorization")) {
        res.status(401).send({
            message: "You are not authorized"
        });
    } else {

        var token = req.header("Authorization").split(" ")[1];
        token = token.split(",")[0];

        var payload = null;

        try {
            payload = jwt.decode(token, secrets.JWT_SECRET);
        }
        catch (err) {
            return res.status(401).send({ message: "You are not authorized" });
        }

        if (payload.exp <= moment().unix()) {
            return res.status(401).send({ message: "Your session has expired" });
        }

        req.user = payload.sub;

    }

};
