/**
 * Notification Controller
 * @author beppek
 */

"use strict";

module.exports = angular.module("shutterSnappy")
    .controller("notificationCtrl", ["$scope", "$state", "$auth", "socket", "callout",
        function($scope, $state, $auth, socket, callout) {
            $scope.isAuthenticated = $auth.isAuthenticated;

            $scope.currentPage = function() {
                return $state.current.url;
            };

            /**
             * Socket Listeners
             * */
            socket.on("challenge:created", function(data) {
                console.log(data);
                callout("secondary", "New Challenge", data.creator + " created " + data.title);
            });

            socket.on("challenge:updated", function(data) {
                console.log(data);
                callout("secondary", "Challenge Updated", data.creator + " updated " + data.title);
            });

            socket.on("image:uploaded", function(data) {
                console.log(data);
                callout("secondary", "New image: " + data.title, "Uploaded by " + data.creator + " to " + data.challenge);
            });

            $scope.toggle = false;

        }]);
