const initialImage = document.getElementById("image");
const nnCanvas = document.getElementById("nnCanvas");
const blCanvas = document.getElementById("blCanvas");
const flippedCanvas = document.getElementById("flippedCanvas");
const imageTensor = tf.browser.fromPixels(initialImage);

window.addEventListener("load", function () {
    cropImage();
    resizeImage();
    rotateImage();
    imageTensor.dispose()
});

// Recorte de la imagen original
function cropImage() {
    // Simple Tensor Crop
    const startingPoint = [0, 40, 0];
    const newSize = [265, 245, 3];
    const imageCroppedCanvas =
        document.getElementById("imageCroppedCanvas");

    const cropped = tf.slice(imageTensor, startingPoint, newSize);
    tf.browser.toPixels(cropped, imageCroppedCanvas).then(() => {
        cropped.dispose();
    });
}
 
// Redimensionar la imagen original con dos métodos diferentes
function resizeImage() {
    const newSize = [768, 560]; // 4x larger
    const nnResizeTensor = tf.image.resizeNearestNeighbor(
        imageTensor,
        newSize,
        true
    );
    tf.browser.toPixels(nnResizeTensor, nnCanvas).then(() => {
        nnResizeTensor.dispose();
    });

    const blResizeTensor = tf.image.resizeBilinear(
        imageTensor,
        newSize,
        true
    );
    const blResizeTensorInt = blResizeTensor.asType("int32");
    tf.browser.toPixels(blResizeTensorInt, blCanvas).then(() => {
        blResizeTensor.dispose();
        blResizeTensorInt.dispose();
    });
}

// Rotar la imagen original
function rotateImage() {
    const flippedImageTensor = tf.reverse(imageTensor, 1)
    tf.browser.toPixels(flippedImageTensor, flippedCanvas).then(() => {
        flippedImageTensor.dispose()
    })
}