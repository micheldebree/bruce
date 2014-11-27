function Scroller(context) {

    this.context = context;

    this.scrollText = "Each of us has a vision of good and of evil. We have to encourage people to move towards what they think is good... Everyone has his own idea of good and evil and must choose to follow the good and fight evil as he conceives them. That would be enough to make the world a better place. - Pope Francis ";

    this.charWidth = context.canvas.width / 40;
    this.charsw = context.canvas.width / this.charWidth;
    this.fpms = 60 / 1000;
    this.middle = 0.5 * this.context.canvas.height;
    this.color = "#ffffff";
    this.amp = 100;
    this.yspeed = 0.005;
    this.sinfreq = 0.3;
}

Scroller.prototype.draw = function (playhead) {

    var i,
        frame = playhead * this.fpms,
        smooth = frame % this.charWidth,
        rough = ~~(frame / this.charWidth);

    this.context.fillStyle = this.color;

    for (i = 0; i < this.charsw; i++) {
        var y = this.middle + this.amp * Math.sin((rough + i) * this.sinfreq - playhead * this.yspeed);
        this.context.fillText(this.scrollText[rough + i], i * this.charWidth - smooth, y);
    }

};