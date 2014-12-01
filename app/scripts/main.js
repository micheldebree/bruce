/* global window, document, Body, Scroller, Framerate, Rasterbars, C64, motion */

var context,
    zoomX,
    animStart,
    animations = [];

function animate(timestamp) {
    'use strict';

    // determine the 'playhead': the number of milliseconds the animation
    // has been playing. Use this for timing effects since the Draw function
    // is called at the frequency of the refresh rate of the browser.
    if (undefined === animStart) {
        animStart = timestamp;
    }

    //context.save();
    //context.scale(zoomX, zoomX);
    context.fillStyle = '#ff0000';
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    for (var i = 0; i < animations.length; i++) {
        animations[i].draw(timestamp - animStart);
    }

    //context.restore();

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
    var canvas = document.getElementById('Canvas0');
    zoomX = window.innerWidth / canvas.width;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context = canvas.getContext('2d');
    //context.scale(zoomX, zoomX);
   
    animations.push(new C64(context));
    animations.push(new Body(context, motion, 'images/xray/'));
    animations.push(new Scroller(context));
    animations.push(new Rasterbars(context));
    animations.push(new Framerate(context));
    window.requestAnimFrame(animate);
};