/* global Rasterbar, C64Palette */
function Rasterbars(context) {
    
    this.context = context;
    this.bars = [ new Rasterbar(context), new Rasterbar(context) ];
    
}

Rasterbars.prototype.draw = function (playhead) {

    for (var i = 0; i < this.bars.length; i++) {
        this.bars[i].y = this.context.canvas.height / 2  + Math.sin((playhead + i * 50) * 0.005) * 100;
        this.bars[i].draw(playhead);
    }
    
};

function Rasterbar(context, bar) {
    this.context = context;
    if (undefined === bar) {
        var colors = new C64Palette();
        this.bar = [
            colors.Black,
            colors.Brown,
            colors.DarkGray,
            colors.LightBrown,
            colors.Gray,
            colors.LightGray,
            colors.Yellow,
            colors.White,
            colors.Yellow,
            colors.LightGray,
            colors.Gray,
            colors.LightBrown,
            colors.DarkGray,
            colors.Brown,
            colors.Black
        ];

    }
    else {
        this.bar = bar;
    }

    this.y = context.canvas.height >> 1;
}

Rasterbar.prototype.draw = function () {
    for (var i = 0; i < this.bar.length; i++) {
        this.context.fillStyle = this.bar[i];
        this.context.fillRect(0, this.y + i, this.context.canvas.width, 1);
    }
};