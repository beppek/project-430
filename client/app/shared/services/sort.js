/**
 * Service to sort images and challenges based on number of contributions or number of votes
 * @author beppek
 */

"use strict";

module.exports = angular.module("shutterSnappy")
    .service("sortService", ["$http", "$auth",
        function sortService() {

            /**
             * By Votes
             * */
            this.byVotes = function(array) {

                var sortedArray = array.slice();

                sortedArray.sort(function(a, b) {
                    if (a.stats.votes.length > b.stats.votes.length) {
                        return -1;
                    }

                    if (a.stats.votes.length < b.stats.votes.length) {
                        return 1;
                    }

                    return 0
                });

                return sortedArray;

            };

            /**
             * By Contributions
             * */
            this.byContributions = function(array) {

                var sortedArray = array.slice();

                sortedArray.sort(function(a, b) {
                    if (a.stats.contributions.length > b.stats.contributions.length) {
                        return -1;
                    }

                    if (a.stats.contributions.length < b.stats.contributions.length) {
                        return 1;
                    }

                    return 0
                });

                return sortedArray;

            };

            /**
             * By Date
             * Returns most recent first
             * */
            this.byDate = function(array) {
                var sortedArray = array.slice();

                sortedArray.sort(function(a, b) {
                    if (a.dateCreated > b.dateCreated) {
                        return -1;
                    }

                    if (a.dateCreated < b.dateCreated) {
                        return 1;
                    }

                    return 0
                });

                return sortedArray;
            }

        }]);
