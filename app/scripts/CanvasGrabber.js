/*global WebFont, Image */
/*exported CanvasGrabber */
/*jslint bitwise: true*/
/*jslint plusplus: true*/
/**
 * Grabs image data from a canvas.
 * The getData function returns undefined while the image is not loaded yet.
 */
function CanvasGrabber(context) {

    'use strict';

    var imageData;

    /**
     * Grab the imagedata from the specified context.
     */
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

    /**
     * Draw an image at the specified coordinate.
     */
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
     * Draw text/
     */
    this.drawText = function (context, txt, x, y) {

        var i, lines, h = 20;
        // the text is drawn when the webfont has loaded
        WebFont.load({
            google: {
                families: ['Vollkorn']
            },
            active: function () {
                context.font = h + 'px Vollkorn';
                context.fillStyle = '#ffffff';
                context.textBaseline = 'top';
                lines = txt.split('*');
                for (i = 0; i < lines.length; i++) {
                    context.fillText(lines[i], x, y + i * h);
                }

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
        return [0, 0, 0, 0];
    };

    // set pixel value [red, green, blue, alpha]
    this.setPixel = function (x, y, pixel) {
        var i = this.toIndex(x, y);
        imageData.data[i] = pixel[0];
        imageData.data[i + 1] = pixel[1];
        imageData.data[i + 2] = pixel[2];
        imageData.data[i + 3] = pixel[3];

    };

    /**
     * Is a coordinate within range of the image?
     */
    this.isValid = function (x, y) {
        return x >= 0 && x < imageData.width && y >= 0 && y < imageData.height;
    };

    /**
     * Get the index in imageData for a coordinate.
     */
    this.toIndex = function (x, y) {
        return (~~x + ~~y * imageData.width) << 2;
    };


}
