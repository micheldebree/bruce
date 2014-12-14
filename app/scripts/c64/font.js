function Font(filename) {

    this.charwidth = 8;
    this.charheight = 8;
    this.cols = 32;
    this.rows = 0x100 / this.cols;
    this.font = new Image();
    this.font.src = filename;
}

Font.prototype.draw = function (context, character, x, y, w, h) {

    var code = 1 + character.charCodeAt(0) - 'a'.charCodeAt(0),
        clipX = this.charwidth * ~~(code % this.cols),
        clipY = this.charheight * ~~(code / this.cols);

    if (w === undefined) {
        w = this.charwidth;
    }
    if (h === undefined) {
        h = this.charheight;
    }

    context.drawImage(this.font, clipX, clipY, this.charwidth, this.charheight, x, y, w, h);

};