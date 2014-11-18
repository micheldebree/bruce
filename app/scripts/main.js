/*global window, document, Body, motion */

var canvas,
    context,
    body,
    animStart,
    fps = 30, // desired frames-per-second to refresh the animation
    delay = 1000 / fps,
    playhead,
    now;

function animate() {
    'use strict';
    
    now = Date.now();
    
    // determine the 'playhead': the number of milliseconds the animation
    // has been playing
    if (undefined === animStart) {
        animStart = now;
    }
    playhead = (now - animStart);
    
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "#FFFFFF";
    body.draw(context, playhead);
    
    setTimeout(function () {
        window.requestAnimFrame(animate);
    }, delay);
    
}

window.requestAnimFrame = (function () {
    'use strict';
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 2 * fps);
        };
}());

window.onload = function () {
    'use strict';
    canvas = document.getElementById("Canvas0");
    context = canvas.getContext('2d');
    body = new Body(motion);
    animate();
};
