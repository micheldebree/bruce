/**
 * Grabs image data from a canvas.
 * The getData function returns undefined while the image is not loaded yet.
 */
/* exported CanvasGrabber */
/* global WebFont */
function CanvasGrabber(context) {

    'use strict';

    var imageData;

    this.grab = function () {
        imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.width);
    };

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

    this.drawImage = function (src, x, y) {

        var img = new Image();
        img.src = src;

        // the image can be drawn once it has finished loading
        img.onload = function () {
            context.drawImage(img, x, y);

            // grab the data again when the image has been drawn
            imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.width);
        };
    };

    /**
     * Draw text horizontaly centered
     * y and h are y-pos and height in percent(!) of canvas height.
     */
    this.drawText = function (context, txt, y, h, font) {

        'use strict';

        if (font === undefined) {
            font = 'Courgette';
        }

        WebFont.load({
            google: {
                families: ['Courgette']
            },
            active: function () {
                context.font = context.canvas.height * (h / 100) + 'px ' + font;
                context.fillStyle = '#000000';
                context.textBaseline = 'top';
                context.fillText(txt, (context.canvas.width - context.measureText(txt).width) / 2, context.canvas.height * (y / 100));
                // grab the data again when the text has been drawn
                imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.width);
            }
        });


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