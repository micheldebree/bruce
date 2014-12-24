/*global ArgumentGrabber, window, document, Snow, CanvasGrabber, messages */
/*jslint bitwise: true*/
/*jslint plusplus: true*/
var context,
    animStart,
    animations = [];

function animate(timestamp) {
    'use strict';

    var i;

    // determine the 'playhead': the number of milliseconds the animation
    // has been playing. Use this for timing effects since the Draw function
    // is called at the frequency of the refresh rate of the browser.
    if (undefined === animStart) {
        animStart = timestamp;
    }

    for (i = 0; i < animations.length; i++) {
        animations[i].draw(timestamp - animStart);
    }

    window.requestAnimFrame(animate);
}

/**
 * Draw the scene that will be snowed upon.
 */
function drawScene(canvas, message) {
    'use strict';
    
    if (message === undefined) {
        message = {
            'name': 'Dear friends and family,',
            'msg': 'We wish you a happy christmas and a blessed 2015!'
        };
    }

    if (message.msg === undefined) {
        message.msg = 'We wish you a happy christmas and a blessed 2015!';
    }
    if (message.signed === undefined) {
        message.signed = 'Michel & Hoi-Yin';
    }

    var tmpCanvas = document.createElement('canvas');
    tmpCanvas.width = canvas.width;
    tmpCanvas.height = canvas.height;

    var tmpcontext = tmpCanvas.getContext('2d'),
        grabber = new CanvasGrabber(tmpcontext),
        y = canvas.height / 4,
        x = canvas.width / 3;

    grabber.drawText(tmpcontext, message.name, x, y);
    grabber.drawText(tmpcontext, message.msg, x, y + 40);
    grabber.drawText(tmpcontext, message.signed, x, y + 100);
    grabber.drawImage('images/kerstkaart-1plaatje.png', 0, canvas.height - 350);


    if (message.img !== undefined) {
        grabber.drawImage(message.img, canvas.width / 6, y-10);
    }

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

    var canvas = document.getElementById('Canvas0'),
        friend = ArgumentGrabber.grabArgument('f');

    context = canvas.getContext('2d');
    animations.push(new Snow(context, drawScene(canvas, messages[friend])));

    window.requestAnimFrame(animate);
};
