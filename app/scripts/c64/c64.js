/* global C64Palette, Font */
function C64(context) {
    'use strict';
    this.context = context;
    this.cw = this.context.canvas.width;
    this.ch = this.context.canvas.height;
    this.palette = new C64Palette();
    this.charSize = (this.cw * 0.8) / 40;
    this.screenWidth = this.charSize * 40;
    this.screenHeight = this.charSize * 25;
    this.borderWidth = (this.cw - this.screenWidth) >> 1;
    this.borderHeight = (this.ch - this.screenHeight) >> 1;
    this.font = new Font('images/fonts/aeg_collection_11.gif');
}

C64.prototype.draw = function (playhead) {
    'use strict';

    // screen
    this.context.fillStyle = this.palette.Blue;
    this.context.fillRect(0, 0, this.cw, this.ch);

    // upper border
    this.context.fillStyle = this.palette.LightBlue;
    this.context.fillRect(0, 0, this.cw, this.borderHeight);
    
    // lower border
    this.context.fillRect(0, this.ch - this.borderHeight, this.cw, this.ch);

    // left border
    this.context.fillRect(0, this.borderWidth, this.borderWidth, this.ch - this.borderHeight);
    
    // right border
    this.context.fillRect(this.cw - this.borderWidth, this.borderHeight, this.cw, this.ch - this.borderHeight);

    // text
    this.context.font = this.charSize + 'px CommodoreServer';
    this.context.textBaseline = 'top';
    this.context.fillStyle = this.palette.LightBlue;
    this.putText(4, 1, '**** COMMODORE 64 BASIC V2 ****');
    this.putText(1, 3, '64K RAM SYSTEM  38911 BASIC BYTES FREE');
    this.putText(0, 5, 'READY.');
    
    // draw the cursor
    if (playhead % 800 > 400) {
        this.context.fillStyle = this.palette.LightBlue;
        this.context.fillRect(this.borderWidth, this.borderHeight + this.charSize * 6, this.charSize, this.charSize);
    }
     this.context.fillStyle = this.palette.White;
    this.font.draw(this.context, 'e', 100, 100);

};

C64.prototype.putText = function (x, y, text) {
    'use strict';
    this.context.fillText(text, this.borderWidth + this.charSize * x, this.borderHeight + this.charSize * y);
};

