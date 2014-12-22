/* global ArgumentGrabber, window, document, Snow, CanvasGrabber, messages */

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

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    for (var i = 0; i < animations.length; i++) {
        animations[i].draw(timestamp - animStart);
    }

    window.requestAnimFrame(animate);
}

/**
 * Draw the scene that will be snowed upon.
 */
function drawScene(canvas, message) {
    'use strict';
    var tmpCanvas = document.createElement('canvas');

    tmpCanvas.width = canvas.width;
    tmpCanvas.height = canvas.height;
    var tmpcontext = tmpCanvas.getContext('2d');
   
    var grabber = new CanvasGrabber(tmpcontext);

    grabber.drawText(tmpcontext, 'Merry', 10, 20);
    grabber.drawText(tmpcontext, 'Christmas', 30, 20);
    grabber.drawText(tmpcontext, message.name, 60, 20);
    //grabber.drawImage('images/flake.png', 0, 0);

    grabber.grab();
    return grabber;
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

    // TODO: scale canvas by CSS for performance reasons?
    var canvas = document.getElementById('Canvas0');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context = canvas.getContext('2d');

    zoomX = window.innerWidth / canvas.width;

    // get the message according to url parameter
    var friend = ArgumentGrabber.grabArgument('f'),
        message = messages[friend];
    if (message === undefined) {
        message = {
            'name': 'hacker',
            'msg': 'dus'
        };
    }

    animations.push(new Snow(context, drawScene(canvas, message)));

    window.requestAnimFrame(animate);
};
