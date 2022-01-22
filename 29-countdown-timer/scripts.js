const MILLISECONDS_IN_SECOND = 1000;

const timerDisplay = document.querySelector('.display__time-left');

let countdown;

function timer(seconds) {
    displayTimeLeft(seconds)

    const now = Date.now();
    const then = (now + seconds) * MILLISECONDS_IN_SECOND;

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / MILLISECONDS_IN_SECOND);

        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }

        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;

    const secondsToDisplay = (remainderSeconds < 10 ? '0' : '') + remainderSeconds;

    timerDisplay.textContent = `${minutes}:${secondsToDisplay}`;
}
