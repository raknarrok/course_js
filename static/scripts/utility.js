'use strict';

/**
 * @name scrollController
 * @summary This method control the scroll of the page.
 * @author Luis Fernandez
 * @param NA
 */

// Catch Element Scroll Event
$(document).ready(function () {
    $(window).bind(`scroll`, function () {

        // Variable Declaration & Definition
        let gab = 50;

        // Conditional Statement
        if ($(window).scrollTop() > gab) {
            $(`#idLogoIcon`).removeClass(`fa-2x`);
            $(`#idLogoIcon`).addClass(`fa-x`);
            $(`#navMenu`).addClass(`opacity-75`);
        }
        else {
            $(`#idLogoIcon`).removeClass(`fa-x`);
            $(`#idLogoIcon`).addClass(`fa-2x`);
            $(`#navMenu`).removeClass(`opacity-75`);
        }
    })
})