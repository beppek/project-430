/**
 * Model for a challenge
 * @author beppek
 */

"use strict";

var mongoose = require("mongoose");

var ChallengeSchema = new mongoose.Schema({
    createdBy: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Challenge", ChallengeSchema);
