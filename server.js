/**
 *
 * Starting point of the application
 *
 * @author BeppeK
 * @version 0.0.1
 *

 * */
"use strict";

//SETUP -------------------------------

//Requires
var path            = require("path");
var fs              = require("fs");
var http            = require("http");

var express         = require("express");
var bodyParser      = require("body-parser");
var mongoose        = require("./server/config/mongoose");

var session         = require("express-session");
var csurf           = require("csurf");
var RedisStore      = require("connect-redis")(session);
var sessionStore    = new RedisStore();

var app             = express();
var port            = process.env.PORT || 8000;

//CONFIG -------------------------------

//Connect to database
mongoose.mongoDB();

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// //Passport
// app.use(passport.initialize());

//TODO: Environment variables for session name and secret
//TODO: Don't forget to secure Redis
//session
app.use(session({
    name: "sniplykicksass",
    secret: "say purpose turn blanket",
    store: sessionStore,
    saveUninitialized: true,
    resave: false,
    cookie: { secure: true }
}));

//Flash message, delete after display
// app.use(function(req, res, next) {
//     res.locals.flash = req.session.flash;
//     delete req.session.flash;
//     next();
// });

app.use(function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    next();

});

//Static content
//TODO: Use enginx in production
app.use(express.static(path.join(__dirname, "client")));

//Routes
app.use("/", require("./server/routes/home.js"));
app.use("/", require("./server/routes/authRoutes.js"));
app.use("/", require("./server/routes/redirects.js"));
app.use("/", require("./server/routes/challengeRoutes"));

//TODO: Actually display some sort of error pages
// 400 handler.
app.use(function(err, req, res, next) {

    if (err.status !== 400) {
        return next(err);
    }

    res.status(400).render("errors/400");

});

// 500 handler.
app.use(function(err, req, res, next) {

    if (err.status !== 500) {
        return next(err);
    }

    res.status(500).render("errors/500");

});

//403 handler
app.use(function(err, req, res, next) {

    if (err.status !== 403) {
        return next(err);
    }

    res.status(403).render("errors/403");

});

// 404 catch-all handler.
app.use(function(req, res, next) {

    res.status(404).render("errors/404");

});

//LAUNCH ----------------------------------
app.listen(port, function() {

    console.log("Express started on http://localhost:" + port);
    console.log("Press ctrl+c to terminate");

});

// EXPORT FOR TESTING
module.exports = app;
