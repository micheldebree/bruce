/* global TextGrabber, PixelGrabber */
function Snow(context, txt, y) {
    'use strict';
    this.context = context;
    this.flakes = [];
    this.img = new Image();
    this.img.src = 'images/flake.png';
    this.border = 80; // virtual space outside of screen
    this.gravity = 1 / 500; // falling speed
    this.maxwind = 50000; // maximum wind power
    this.windchange = 8000; // speed which with the wind changes speed / direction

    var nrflakes = (context.canvas.width * context.canvas.height) * 0.00015, // flake density (snowflakes per screen pixel)
        minSize = 0.015, // min/max flake scale
        maxSize = 0.030,
        minRot = -0.003, // min/max rotation speed
        maxRot = 0.003;

    // create flakes with random properties
    for (var i = 0; i < nrflakes; i++) {
        this.flakes.push({
            x: Math.random() * context.canvas.width,
            y: -context.canvas.height + Math.random() * context.canvas.height,
            spdx: -0.05 + Math.random() * 0.1,
            siz: minSize + Math.random() * (maxSize - minSize),
            rot: minRot + Math.random() * (maxRot - minRot)
        });
    }

    // grab the image
    this.grabber = new TextGrabber(txt);
    this.txtX = (context.canvas.width - this.grabber.getWidth()) / 2;
    this.txtY = y;

}

Snow.prototype.draw = function (playhead) {
    'use strict';


    if (this.grabber.isReady()) {
        var data = this.grabber.getData();
        this.context.putImageData(data, this.txtX, this.txtY);
    }


    var i, x, y, wind,
        flake = [0xff, 0xff, 0xff, 0xff];
    for (i = 0; i < this.flakes.length; i++) {

        wind = this.maxwind * Math.sin(playhead / this.windchange);
        x = -this.border + this.mod((this.flakes[i].x + wind * this.flakes[i].siz) + playhead * this.flakes[i].spdx, (this.context.canvas.width + this.border));
        y = -this.border + this.mod((this.flakes[i].y + playhead / this.flakes[i].siz * this.gravity), (this.context.canvas.height + this.border));

        this.context.save();
        this.context.translate(x, y);
        this.context.rotate(playhead * this.flakes[i].rot);
        this.context.scale(this.flakes[i].siz, this.flakes[i].siz);
        this.context.drawImage(this.img, 0, 0);
        this.context.restore();

        if (this.grabber.isReady()) {
          
            var gx = x - this.txtX;
            var gy = y - this.txtY;
          
            var middle = this.isOpaque(this.grabber.getPixel(gx, gy));

            if (middle) {
                
                  //this.flakes[i].y = this.flakes[i].y - y - this.border;
                
                  if (!this.isOpaque(this.grabber.getPixel(gx, gy+1))) {
                      this.grabber.setPixel(gx , gy+1, flake);
                  }
                  else if (!this.isOpaque(this.grabber.getPixel(gx-1, gy))) {
                      this.grabber.setPixel(gx-1 , gy, flake);
                  }
                  else if (!this.isOpaque(this.grabber.getPixel(gx+1, gy))) {
                      this.grabber.setPixel(gx+1 , gy, flake);
                  }
                  else {
                      this.grabber.setPixel(gx , gy-1, flake);
                  }
               
            }

        }

    }



};

Snow.prototype.isOpaque = function(pixel) {
    return pixel[3] !== undefined && pixel[3] > 128;
};

Snow.prototype.mod = function (arg, div) {
    'use strict';
    return ((arg % div) + div) % div;
};