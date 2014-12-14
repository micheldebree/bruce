function Vic(context) {
    
  
    this.borderSize = 50;
    this.screenSize = 320 + 2 * this.borderSize;
   
    this.context = context;
    this.colors = [
        '#000000', '#FFFFFF', '#68372B', '#70A4B2',
        '#6F3D86', '#588D43', '#352879', '#B8C76F',
        '#6F4F25', '#433900', '#9A6759', '#444444',
        '#6C6C6C', '#9AD284', '#6C5EB5', '#959595'
    ];
    
    this.border = [];
    this.border.length = this.scanlines;
    
    this.screen = [];
    for (var i = 0; i < 200; i++) {
        var scanline = [];
        scanline.length = 320;
        this.screen.push(scanline);
    }
    
    this.d020 = this.colors[6];
    this.d021 = this.colors[14];
    
} 

Vic.prototype.draw = function() {
    
   
    
};

