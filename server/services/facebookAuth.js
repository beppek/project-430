/**
 * Created by Beppe on 4/05/2016.
 */

"use strict";

var secrets = require("../../secrets");
var request = require("request");
var qs = require("querystring");
var createSendToken = require("./jwt");
var User = require("../models/User");

/**
 *
 * Login using Facebook
 *
 * */
module.exports = function(req, res, next) {
    var accessTokenUrl = "https://graph.facebook.com/oath/access_token";
    var graphApiUrl = "https://graph.facebook.com/me";

    var params = {
        client_id: req.body.clientId,
        redirect_uri: req.body.redirectUri,
        client_secret: secrets.facebook,
        code: req.body.code
    };

    request.get({
        url: accessTokenUrl,
        qs: params
    }, function(err, response, accessToken) {
        accessToken = qs.parse(accessToken);

        request.get({
            url: graphApiUrl,
            qs: accessToken,
            json: true
        }, function(err, response, profile) {
            User.findOne({facebookId: profile.id}, function(err, user) {
                if (err) {
                    return next(err);
                }

                if (user) {
                    return createSendToken(user, res);
                }

                var newUser = new User({
                    facebookId: profile.id,
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
        });
    })

};
