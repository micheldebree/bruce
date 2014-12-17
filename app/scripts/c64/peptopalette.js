/* jslint bitwise: true */
/* exported PeptoPalette */
function PeptoPalette() {
    'use strict';

}

PeptoPalette.random = function () {
    'use strict';
    return this.colors[~~(Math.random() * 16)];
};