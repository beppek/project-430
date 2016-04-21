/**
 * Created by Beppe on 19/04/2016.
 */

var chai = require("chai");
var request = require("supertest");
var app = require("../../server");

/**
 * Tests the router
 * */
describe("GET /", function() {

    it("respond with 200", function(done) {
        request(app)
            .get("/")
            .expect(200, done);
    });

});
