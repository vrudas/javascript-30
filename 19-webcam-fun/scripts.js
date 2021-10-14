const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(localMediaStream => {
            video.srcObject = localMediaStream;
            video.play();
        })
        .catch(error => {
            console.log('Access to camera wa denied', error);
        });
}

function paintToCanvas() {
    let videoWidth = video.videoWidth;
    let videoHeight = video.videoHeight;

    canvas.width = videoWidth;
    canvas.height = videoHeight;

    return setInterval(
        () => {
            ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
            let imagePixels = ctx.getImageData(0, 0, videoWidth, videoHeight);
            // imagePixels = redEffect(imagePixels);
            imagePixels = rgbSplit(imagePixels);

            ctx.putImageData(imagePixels, 0, 0);
        },
        16
    );
}

function redEffect(imagePixels) {
    for (let pixelIndex = 0; pixelIndex < imagePixels.data.length; pixelIndex += 4) {
        imagePixels.data[pixelIndex] = imagePixels.data[pixelIndex] + 100;
        imagePixels.data[pixelIndex + 1] = imagePixels.data[pixelIndex + 1] - 50;
        imagePixels.data[pixelIndex + 2] = imagePixels.data[pixelIndex + 2] * 0.5;
    }
    return imagePixels;
}

function rgbSplit(imagePixels) {
    for (let pixelIndex = 0; pixelIndex < imagePixels.data.length; pixelIndex += 4) {
        imagePixels.data[pixelIndex - 150] = imagePixels.data[pixelIndex];
        imagePixels.data[pixelIndex + 100] = imagePixels.data[pixelIndex + 1];
        imagePixels.data[pixelIndex - 150] = imagePixels.data[pixelIndex + 2];
    }
    return imagePixels;
}

function takePhoto() {
    snap.currentTime = 0;
    snap.play()

    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'Photo');
    link.textContent = 'Download Image';
    link.innerHTML = `<img src=${data} alt="Picture"/>`;
    strip.insertBefore(link, strip.firstChild);
}

getVideo();


video.addEventListener('canplay', paintToCanvas);