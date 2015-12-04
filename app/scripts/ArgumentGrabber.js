/*global window */
/*jslint plusplus: true*/
/**
 * Grabs arguments from the current url.
 * @constructor
 */
function ArgumentGrabber() {
    'use strict';
}

/**
 * Grab the argument specified by key.
 * @param {string} key - the key for the argument.
 */
ArgumentGrabber.grabArgument = function (key) {
    'use strict';

    var query = window.location.search.substring(1, window.location.search.length).split('&'),
        entry,
        i;

    for (i = 0; i < query.length; i++) {
        entry = query[i].split('=');
        if (entry[0] === key) {
            return entry[1];
        }
    }

    return undefined;

};
