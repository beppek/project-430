/**
 * Created by Beppe on 19/04/2016.
 */

var request     = require("supertest");
var app         = require("../../server");

describe("GET /", function() {

    it("respond with 200", function(done) {
        request(app)
            .get("/")
            .expect(200, done);
    });

});

describe("GET /sidasomintefinns", function() {

    it("respond with 404", function(done) {
        request(app)
            .get("/sidasomintefinns")
            .expect(404, done);
    });

});

describe("GET /challenges", function() {

    it("respond with 302", function(done) {
        request(app)
            .get("/challenges")
            .expect(302, done);
    });

});

describe("GET /leaderboard", function() {

    it("respond with 302", function(done) {
        request(app)
            .get("/leaderboard")
            .expect(302, done);
    });

});

describe("GET /dashboard", function() {

    it("respond with 302", function(done) {
        request(app)
            .get("/dashboard")
            .expect(302, done);
    });

});

describe("POST /sidasomintefinns", function() {

    it("respond with 404", function(done) {
        request(app)
            .post("/sidasomintefinns")
            .expect(404, done);
    });

});

describe("POST /", function() {

    it("respond with 400", function(done) {
        request(app)
            .post("/")
            .expect(400, done);
    });

});
