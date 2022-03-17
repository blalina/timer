const timerProgressBar = document.querySelector('.js-timer_progressbar__progress');
const timerRangeInput = document.querySelector('.js-timer_slider__input');
const timerElepsedTime = document.querySelector('.js-timer_progressbar__span-time');
const timerButton = document.querySelector('.js-timer__button');

let currentIntervalId;

function progress(timeInMilliseconds) {
  let startTime = Date.now();
  let elapsedTime = 0;

  const intervalId = setInterval(() => {
    const endTime = Date.now() - startTime;
    elapsedTime += endTime;

    if (elapsedTime >= timeInMilliseconds) {
      clearInterval(intervalId);
    }

    timerElepsedTime.innerHTML = `${(elapsedTime / 1000).toFixed(1)}s`;

    timerProgressBar.value = (100 / timeInMilliseconds) * elapsedTime;

    startTime = Date.now();
  }, 10);

  currentIntervalId = intervalId;
}

timerRangeInput.addEventListener('change', () => {
  if (currentIntervalId) {
    clearInterval(currentIntervalId);
  }
  const durationInSeconds = timerRangeInput.value;
  progress(durationInSeconds * 1000);
});

timerButton.addEventListener('click', () => {
  clearInterval(currentIntervalId);
  timerProgressBar.value = 0;
  timerRangeInput.value = 0;
  timerElepsedTime.innerHTML = '0s';
});
