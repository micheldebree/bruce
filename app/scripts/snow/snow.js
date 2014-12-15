function Snow(context) {
    'use strict';
    this.context = context;
    this.flakes = [];
    this.img = new Image();
    this.img.src = 'scripts/snow/flake.png';
    this.border = 80;
    this.gravity = 1 / 500;

    var nrflakes = (context.canvas.width * context.canvas.height) * 0.00025, // flake density (snowflakes per screen pixel)
        minSpeed = 5, // min/max falling speed
        maxSpeed = 10,
        minSize = 0.015, // min/max flake scale
        maxSize = 0.030,
        minRot = -0.003, // min/max rotation speed
        maxRot = 0.003;

    // create flakes with random properties
    for (var i = 0; i < nrflakes; i++) {
        this.flakes.push({
            x: Math.random() * context.canvas.width,
            y: Math.random() * context.canvas.height,
            spd: minSpeed + Math.random() * (maxSpeed - minSpeed),
            siz: minSize + Math.random() * (maxSize - minSize),
            rot: minRot + Math.random() * (maxRot - minRot)
        });
    }

}

Snow.prototype.draw = function (playhead) {
    'use strict';
    var i, x, y, wind;
    for (i = 0; i < this.flakes.length; i++) {

        wind = 10000 * Math.sin(playhead / 8000);
        x = -this.border + this.mod((this.flakes[i].x + wind * this.flakes[i].siz), (this.context.canvas.width + this.border));
        y = -this.border + this.mod((this.flakes[i].y + playhead / this.flakes[i].siz * this.gravity), (this.context.canvas.height + this.border));

        this.context.save();
        this.context.translate(x, y);
        this.context.rotate(playhead * this.flakes[i].rot);
        this.context.scale(this.flakes[i].siz, this.flakes[i].siz);
        this.context.drawImage(this.img, 0, 0);
        this.context.restore();

    }

};

Snow.prototype.mod = function (arg, div) {
    'use strict';
    return ((arg % div) + div) % div;
};