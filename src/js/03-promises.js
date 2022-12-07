import { Notify } from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  inputDelay: document.querySelector('input[name="delay"]'),
  inputStep: document.querySelector('input[name="step"]'),
  inputAmout: document.querySelector('input[name="amount"]'),
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const submitForm = event => {
  event.preventDefault();
  let delay = Number(refs.inputDelay.value);
  for (let i = 1; i <= refs.inputAmout.value; i += 1) {
    console.log(delay);
    createPromise(i, delay)
      .then(({ position, delay }) =>
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
      )
      .catch(({ position, delay }) =>
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      );
    delay = Number(refs.inputDelay.value) + Number(refs.inputStep.value) * i;
  }
};
refs.form.addEventListener('submit', submitForm);
