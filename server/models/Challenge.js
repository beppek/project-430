/**
 * Model for a challenge
 * @author beppek
 */

"use strict";

var mongoose = require("mongoose");

var ChallengeSchema = new mongoose.Schema({
    createdByName: {
        type: String,
        required: true
    },
    createdById: {
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
    },
    dateCreated: {
        type: Date,
        required: false,
        default: Date.now
    },
    plusCounter: {
        type: Number,
        required: false,
        default: 0
    }
});

module.exports = mongoose.model("Challenge", ChallengeSchema);
