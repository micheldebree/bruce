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

function centerText(context, txt, y, h) {
    'use strict';
    context.font = context.canvas.height * (h / 100) + 'px sans-serif';
    context.fillStyle = '#900000';
    context.textBaseline = 'top';
    context.fillText(txt, (context.canvas.width - context.measureText(txt).width) / 2, context.canvas.height * (y / 100));
}

function drawScene(canvas, message) {
    'use strict';
    var tmpCanvas = document.createElement('canvas');

    tmpCanvas.width = canvas.width;
    tmpCanvas.height = canvas.height;
    var tmpcontext = tmpCanvas.getContext('2d');
    centerText(tmpcontext, 'Merry', 10, 20);
    centerText(tmpcontext, 'Christmas', 30, 20);

    centerText(tmpcontext, message.name, 60, 20);

    var grabber = new CanvasGrabber(tmpcontext);

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
    var canvas = document.getElementById('Canvas0');
    zoomX = window.innerWidth / canvas.width;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context = canvas.getContext('2d');

    var friend = ArgumentGrabber.grabArgument('f'),
        message = messages[friend];

    if (message === undefined) {
        message = {
            'name': 'hacker',
            'msg': 'dus'
        };
    }

    var grabber = drawScene(canvas, message);

    animations.push(new Snow(context, grabber));
    //animations.push(new Scroller(context));

    window.requestAnimFrame(animate);
};



