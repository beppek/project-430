/**
 * Created by Beppe on 1/05/2016.
 */

"use strict";

module.exports = angular.module("slideZapp").service("callout", function callout($rootScope, $timeout) {

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

});
