/* jslint bitwise: true */
/* exported C64Palette */
function C64Palette() {
    'use strict';
    this.Black = '#000000';
    this.White = '#FFFFFF';
    this.Red = '#68372B';
    this.Cyan = '#70A4B2';
    this.Purple = '#6F3D86';
    this.Green = '#588D43';
    this.Blue = '#352879';
    this.Yellow = '#B8C76F';
    this.LightBrown = '#6F4F25';
    this.Brown = '#433900';
    this.LightRed = '#9A6759';
    this.DarkGray = '#444444';
    this.Gray = '#6C6C6C';
    this.LightGreen = '#9AD284';
    this.LightBlue = '#6C5EB5';
    this.LightGray = '#959595';
 
    this.Random = function () {
        var r = ~~((Math.random() * 16) + 1);
        switch (r) {
            case 1: return this.Black;
            case 2: return this.Blue;
            case 3: return this.Brown;
            case 4: return this.Cyan;
            case 5: return this.DarkGray;
            case 6: return this.Gray;
            case 7: return this.Green;
            case 8: return this.LightBlue;
            case 9: return this.LightBrown;
            case 10: return this.LightGray;
            case 11: return this.LightGreen;
            case 12: return this.LightRed;
            case 13: return this.Purple;
            case 14: return this.Red;
            case 15: return this.White;
            case 16: return this.Yellow;
        }
    };
}