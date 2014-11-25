/*global window, document, Body, motion */

var canvas,
    context,
    body,
    animStart,
    fps = 50, // desired frames-per-second to refresh the animation
    delay = 1000 / fps,
    playhead,
    now,
    frameCount = 0,
    animations = [];

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
    
    for (var i = 0; i < animations.length; i++) {
        animations[i].draw(playhead);
    }
    
    //recolor
    //var data = context.getImageData(0, 0, canvas.width, canvas.height);
    //for (var i = 0, length = data.data.length; i < length; i += 4) {
        //data.data[i]     = Math.max(255, data.data[i]);
        //data.data[i + 1] = Math.max(255, data.data[i]);
        //data.data[i + 2] = Math.max(255, data.data[i]);
    //}
    //context.putImageData(data, 0, 0);

    setTimeout(function () {
        window.requestAnimFrame(animate);
    }, delay);

    frameCount++;

    document.getElementById("fps").innerHTML = Math.round(10000 * (frameCount / playhead)) / 10;
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
    animations.push(new Body(context, motion, 'images/xray/'));
    animate();
};
