function ArgumentGrabber() {}

ArgumentGrabber.grabArgument = function (key) {
    'use strict';
    
    var query = window.location.search.substring(1, window.location.search.length).split('&'),
        entry;

    for (var i = 0; i < query.length; i++) {
        entry = query[i].split('=');
        if (entry[0] === key) {
            return entry[1];
        }
    }

    return undefined;

};