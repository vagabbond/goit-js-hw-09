import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix';
const refs = {
  input: document.querySelector('#datetime-picker'),
  btnSratr: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  mins: document.querySelector('[data-minutes]'),
  secs: document.querySelector('[data-seconds]'),
};
refs.btnSratr.disabled = true;
const fp = flatpickr(refs.input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      return Notify.failure('Please choose a date in the future');
    }
    if (selectedDates[0] > Date.now()) {
      return (refs.btnSratr.disabled = false);
    }
  },
});

class CountdownTimer {
  constructor() {
    this.interval = null;
    this.isActive = true;
  }
  statrTimer() {
    this.onStart();
    this.interval = setInterval(() => {
      const time = this.convertMs(fp.selectedDates[0] - Date.now());
      this.domUpdate(time);
      if (fp.selectedDates[0] < Date.now()) {
        clearInterval(this.interval);
        refs.btnSratr.disabled = false;
        this.isActive = true;
        this.interval = null;
        return;
      }
    }, 1000);
  }
  onStart() {
    if (this.isActive) {
      refs.btnSratr.disabled = true;
      this.isActive = false;
      return;
    }
  }
  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = this.pad(Math.floor(ms / day));
    const hours = this.pad(Math.floor((ms % day) / hour));
    const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
    const seconds = this.pad(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  }
  pad(value) {
    return String(value).padStart(2, '0');
  }
  domUpdate({ days, hours, minutes, seconds }) {
    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.mins.textContent = `${minutes}`;
    refs.secs.textContent = `${seconds}`;
    if (
      refs.days.textContent === '00' &&
      refs.hours.textContent === '00' &&
      refs.mins.textContent === '00' &&
      refs.secs.textContent === '00'
    ) {
      Notify.success('Timer is over');
    }
    if (fp.selectedDates[0] < Date.now()) {
      refs.days.textContent = '00';
      refs.hours.textContent = '00';
      refs.mins.textContent = '00';
      refs.secs.textContent = '00';
    }
  }
}
const timer = new CountdownTimer();
refs.btnSratr.addEventListener('click', timer.statrTimer.bind(timer));
