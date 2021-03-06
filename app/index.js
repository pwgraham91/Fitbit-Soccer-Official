/*
 * Entry point for the watch app
 */
import document from 'document';
import { vibration } from 'haptics';
import { display } from 'display';

function startTimer(duration, display) {
  let timer = duration, minutes, seconds;
  const interval = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.text = minutes + ":" + seconds;
    if (--timer < 0) {
      clearInterval(interval);
      display.text = 'END HALF';
      vibrate(4);
    }
  }, 1000);
}

function vibrate(secondsToVibrate) {
  vibration.start('confirmation-max');

  let countdown = secondsToVibrate;
  const vibrateTimer = setInterval(function() {
    countdown--;

    vibration.stop();
    vibration.start('confirmation-max');

    if (countdown <= 0) {
      clearInterval(vibrateTimer);
    }
  }, 1000)
}

display.autoOff = false;
display.on = true;

const gameTimeClock = document.getElementById("game-time-clock");

document.onkeypress = function(e) {
  // e.preventDefault();
  console.log(e.key)
};

gameTimeClock.onmouseup = function(e) {
  startTimer(22 * 60, gameTimeClock);
};
