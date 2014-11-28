/*global window, document, Body, Scroller, Framerate, motion */

var canvas,
    context,
    animStart,
    playhead,
    animations = [];

function animate(timestamp) {
    'use strict';

    // determine the 'playhead': the number of milliseconds the animation
    // has been playing. Use this for timing effects since the Draw function
    // is called at the frequency of the refresh rate of the browser.
    if (undefined === animStart) {
        animStart = timestamp;
    }
    playhead = (timestamp - animStart);

    context.clearRect(0, 0, canvas.width, canvas.height);
    
    for (var i = 0; i < animations.length; i++) {
        animations[i].draw(playhead);
    }
    
    window.requestAnimFrame(animate);
}

window.requestAnimFrame = (function () {
    'use strict';
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 120);
        };
}());

window.onload = function () {
    'use strict';
    canvas = document.getElementById("Canvas0");
    context = canvas.getContext('2d');
    animations.push(new Body(context, motion, 'images/xray/'));
    animations.push(new Scroller(context));
    animations.push(new Framerate(context));
    window.requestAnimFrame(animate);
};
