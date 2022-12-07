function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  body: document.querySelector('body'),
  buttonStart: document.querySelector('button[data-start]'),
  buttonStop: document.querySelector('button[data-stop]'),
};
let intervalId = null;

const onStart = () => {
  refs.buttonStart.disabled = true;
  refs.buttonStop.disabled = false;
  intervalId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
};

const onStop = () => {
  refs.buttonStart.disabled = false;
  refs.buttonStop.disabled = true;
  clearInterval(intervalId);
};
refs.buttonStart.addEventListener('click', onStart);
refs.buttonStop.addEventListener('click', onStop);
