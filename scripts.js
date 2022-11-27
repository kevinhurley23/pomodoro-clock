let sessionLength = 25 * 60;
let sessionRunner = 25 * 60;
let breakLength = 5 * 60;
let breakRunner = 5 * 60;
let isTimerRunning = false;
let mode = true; //true = session, false = break
let interval;

function formatTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  return (
    (minutes < 10 ? "0" + minutes : minutes) +
    ":" +
    (seconds < 10 ? "0" + seconds : seconds)
  );
}

$("#session-decrement").click(() => {
  if (!isTimerRunning && sessionLength > 60) {
    sessionLength -= 60;
    sessionRunner -= 60;
    $("#session-length").html(sessionLength / 60);
    $("#time-left").html(formatTime(sessionLength));
  }
});

$("#session-increment").click(() => {
  if (!isTimerRunning && sessionLength < 60 * 60) {
    sessionLength += 60;
    sessionRunner += 60;
    $("#session-length").html(sessionLength / 60);
    $("#time-left").html(formatTime(sessionLength));
  }
});

$("#break-decrement").click(() => {
  if (!isTimerRunning && breakLength > 60) {
    breakLength -= 60;
    breakRunner -= 60;
    $("#break-length").html(breakLength / 60);
  }
});

$("#break-increment").click(() => {
  if (!isTimerRunning && breakLength < 60 * 60) {
    breakLength += 60;
    breakRunner += 60;
    $("#break-length").html(breakLength / 60);
  }
});

$("#start_stop").click(function () {
  isTimerRunning = !isTimerRunning;
  if (isTimerRunning) {
    mode ? startSession() : startBreak;
  } else {
    clearInterval(interval);
  }
});

function startSession() {
  clearInterval(interval);
  mode = true;
  $("#timer-label").html("Session");
  interval = setInterval(() => {
    sessionRunner -= 1;
    $("#time-left").html(formatTime(sessionRunner));
    if (sessionRunner === 0) {
      startBreak();
      document.getElementById("beep").play();
    }
  }, 1000);
}

function startBreak() {
  clearInterval(interval);
  mode = false;
  $("#timer-label").html("Break");
  interval = setInterval(() => {
    breakRunner -= 1;
    $("#time-left").html(formatTime(breakRunner));
    if (breakRunner === 0) {
      startSession();
      document.getElementById("beep").play();
    }
  }, 1000);
}

$("#reset").click(function () {
  isTimerRunning = false;
  clearInterval(interval);
  $("#time-left").html(formatTime(sessionLength));
  document.getElementById("beep").pause();
  document.getElementById("beep").currentTime = 0;
});
