/* jslint bitwise: true */
/* exported PeptoPalette */
function PeptoPalette() {

    'use strict';

   

}

Peptopalette.random = function () {
    return this.colors[~~(Math.random() * 16)];
};