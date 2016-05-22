/**
 * Model for a challenge
 * @author beppek
 */

"use strict";

var mongoose = require("mongoose");

var ChallengeSchema = new mongoose.Schema({
    createdBy: {
        createdByName: {
            type: String,
            required: true
        },
        createdById: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true
        }
    },
    title: {
        type: String,
        required: true
    },
    lcTitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    dateCreated: {
        type: Date,
        required: false,
        default: Date.now
    },
    stats: {
        votes: [{
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }],
        contributions: [{
            type: mongoose.Schema.ObjectId,
            ref: "Image"
        }]
    }
});

module.exports = mongoose.model("Challenge", ChallengeSchema);
