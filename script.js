let startTime, updatedTime, difference, tInterval;
let running = false;
let laps = [];

const display = document.getElementById("display");
const lapsList = document.getElementById("laps");

function startStopwatch() {
  if (!running) {
    startTime = new Date().getTime() - (difference || 0);
    tInterval = setInterval(updateTime, 10);
    running = true;
  }
}

function pauseStopwatch() {
  if (running) {
    clearInterval(tInterval);
    difference = new Date().getTime() - startTime;
    running = false;
  }
}

function resetStopwatch() {
  clearInterval(tInterval);
  running = false;
  startTime = null;
  difference = 0;
  display.textContent = "00:00:00.000";
  lapsList.innerHTML = "";
  laps = [];
}

function updateTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  let milliseconds = difference % 1000;
  let seconds = Math.floor((difference / 1000) % 60);
  let minutes = Math.floor((difference / (1000 * 60)) % 60);
  let hours = Math.floor((difference / (1000 * 60 * 60)) % 24);

  display.textContent =
    (hours < 10 ? "0" + hours : hours) + ":" +
    (minutes < 10 ? "0" + minutes : minutes) + ":" +
    (seconds < 10 ? "0" + seconds : seconds) + "." +
    (milliseconds < 100 ? (milliseconds < 10 ? "00" : "0") + milliseconds : milliseconds);
}

function lapTime() {
  if (running) {
    laps.push(display.textContent);
    const li = document.createElement("li");
    li.textContent = `Lap ${laps.length}: ${display.textContent}`;
    lapsList.appendChild(li);
  }
}
