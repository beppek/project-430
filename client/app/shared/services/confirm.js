/**
 * Name Service
 */

"use strict";

module.exports = angular.module("shutterSnappy")
    .service("confirm", ["$rootScope",
        function($rootScope) {

            return function(type, callback) {
                $rootScope.confirm = {
                    hasBeenShown: true,
                    show: true,
                    type: type
                };

                $rootScope.delete = function() {
                    $rootScope.confirm = {
                        show: false
                    };

                    callback(true);
                };

                $rootScope.cancelConfirm = function() {
                    $rootScope.confirm = {
                        show: false
                    };

                    callback(false);
                };

                $rootScope.closeConfirmModal = function($event) {
                    if ($event.target.id !== "confirmBox" && $rootScope.confirm.show) {
                        $event.preventDefault();
                        $rootScope.confirm = {
                            show: false
                        };

                        callback(false);
                    }
                }

            };

        }]);
