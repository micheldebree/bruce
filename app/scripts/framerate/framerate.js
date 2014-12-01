/* jslint bitwise: true */
function Framerate(context) {
    'use strict';
    this.context = context;
    this.resetWindow = 10000; // miliseconds after which to reset measuring
}

Framerate.prototype.draw = function (playhead) {
    'use strict';
    if (this.measureFrom === undefined || this.elapsed > this.resetWindow) {
        this.measureFrom = playhead;
        this.frameCount = 0;
    }
    this.elapsed = (playhead - this.measureFrom);
    this.context.fillStyle = '#ffffff';
    this.context.fillText(~~(this.frameCount * 1000 / this.elapsed), 10, 10);
    this.frameCount++;
};