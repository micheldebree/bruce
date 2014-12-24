/*global Image*/
/*jslint plusplus: true*/
function Snow(context, grabber) {
    'use strict';
    this.context = context;
    this.flakes = [];
    this.img = new Image();
    this.img.src = 'images/flake.png';
    this.border = 80; // virtual space outside of screen
    this.gravity = 1 / 500; // falling speed
    this.maxwind = 50000; // maximum wind power
    this.windchange = 8000; // speed which with the wind changes speed / direction
    this.flake = [0xff, 0xff, 0xff, 0xff];

    var nrflakes = (context.canvas.width * context.canvas.height) * 0.00025, // flake density (snowflakes per screen pixel)
        minSize = 0.015, // min/max flake scale
        maxSize = 0.030,
        minRot = -0.003, // min/max rotation speed
        maxRot = 0.003,
        i;

    // create flakes with random properties
    for (i = 0; i < nrflakes; i++) {
        this.flakes.push({
            x: Math.random() * context.canvas.width,
            y: Math.random() * context.canvas.height,
            spdx: -0.05 + Math.random() * 0.1,
            siz: minSize + Math.random() * (maxSize - minSize),
            rot: minRot + Math.random() * (maxRot - minRot)
        });
    }

    this.grabber = grabber;

}

Snow.prototype.draw = function (playhead) {
    'use strict';

    var data, i, x, y, wind;

    if (this.grabber.isReady()) {
        data = this.grabber.getData();
        this.context.putImageData(data, 0, 0);
    }

    for (i = 0; i < this.flakes.length; i++) {

        wind = this.maxwind * Math.sin(playhead / this.windchange);
        x = -this.border + this.mod((this.flakes[i].x + wind * this.flakes[i].siz) + playhead * this.flakes[i].spdx, (this.context.canvas.width + this.border * 2));
        y = -this.border + this.mod((this.flakes[i].y + playhead / this.flakes[i].siz * this.gravity), (this.context.canvas.height + this.border * 2));

        this.context.save();
        this.context.translate(x, y);
        this.context.rotate(playhead * this.flakes[i].rot);
        this.context.scale(this.flakes[i].siz, this.flakes[i].siz);
        this.context.drawImage(this.img, 0, 0);
        this.context.restore();

        this.dropFlake(x, y, wind);

    }

};

Snow.prototype.dropFlake = function (x, y, wind) {
    'use strict';

    if (this.grabber.isReady()) {

        var gx = x,
            gy = y;

        // falling on top
        if (!this.isOpaque(this.grabber.getPixel(gx, gy - 1)) && this.isOpaque(this.grabber.getPixel(gx, gy + 1))) {

            if (!this.isOpaque(this.grabber.getPixel(gx - 1, gy)) || !this.isOpaque(this.grabber.getPixel(gx + 1, gy))) {
                this.grabber.setPixel(gx - 1, gy, this.flake);
                this.grabber.setPixel(gx + 1, gy, this.flake);
            } else {
                this.grabber.setPixel(gx, gy - 1, this.flake);
            }
        }

        if (wind > 0) {

            if (!this.isOpaque(this.grabber.getPixel(gx - 1, gy)) && this.isOpaque(this.grabber.getPixel(gx + 1, gy))) {
                if (!this.isOpaque(this.grabber.getPixel(gx, gy - 1)) || !this.isOpaque(this.grabber.getPixel(gy + 1))) {
                    this.grabber.setPixel(gx, gy - 1, this.flake);
                    this.grabber.setPixel(gx, gy + 1, this.flake);
                } else {
                    this.grabber.setPixel(gx, gy - 1, this.flake);
                }
            }
        } else {
            if (!this.isOpaque(this.grabber.getPixel(gx + 1, gy)) && this.isOpaque(this.grabber.getPixel(gx - 1, gy))) {
                if (!this.isOpaque(this.grabber.getPixel(gx, gy - 1)) || !this.isOpaque(this.grabber.getPixel(gy + 1))) {
                    this.grabber.setPixel(gx, gy - 1, this.flake);
                    this.grabber.setPixel(gx, gy + 1, this.flake);
                } else {
                    this.grabber.setPixel(gx, gy - 1, this.flake);
                }
            }
        }

    }
};

Snow.prototype.isOpaque = function (pixel) {
    'use strict';
    return pixel[3] !== undefined && pixel[3] > 0x80;
};

Snow.prototype.mod = function (arg, div) {
    'use strict';
    return ((arg % div) + div) % div;
};