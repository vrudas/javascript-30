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
        },
        16
    );
}

function takePhoto() {
    snap.currentTime = 0;
    snap.play()
}

getVideo();


video.addEventListener('canplay', paintToCanvas);