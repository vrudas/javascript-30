const MILLISECONDS_IN_SECOND = 1000;

const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');

let countdown;

function timer(seconds) {
    const now = Date.now();
    const then = (now + seconds) * MILLISECONDS_IN_SECOND;

    displayTimeLeft(seconds);
    displayEndTime(then);

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
    const timeToDisplay = `${minutes}:${secondsToDisplay}`;

    timerDisplay.textContent = timeToDisplay;
    document.title = timeToDisplay;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();

    const hourToDisplay = (hour > 12) ? hour - 12 : hour;

    endTime.textContent = `Be Back At ${hourToDisplay}:${minutes}`;
}
