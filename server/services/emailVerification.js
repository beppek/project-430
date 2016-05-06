/**
 * Created by Beppe on 6/05/2016.
 */

"use strict";

var secrets = require("../../secrets");

exports.send = function(email) {

    var payload = {
        sub: email
    };

    var token = jwt.encode(payload, secrets.EMAIL_SECRET);

};
