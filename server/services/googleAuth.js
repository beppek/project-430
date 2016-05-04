/**
 * Created by Beppe on 4/05/2016.
 */

"use strict";

var secrets = require("../../secrets");
var request = require("request");
var createSendToken = require("./jwt");
var User = require("../models/User");

module.exports = function(req, res, next) {

    var url = "https://www.googleapis.com/oauth2/v4/token";
    var apiUrl = "https://www.googleapis.com/plus/v1/people/me/openIdConnect";

    var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: secrets.GOOGLE_SECRET,
        redirect_uri: req.body.redirectUri,
        grant_type: "authorization_code"
    };

    request.post(url, {
        json: true,
        form: params
    }, function(err, response, token) {
        if (err) {
            return next(err);
        }

        var accessToken = token.access_token;
        var tokenType = token.token_type + " ";
        var headers = {
            Authorization: tokenType + accessToken
        };

        request.get({
            url: apiUrl,
            headers: headers,
            json: true
        }, function(err, response, profile) {

            User.findOne({googleId: profile.sub}, function(err, user) {
                if (err) {
                    return next(err);
                }

                if (user) {
                    return createSendToken(user, res);
                }

                var newUser = new User({
                    email: profile.email,
                    googleId: profile.sub,
                    displayName: profile.name
                });

                newUser.save(function(err) {
                    if (err) {
                        return next(err);
                    } else {

                        createSendToken(newUser, res);

                    }
                });

            })

        })

    });
};
