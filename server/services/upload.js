/**
 * Created by Beppe on 4/05/2016.
 */

//Requires
var jwt = require("jwt-simple");

module.exports = function(req, res) {

    // if (!localStorage.satellizer_token) {
    //     res.status(401).send({
    //         message: "You are not authorized"
    //     });
    // } else {
    //
    //     var token = localStorage.satellizer_token.split(" ")[1];
    //     var payload = jwt.decode(token, "shhh...");
    //
    //     if (!payload.sub) {
    //         res.status(401).send({
    //             message: "Authentication failed"
    //         });
    //     }
    //
    // }

};
