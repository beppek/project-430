/**
 * Socket for real time updates
 * @author beppek
 */

"use strict";

module.exports = function(socket) {

    socket.on("signin", function(data) {
        socket.broadcast.emit("signin", {
            user: data.user
        });
    });

};
