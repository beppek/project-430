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
var https            = require("https");

var express         = require("express");
var bodyParser      = require("body-parser");
var mongoose        = require("./server/config/mongoose");

var session         = require("express-session");
var csurf           = require("csurf");
var RedisStore      = require("connect-redis")(session);

//Sign in to redis in production mode on server
if (process.env.NODE_ENV === "production") {
    var sessionStore    = new RedisStore({pass: process.env.REDISAUTH});
}
else {
    console.log("Development");
    var sessionStore    = new RedisStore();
}

var app             = express();
var port            = process.env.PORT || 8000;

// var server          = http.Server(app);
// var io              = require("socket.io")(server);
var server             = https.createServer({
    key: fs.readFileSync("./secrets/config/sslcerts/shuttersnappy.com.key"),
    cert: fs.readFileSync("./secrets/config/sslcerts/shuttersnappy.com.crt")
}, app);
var io                 = require("socket.io")(server);

//CONFIG -------------------------------

//Connect to database
mongoose.mongoDB();

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//TODO: Environment variables for session name and secret
//TODO: Don't forget to secure Redis
//session
app.use(session({
    name: process.env.SESSIONNAME,
    secret: process.env.COOKIESECRET,
    store: sessionStore,
    saveUninitialized: true,
    resave: false,
    cookie: { secure: true }
}));

app.use(function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    next();

});

//Static content
//TODO: Use enginx in production
// if (process.env.NODE_ENV !== "production") {
app.use(express.static(path.join(__dirname, "client")));
// }

//Routes
app.use("/", require("./server/routes/home.js"));
app.use("/", require("./server/routes/authRoutes.js"));
app.use("/", require("./server/routes/votingRoutes"));
app.use("/", require("./server/routes/redirects.js"));
app.use("/", require("./server/routes/challengeRoutes"));
app.use("/", require("./server/routes/imageRoutes"));
app.use("/", require("./server/routes/userRoutes"));

var sockets = require("./sockets/index");

//Init socket.io
io.on("connection", function(socket) {
    sockets(socket);
});

//TODO: Actually display some sort of error pages
// 400 handler.
app.use(function(err, req, res, next) {

    if (err.status !== 400) {
        return next(err);
    }

    res.status(400).send({message:err});

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

    res.status(404).send({message: "404 not found"});

});

//LAUNCH ----------------------------------
server.listen(port, function() {

    console.log("Express started on https://localhost:" + port);
    console.log("Press ctrl+c to terminate");

});

// EXPORT FOR TESTING
module.exports = app;
