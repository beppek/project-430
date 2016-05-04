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
 * This function toggles the nav menu
 * */
function toggleNav() {

    nav.toggleClass("menu-closed menu-open");

}

module.exports = {
    toggle: toggleNav
};
