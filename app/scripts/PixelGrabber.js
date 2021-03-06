/**
 * Grabs image data from an image.
 * The getData function returns undefined while the image is not loaded yet.
 */
/* exported PixelGrabber */
function PixelGrabber(src) {

    'use strict';

    var imageData,
        img = new Image();

    img.src = src;
    img.onload = function () {

        var canvas = document.createElement('canvas');

        canvas.width = img.width;
        canvas.height = img.height;
        var context = canvas.getContext('2d');
        context.drawImage(img, 0, 0);

        imageData = context.getImageData(0, 0, img.width, img.height);
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
