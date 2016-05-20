/**
 * Callout Service
 * @author beppek
 */

"use strict";

module.exports = angular.module("shutterSnappy")
    .service("callout", ["$rootScope", "$timeout",
        function callout($rootScope, $timeout) {

            var calloutTimeout;
            return function(type, title, message, timeout) {
                $rootScope.callout = {
                    hasBeenShown: true,
                    show: true,
                    type: type,
                    message: message,
                    title: title
                };
                $timeout.cancel(calloutTimeout);
                calloutTimeout = $timeout(function() {
                    $rootScope.callout.show = false;
                }, timeout || 3000);
            }

        }]);
