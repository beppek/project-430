/**
 * Model for an Image
 * @author beppek
 */

"use strict";

var mongoose = require("mongoose");

var ImageSchema = new mongoose.Schema({
    uploadedBy: {
        name: {
            type: String,
            required: true
        },
        userId: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
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
    location: {
        type: String,
        required: false,
        default: "N/A"
    },
    fileInfo: {
        fileName: {
            type: String,
            required: true
        },
        path: {
            type: String,
            required: true
        }
    },
    challenge: {
        type: mongoose.Schema.ObjectId,
        ref: "Challenge",
        required: true
    },
    stats: {
        votes: [{
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }]
    }
});

module.exports = mongoose.model("Image", ImageSchema);
