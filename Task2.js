// ==============================
// ELEMENTS
// ==============================

const display = document.getElementById("display");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");

const lapList = document.getElementById("lapList");


// ==============================
// VARIABLES
// ==============================

let startTime = 0;
let elapsedTime = 0;
let timer = null;

let lapNumber = 0;


// ==============================
// UPDATE DISPLAY
// ==============================

function updateDisplay() {

    const totalMilliseconds = elapsedTime;

    const hours = Math.floor(totalMilliseconds / 3600000);

    const minutes = Math.floor(
        (totalMilliseconds % 3600000) / 60000
    );

    const seconds = Math.floor(
        (totalMilliseconds % 60000) / 1000
    );

    const milliseconds = Math.floor(
        (totalMilliseconds % 1000) / 10
    );


    const h = String(hours).padStart(2, "0");
    const m = String(minutes).padStart(2, "0");
    const s = String(seconds).padStart(2, "0");
    const ms = String(milliseconds).padStart(2, "0");


    display.textContent = `${h}:${m}:${s}.${ms}`;
}


// ==============================
// UPDATE TIMER
// ==============================

function updateTimer() {

    elapsedTime = Date.now() - startTime;

    updateDisplay();
}


// ==============================
// START / RESUME
// ==============================

function startStopwatch() {

    // Prevent multiple timers
    if (timer !== null) {
        return;
    }


    // Continue from previous elapsed time
    startTime = Date.now() - elapsedTime;


    // Update immediately
    updateTimer();


    // Update every 10ms
    timer = setInterval(updateTimer, 10);


    startBtn.textContent = "Running...";
    startBtn.disabled = true;
}


// ==============================
// PAUSE
// ==============================

function pauseStopwatch() {

    if (timer === null) {
        return;
    }


    // Save the exact elapsed time
    elapsedTime = Date.now() - startTime;


    clearInterval(timer);

    timer = null;


    updateDisplay();


    startBtn.textContent = "Resume";
    startBtn.disabled = false;
}


// ==============================
// RESET
// ==============================

function resetStopwatch() {

    // Stop timer
    if (timer !== null) {
        clearInterval(timer);
        timer = null;
    }


    // Reset time
    startTime = 0;
    elapsedTime = 0;


    // Reset laps
    lapNumber = 0;
    lapList.innerHTML = "";


    // Reset display
    updateDisplay();


    // Reset button
    startBtn.textContent = "Start";
    startBtn.disabled = false;
}


// ==============================
// LAP
// ==============================

function recordLap() {

    // Don't record lap before stopwatch starts
    if (elapsedTime === 0) {
        return;
    }


    lapNumber++;


    const lapItem = document.createElement("li");


    lapItem.innerHTML = `
        <span>Lap ${lapNumber}</span>
        <span>${display.textContent}</span>
    `;


    // Newest lap at top
    lapList.prepend(lapItem);
}


// ==============================
// BUTTON EVENTS
// ==============================

startBtn.addEventListener("click", startStopwatch);

pauseBtn.addEventListener("click", pauseStopwatch);

resetBtn.addEventListener("click", resetStopwatch);

lapBtn.addEventListener("click", recordLap);


// ==============================
// INITIAL DISPLAY
// ==============================

updateDisplay();