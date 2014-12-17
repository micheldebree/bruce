/**
 * Grabs image data from an image.
 * The getData function returns undefined while the image is not loaded yet.
 */
function PixelGrabber(src) {

    var imageData,
        img = new Image();
    
    img.src = src;
    img.onload = function () {

        var canvas = document.createElement("canvas");

        canvas.width = img.width;
        canvas.height = img.height;
        var context = canvas.getContext('2d');
        context.drawImage(img, 0, 0);

        imageData = context.getImageData(0, 0, img.width, img.height);
    };

    this.getData = function () {
        return imageData;
    };

}
