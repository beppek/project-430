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
// var exphbs          = require("express-handlebars");
var bodyParser      = require("body-parser");
var session         = require("express-session");
var csurf           = require("csurf");
var RedisStore      = require("connect-redis")(session);
// var sass            = require("node-sass");
// var sassMiddleware  = require("node-sass-middleware");

var sessionStore    = new RedisStore();
var app             = express();
var port            = process.env.PORT || 8000;

//CONFIG -------------------------------

//TODO: Keeping this here until I know how to handle errors.
//TODO: Use Angular to show error pages?
//View engine
// app.engine("hbs", exphbs({
//     defaultLayout: "default",
//     extname: "hbs"
// }));
// app.set("view engine", ".hbs");

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
app.use(function(req, res, next){
    res.locals.flash = req.session.flash;
    delete req.session.flash;
    next();
});

// //SASS
// app.use(
//     sassMiddleware({
//         src: __dirname + "/client/src/sass",
//         dest: __dirname + "/client/assets/css",
//         debug: true,
//         prefix: "assets/css"
//     })
// );

//Static content
app.use(express.static(path.join(__dirname, "client")));

//Routes
app.use("/", require("./routes/home.js"));

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
