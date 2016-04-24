/**
 *
 * This module opens and closes the navigation
 *
 * @author beppek
 *
 */

"use strict";

var nav = $("#menu");

/**
 * This function opens the nav menu
 * */
function openNav() {

    nav.toggleClass("menu-closed menu-open");

}

/**
 * This function closes the nav menu
 * */
function closeNav() {

    nav.toggleClass("menu-closed menu-open");

}

module.exports = {
    open: openNav,
    close: closeNav
};
