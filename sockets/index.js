/**
 * Socket for real time updates
 * @author beppek
 */

"use strict";

module.exports = function(socket) {

    socket.on("signin", function(data) {
        socket.broadcast.emit("signin", data);
    });

    socket.on("challenge:created", function(data) {
        socket.broadcast.emit("challenge:created", data);
    });

    socket.on("challenge:updated", function(data) {
        socket.broadcast.emit("challenge:updated", data);
    });

    socket.on("image:uploaded", function(data) {
        socket.broadcast.emit("image:uploaded", data);
    });

    socket.on("vote:image", function(data) {
        socket.broadcast.emit("vote:image", data);
    });

    socket.on("unvote:image", function(data) {
        socket.broadcast.emit("unvote:image", data);
    });

    socket.on("vote:challenge", function(data) {
        socket.broadcast.emit("vote:challenge", data);
    });

    socket.on("unvote:challenge", function(data) {
        socket.broadcast.emit("unvote:challenge", data);
    });

};
