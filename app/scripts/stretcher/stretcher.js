function Stretcher(context) {
    this.context = context;
    this.img = new Image();
    this.img.src = "images/ik/head.png";
    this.zoom = 2;
    this.sinAmp2 = 20;
    this.sinAmp = 10;
}

Stretcher.prototype.draw = function (playhead) {

    var sinPhase2 = (playhead / 800);
    var x = (this.context.canvas.width - this.img.width * this.zoom) / 2 + Math.sin(sinPhase2) * this.sinAmp2;

    for (var y = 0; y < 400; y++) {
        var lineNr = y + -this.sinAmp + this.sinAmp * Math.sin((playhead + y / 1000));
        this.drawLine(this.img, x, y, lineNr);
    }

};

Stretcher.prototype.drawLine = function (x, y, lineNr) {
    this.context.drawImage(this.img, 0, lineNr, this.img.width, 1, x, y * this.zoom, this.img.width * this.zoom, this.zoom);
};