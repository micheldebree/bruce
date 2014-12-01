/* global C64Palette */
function C64(context) {
    'use strict';
    this.context = context;
    this.cw = this.context.canvas.width;
    this.ch = this.context.canvas.height;

    this.palette = new C64Palette();
    this.charSize = (this.cw * 0.8) / 40;
    this.screenWidth = this.charSize * 40;
    this.screenHeight = this.charSize * 25;
    this.borderWidth = (this.cw - this.screenWidth) / 2;
    this.borderHeight = (this.ch - this.screenHeight) / 2;
}

C64.prototype.draw = function (playhead) {
    'use strict';

    this.context.fillStyle = this.palette.Blue;
    this.context.fillRect(0, 0, this.cw, this.ch);

    this.context.fillStyle = this.palette.LightBlue;
    this.context.fillRect(0, 0, this.cw, this.borderHeight);
    this.context.fillRect(0, this.ch - this.borderHeight, this.cw, this.ch);

    this.context.fillRect(0, 0, this.borderWidth, this.ch);
    this.context.fillRect(this.cw - this.borderWidth, 0, this.cw, this.ch);

    this.context.font = this.charSize + 'px CommodoreServer';
    this.context.textBaseline = 'top';
    this.context.fillStyle = this.palette.LightBlue;
    this.putText(4, 1, '**** COMMODORE 64 BASIC V2 ****');
    this.putText(1, 3, '64K RAM SYSTEM  38911 BASIC BYTES FREE');
    this.putText(0, 5, 'READY.');
    
    // draw the cursor
    if (playhead % 800 > 400) {
        this.context.fillStyle = this.palette.LightBlue;
        var y = this.borderHeight + this.charSize * 6;
        this.context.fillRect(this.borderWidth, y, this.charSize, this.charSize);
    }

};

C64.prototype.putText = function (x, y, text) {
    'use strict';
    this.context.fillText(text, this.borderWidth + this.charSize * x, this.borderHeight + this.charSize * y);
};

