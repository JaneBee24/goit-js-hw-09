import Notiflix from 'notiflix';

function logPromiseStatus({ position, delay, isFulfilled }) {
  const status = isFulfilled ? 'Fulfilled' : 'Rejected';
  const emoji = isFulfilled ? '✅' : '❌';
  const message = `${emoji} ${status} promise ${position} in ${delay}ms`;
  isFulfilled ? Notiflix.Notify.Success(message) : Notiflix.Notify.Failure(message);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay, isFulfilled: true });
      } else {
        reject({ position, delay, isFulfilled: false });
      }
    }, delay);
  });
}

document.querySelector('.form').addEventListener('submit', (event) => {
  event.preventDefault();

  const firstDelay = parseInt(event.target.elements.delay.value, 10);
  const step = parseInt(event.target.elements.step.value, 10);
  const amount = parseInt(event.target.elements.amount.value, 10);

  for (let i = 0; i < amount; i++) {
    const currentDelay = firstDelay + i * step;

    createPromise(i + 1, currentDelay)
      .then((result) => logPromiseStatus(result))
      .catch((error) => logPromiseStatus(error));
  }
});
