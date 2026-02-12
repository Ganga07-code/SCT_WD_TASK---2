document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const millisecondsEl = document.getElementById('milliseconds');
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const lapBtn = document.getElementById('lapBtn');
    const resetBtn = document.getElementById('resetBtn');
    const lapsList = document.getElementById('lapsList');

    // State Variables
    let startTime;
    let elapsedTime = 0;
    let timerInterval;
    let lapCount = 0;

    // Helper: Format Time
    function formatTime(ms) {
        const date = new Date(ms);
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(date.getUTCSeconds()).padStart(2, '0');
        const milliseconds = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');
        return { minutes, seconds, milliseconds };
    }

    // Helper: Update Display
    function updateDisplay(time) {
        const { minutes, seconds, milliseconds } = formatTime(time);
        minutesEl.textContent = minutes;
        secondsEl.textContent = seconds;
        millisecondsEl.textContent = milliseconds;
        document.title = `${minutes}:${seconds} - Stopwatch`;
    }

    // Toggle Button States
    function toggleButtons(state) {
        if (state === 'running') {
            startBtn.disabled = true;
            pauseBtn.disabled = false;
            lapBtn.disabled = false;
            resetBtn.disabled = false;
            startBtn.style.display = 'none';
            pauseBtn.style.display = 'flex';
        } else if (state === 'paused') {
            startBtn.disabled = false;
            pauseBtn.disabled = true;
            lapBtn.disabled = true;
            resetBtn.disabled = false;
            startBtn.style.display = 'flex';
            pauseBtn.style.display = 'none';
        } else if (state === 'initial') {
            startBtn.disabled = false;
            pauseBtn.disabled = true;
            lapBtn.disabled = true;
            resetBtn.disabled = true;
            startBtn.style.display = 'flex';
            pauseBtn.style.display = 'none';
        }
    }

    // Start Timer
    function startTimer() {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay(elapsedTime);
        }, 10);
        toggleButtons('running');
    }

    // Pause Timer
    function pauseTimer() {
        clearInterval(timerInterval);
        toggleButtons('paused');
    }

    // Reset Timer
    function resetTimer() {
        clearInterval(timerInterval);
        elapsedTime = 0;
        updateDisplay(0);
        toggleButtons('initial');
        clearLaps();
        document.title = 'Stopwatch | Task 02';
    }

    // Record Lap
    function recordLap() {
        lapCount++;
        const { minutes, seconds, milliseconds } = formatTime(elapsedTime);
        const lapItem = document.createElement('li');
        lapItem.className = 'lap-item';
        
        lapItem.innerHTML = `
            <span class="lap-number">Lap ${String(lapCount).padStart(2, '0')}</span>
            <span class="lap-time">${minutes}:${seconds}.${milliseconds}</span>
        `;

        // Add to top of list
        lapsList.insertBefore(lapItem, lapsList.firstChild);

        // Animate new item
        lapItem.style.opacity = '0';
        lapItem.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            lapItem.style.opacity = '1';
            lapItem.style.transform = 'translateY(0)';
        }, 10);
    }

    // Clear Laps
    function clearLaps() {
        lapCount = 0;
        lapsList.innerHTML = '';
    }

    // Event Listeners
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);
    lapBtn.addEventListener('click', recordLap);

    // Initial State
    toggleButtons('initial');
});
