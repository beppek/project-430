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
    dateUploaded: {
        type: Date,
        required: false,
        default: Date.now
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
        type: String,
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
