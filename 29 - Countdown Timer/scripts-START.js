let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");

function timer(seconds) {
  // clear any existing timer
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000; //the number of seconds that you wish to run the timer for
  displayTimeLeft(seconds);
  displayEndTime(then);

  // figure out how much time is left on the clock
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    //check if we should stop it
    if (secondsLeft <= 0) {
      clearInterval(countdown);
      return;
    }
    //display it
    displayTimeLeft(secondsLeft);
  }, 1000);

  function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${
      remainderSeconds < 10 ? "0" : ""
    }${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
    console.log({ minutes, remainderSeconds });
  }
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hours = end.getHours();
  const adjustedHours = hours > 12 ? hours - 12 : hours;
  const minutes = end.getMinutes();
  endTime.textContent = `Be back at ${adjustedHours}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time); // parseInt turn into real number
  timer(seconds);
}

buttons.forEach((button) => button.addEventListener("click", startTimer));
document.customForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const mins = this.minutes.value;
  console.log(mins);
  timer(mins * 60);
  this.reset();
});
