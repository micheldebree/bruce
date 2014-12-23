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

    var y = canvas.height / 6;
    var x = canvas.width / 2;
    grabber.drawText(tmpcontext, message.name, x, y);
    grabber.drawText(tmpcontext, message.msg, x, y+40);
    grabber.drawText(tmpcontext, 'Michel & Hoi-Yin', x, y+80);
    grabber.drawImage('images/kerstkaart-1plaatje.png', 0, canvas.height - 350);

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

    var canvas = document.getElementById('Canvas0');
    context = canvas.getContext('2d');
    
    canvas.height = canvas.width * (window.innerHeight / window.innerWidth);

    zoomX = window.innerWidth / canvas.width;

    // get the message according to url parameter
    var friend = ArgumentGrabber.grabArgument('f'),
        message = messages[friend];
    if (message === undefined) {
        message = {
            'name': 'Beste relatie,',
            'msg': 'We wensen U fijne feestdagen!'
        };
    }

    animations.push(new Snow(context, drawScene(canvas, message)));

    window.requestAnimFrame(animate);
};
