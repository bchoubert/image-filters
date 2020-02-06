
const coeff = 1.25;

const pixelProcessors = {
    MORE_RED: (image, index) => image.data.data[index] *= coeff,
    LESS_RED: (image, index) => image.data.data[index] /= coeff,
    MORE_GREEN: (image, index) => image.data.data[index + 1] *= coeff,
    LESS_GREEN: (image, index) => image.data.data[index + 1] /= coeff,
    MORE_BLUE: (image, index) => image.data.data[index + 2] *= coeff,
    LESS_BLUE: (image, index) => image.data.data[index + 2] /= coeff,
};

executeFunctionOverPixels = (image, fn) => {
    for (var y = 0; y < image.height; y++) {
        for (var x = 0; x < image.width; x++) {
            var index = (x + y * image.width) * 4;
            fn(image, index);
        }
    }    
};

self.onmessage = (e) => {
    executeFunctionOverPixels(e.data.image, pixelProcessors[e.data.filterCode]);
    self.postMessage(e.data.image);
};


