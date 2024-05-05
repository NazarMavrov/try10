import flatpickr from "flatpickr";

let userSelectedDate = null;

function validateSelectedDate(selectedDates) {
  if (selectedDates[0] < new Date()) {
    iziToast.error({ message: 'Please choose a date in the future' });
    document.getElementById('start-btn').disabled = true;
  } else {
    userSelectedDate = selectedDates[0];
    document.getElementById('start-btn').disabled = false;
  }
}

flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: validateSelectedDate
});

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

function updateTimer() {
  const currentDate = new Date();
  const timeDifference = userSelectedDate - currentDate;

  if (timeDifference <= 0) {
    clearInterval(timerInterval);
    document.getElementById('start-btn').disabled = false;
    iziToast.success({ message: 'Time is up!' });
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeDifference);

  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
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

document.getElementById('start-btn').addEventListener('click', () => {
  document.getElementById('start-btn').disabled = true;
  userSelectedDate = new Date(userSelectedDate);
  timerInterval = setInterval(updateTimer, 1000);
});
