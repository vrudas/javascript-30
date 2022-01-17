const MILLISECONDS_IN_SECOND = 1000;

let countdown;

function timer(seconds) {
    const now = Date.now();
    const then = (now + seconds) * MILLISECONDS_IN_SECOND;

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / MILLISECONDS_IN_SECOND);

        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
    }, 1000);
}
