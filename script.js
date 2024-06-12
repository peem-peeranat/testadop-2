let timerBox = document.getElementById('timerBox');
let startTime;
let interval;
let isTimerRunning = false;
let visibilityCount = 0;

function formatTime(date) {
    return `${String(date.getFullYear()).padStart(4, '0')}:${String(date.getMonth() + 1).padStart(2, '0')}:${String(date.getDate()).padStart(2, '0')}`;
}

function resetTimer() {
    clearInterval(interval);
    timerBox.textContent = '00:00';
    isTimerRunning = false;
}

function startTimer() {
    startTime = Date.now();
    interval = setInterval(updateTimer, 1000);
    isTimerRunning = true;
}

function updateTimer() {
    let elapsed = Math.floor((Date.now() - startTime) / 1000);
    let minutes = String(Math.floor(elapsed / 60)).padStart(2, '0');
    let seconds = String(elapsed % 60).padStart(2, '0');
    timerBox.textContent = `${minutes}:${seconds}`;
}

function handleVisibilityChange(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            visibilityCount++;
            if (visibilityCount % 3 === 0) {
                resetTimer();
                timerBox.textContent = formatTime(new Date());
            } else {
                startTimer();
            }
        } else {
            resetTimer();
        }
    });
}

let observer = new IntersectionObserver(handleVisibilityChange, {
    threshold: 0.5
});

observer.observe(timerBox);
