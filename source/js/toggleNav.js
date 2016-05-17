/**
 *
 * This module opens and closes the navigation
 *
 * @author beppek
 *
 */

"use strict";

var nav = $("#menu");
var navBtn = $("#menu-icon");

/**
 * This function toggles the nav menu
 * */
function toggleNav() {

    nav.toggleClass("menu-closed menu-open");
    navBtn.toggleClass("fa-bars fa-times");

}

module.exports = {
    toggle: toggleNav
};
