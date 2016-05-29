/**
 * Set background image directive
 */

"use strict";

module.exports = angular.module("shutterSnappy")
    .directive("bgImg", [
        function() {
            return function(scope, element, attrs) {
                attrs.$observe("bgImg", function(value) {
                    element.css({
                        "background-image": "url(assets/img/backgrounds/" + value + ".jpg)",
                        "background-size": "cover"
                    });
                });
            };
        }]);
