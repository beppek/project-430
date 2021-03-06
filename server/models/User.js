/**
 * Model for a user
 * @author BeppeK
 */

"use strict";

var mongoose = require("mongoose");
var bcrypt   = require("bcrypt-nodejs");

//Password is salted and hashed before it's stored
var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    googleId: {
        type: String,
        required: false
    },
    facebookId: {
        type: String,
        required: false
    },
    displayName: {
        type: String,
        required: false
    },
    dateCreated: {
        type: Date,
        required: false,
        default: Date.now
    },
    stats: {
        uploadedImages: [{
            type: mongoose.Schema.ObjectId,
            ref: "Image"
        }],
        createdChallenges: [{
            type: mongoose.Schema.ObjectId,
            ref: "Challenge"
        }]
    }
});

/**
 * This middleware creates a salt and hashes the password before save
 * */
UserSchema.pre("save", function(next) {
    var user = this;

    //only hash if password is new or modified
    if (!user.isModified("password")) {
        return next();
    }

    //Generate salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return next(err);
        }

        //Hash and salt password
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) {
                return next(err);
            }

            //
            user.password = hash;
            next();
        })
    })

});

/**
 * Compares the password with the one saved in the db
 * @param {string} password - password to be hashed
 * @param {function} callback - callback function
 * */
UserSchema.methods.comparePasswords = function(password, callback) {

    bcrypt.compare(password, this.password, function(err, validated) {

        if (err) {
            return callback(err);
        }

        callback(null, validated);

    });

};

/**
 * This function returns the user as a JSON string without the password
 * */
UserSchema.methods.toJSON = function() {

    var user = this.toObject();
    delete user.password;
    return user;

};

module.exports = mongoose.model("User", UserSchema);
