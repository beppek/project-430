/**
 * Mongoose configuration.
 *
 * @author BeppeK
 * @version 1.0.0
 */

"use strict";

var mongoose = require("mongoose");

//exports
module.exports = {
    mongoDB: mongoDB
};

function mongoDB() {

    var connectionString = "mongodb://localhost/mongoDB";
    var db = mongoose.connect(connectionString);

    db.connection.on("connected", function() {
        console.log("mongoDB connection open.");
    });

    db.connection.on("error", function(err) {
        console.error("mongoDB connection error: ", err);
    });

    db.connection.on("disconnected", function() {
        console.log("mongoDB connection disconnected.");
    });

    // If the Node process ends, close the Mongoose connection.
    process.on("SIGINT", function() {
        db.connection.close(function() {
            console.log("mongoDB connection disconnected through app termination.");
            process.exit(0);
        });
    });

    return db;

}
