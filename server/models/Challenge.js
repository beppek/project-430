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
            type: String,
            required: true
        }
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
    stats: {
        // upVoted: {
        //     type: Number,
        //     required: false,
        //     default: 0
        // },
        upVoted: [{
            userId: {
                type: String
            }
        }],
        contributions: {
            type: Number,
            required: false,
            default: 0
        }
    }
});

module.exports = mongoose.model("Challenge", ChallengeSchema);
