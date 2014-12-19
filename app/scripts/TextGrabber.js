/**
 * Grabs image data from an image.
 * The getData function returns undefined while the image is not loaded yet.
 */
/* exported TextGrabber */
function TextGrabber(txt, h) {

    'use strict';

    if (h === undefined) {
        h = 200;
    }

    var canvas = document.createElement('canvas'),
        context = canvas.getContext('2d');
       
    
    context.font = h + 'px sans-serif';
    var w = context.measureText(txt).width;

    canvas.width = w;
    canvas.height = h;
    context.font = h + 'px sans-serif';
    context.fillStyle = '#000000';
    context.textBaseline = 'top';
    context.fillText(txt, 0, 0);

    var imageData;
    
    if (w > 0 && h > 0) {
        imageData = context.getImageData(0, 0, w, h);
    }


    this.getData = function () {
        return imageData;
    };

    this.isReady = function () {
        return imageData !== undefined;
    };

    this.getWidth = function () {
        return this.isReady() ? imageData.width : 0;
    };

    this.getHeight = function () {
        return this.isReady() ? imageData.height : 0;
    };

    // returns pixel as 4 byte array [red, green, blue, alpha]
    this.getPixel = function (x, y) {
        if (this.isValid(x, y)) {
            var i = this.toIndex(x, y);
            return [imageData.data[i], imageData.data[i + 1], imageData.data[i + 2], imageData.data[i + 3]];
        }
        else {
            return [0, 0, 0, 0];
        }
    };

    // set pixel value [red, green, blue, alpha]
    this.setPixel = function (x, y, pixel) {
        var i = this.toIndex(x, y);
        imageData.data[i] = pixel[0];
        imageData.data[i + 1] = pixel[1];
        imageData.data[i + 2] = pixel[2];
        imageData.data[i + 3] = pixel[3];

    };

    this.isValid = function (x, y) {
        return x >= 0 && x < imageData.width && y >= 0 && y < imageData.height;
    };

    this.toIndex = function (x, y) {
        return ~~y * imageData.width * 4 + ~~x * 4;
    };


}
