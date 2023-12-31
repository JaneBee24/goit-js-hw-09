import flatpickr from 'flatpickr';
import "flatpickr/dist/flatpickr.min.css";
import * as Notiflix from 'notiflix';


const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

let countdownInterval;
let targetDate;

function showError(message) {
  Notiflix.Notify.Failure(message);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function updateTimerInterface({ days, hours, minutes, seconds }) {
  daysValue.textContent = addLeadingZero(days);
  hoursValue.textContent = addLeadingZero(hours);
  minutesValue.textContent = addLeadingZero(minutes);
  secondsValue.textContent = addLeadingZero(seconds);
}

function onClose(selectedDates) {
  const selectedDate = selectedDates[0];
  if (selectedDate < new Date()) {
    showError("Please choose a date in the future");
    startButton.disabled = true;
  } else {
    startButton.disabled = false;
    targetDate = selectedDate;
  }
}

flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose,
});

startButton.addEventListener('click', () => {
  if (!targetDate) {
    showError("Please choose a date in the future");
    return;
  }

  countdownInterval = setInterval(() => {
    const currentTime = new Date();
    const timeDifference = targetDate - currentTime;

    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      updateTimerInterface({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      Notiflix.Notify.Success('Countdown is finished!');
    } else {
      const { days, hours, minutes, seconds } = convertMs(timeDifference);
      updateTimerInterface({ days, hours, minutes, seconds });
    }
  }, 1000);
});

